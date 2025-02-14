package runners

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/pkg/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func GetRunnerFlowLinks(context *gin.Context, db *bun.DB) {
	runnerID := context.Param("runnerID")

	flows := make([]models.Flows, 0)
	err := db.NewSelect().Model(&flows).Where("runner_id = ?", runnerID).Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting flows runner is assigned to", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"flows": flows})
}
