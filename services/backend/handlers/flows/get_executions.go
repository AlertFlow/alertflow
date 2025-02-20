package flows

import (
	"github.com/v1Flows/alertFlow/services/backend/functions/gatekeeper"
	"github.com/v1Flows/alertFlow/services/backend/functions/httperror"
	"github.com/v1Flows/alertFlow/services/backend/pkg/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/uptrace/bun"
)

func GetFlowExecutions(context *gin.Context, db *bun.DB) {
	flowID := context.Param("flowID")

	// get flow
	var flow models.Flows
	err := db.NewSelect().Model(&flow).Where("id = ?", flowID).Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting flow data from db", err)
		return
	}

	// check if user has access to project
	access, err := gatekeeper.CheckUserProjectAccess(flow.ProjectID, context, db)
	if err != nil {
		httperror.InternalServerError(context, "Error checking for flow access", err)
		return
	}
	if !access {
		httperror.Unauthorized(context, "You do not have access to this flow", errors.New("you do not have access to this flow"))
		return
	}

	executions := make([]models.Executions, 0)
	err = db.NewSelect().Model(&executions).Where("flow_id = ?", flowID).Order("created_at DESC").Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting executions from db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"executions": executions})
}
