package admins

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/uptrace/bun"
)

func GetExecutions(context *gin.Context, db *bun.DB) {
	executions := make([]models.Executions, 0)
	err := db.NewSelect().Model(&executions).Order("created_at DESC").Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting executions data on db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"executions": executions})
}