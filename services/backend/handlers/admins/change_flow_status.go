package admins

import (
	"alertflow-backend/functions/httperror"
	functions_project "alertflow-backend/functions/project"
	"alertflow-backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"github.com/uptrace/bun"
)

func ChangeFlowStatus(context *gin.Context, db *bun.DB) {
	flowID := context.Param("flowID")

	var flow models.Flows
	if err := context.ShouldBindJSON(&flow); err != nil {
		httperror.StatusBadRequest(context, "Error parsing incoming data", err)
		return
	}

	_, err := db.NewUpdate().Model(&flow).Column("disabled", "disabled_reason").Where("id = ?", flowID).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error updating flow on db", err)
		fmt.Println(err)
	}

	// get flow data
	var flowDB models.Flows
	err = db.NewSelect().Model(&flowDB).Where("id = ?", flowID).Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting from data from db", err)
		return
	}

	// Audit
	if flow.Disabled {
		err = functions_project.CreateAuditEntry(flowDB.ProjectID, "update", flowDB.Name+" Flow disabled: "+flow.DisabledReason, db, context)
		if err != nil {
			log.Error(err)
		}
	} else {
		err = functions_project.CreateAuditEntry(flowDB.ProjectID, "update", flowDB.Name+" Flow enabled", db, context)
		if err != nil {
			log.Error(err)
		}
	}

	context.JSON(http.StatusOK, gin.H{"result": "success"})
}