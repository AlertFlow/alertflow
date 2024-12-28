package users

import (
	"alertflow-backend/functions/auth"
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/uptrace/bun"
)

func DeleteUser(context *gin.Context, db *bun.DB) {
	userID, err := auth.GetUserIDFromToken(context.GetHeader("Authorization"))
	if err != nil {
		httperror.Unauthorized(context, "Error receiving userID from token", err)
		return
	}

	_, err = db.NewDelete().Model(&models.Users{}).Where("id = ?", userID).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error deleting user on db", err)
		return
	}

	// remove user from project_members
	_, err = db.NewDelete().Model(&models.ProjectMembers{}).Where("user_id = ?", userID).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error deleting user from project memberships", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"result": "success"})
}
