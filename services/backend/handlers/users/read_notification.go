package users

import (
	"alertflow-backend/functions/auth"
	"alertflow-backend/functions/httperror"
	"alertflow-backend/pkg/models"
	"net/http"

	_ "github.com/lib/pq"
	"github.com/uptrace/bun"

	"github.com/gin-gonic/gin"
)

func ReadUserNotification(context *gin.Context, db *bun.DB) {
	notificationID := context.Param("notificationID")

	userID, err := auth.GetUserIDFromToken(context.GetHeader("Authorization"))
	if err != nil {
		httperror.Unauthorized(context, "Error receiving userID from token", err)
		return
	}

	_, err = db.NewUpdate().Model(&models.Notifications{}).Set("is_read = true").Where("id = ?", notificationID).Where("user_id = ?", userID).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error updating notification state on db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"result": "success"})
}
