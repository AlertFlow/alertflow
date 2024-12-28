package runners

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func Hearbeat(context *gin.Context, db *bun.DB) {
	runnerID := context.Param("runnerID")

	var runner models.Runners
	err := db.NewSelect().Model(&runner).Where("id = ?", runnerID).Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting runner data from db", err)
		return
	}
	if runner.Disabled {
		httperror.StatusBadRequest(context, "Runner is disabled", errors.New("runner is disabled"))
		return
	}

	_, err = db.NewUpdate().Model((*models.Runners)(nil)).Where("id = ?", runnerID).Set("last_heartbeat = ?", time.Now()).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error updating runner hearbeat on db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"result": "success"})
}
