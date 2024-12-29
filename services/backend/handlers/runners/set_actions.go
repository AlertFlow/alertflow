package runners

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func SetRunnerActions(context *gin.Context, db *bun.DB) {
	id := context.Param("id")

	var runner models.Runners
	if err := context.ShouldBindJSON(&runner); err != nil {
		httperror.StatusBadRequest(context, "Error parsing incoming data", err)
		return
	}

	_, err := db.NewUpdate().Model(&runner).Where("id = ?", id).Set("actions = ?", runner.Actions).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error updating runner actions on db", err)
		return
	}

	context.JSON(http.StatusCreated, gin.H{"result": "success"})
}
