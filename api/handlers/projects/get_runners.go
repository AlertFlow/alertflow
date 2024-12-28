package projects

import (
	"alertflow-backend/functions/gatekeeper"
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func GetProjectRunners(context *gin.Context, db *bun.DB) {
	projectID := context.Param("projectID")

	// check if user has access to project
	access, err := gatekeeper.CheckUserProjectAccess(projectID, context, db)
	if err != nil {
		httperror.InternalServerError(context, "Error checking for project access", err)
		return
	}
	if !access {
		httperror.Unauthorized(context, "You do not have access to this project", errors.New("you do not have access to this project"))
		return
	}

	runners := make([]models.Runners, 0)
	err = db.NewSelect().Model(&runners).Where("project_id = ? OR alertflow_runner = true", projectID).Order("name ASC").Order("last_heartbeat DESC").Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error receiving project runners from db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"runners": runners})
}