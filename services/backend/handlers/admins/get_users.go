package admins

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/uptrace/bun"
)

func GetUsers(context *gin.Context, db *bun.DB) {
	var users []models.Users
	err := db.NewSelect().Model(&users).Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting users on db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"users": users})
}