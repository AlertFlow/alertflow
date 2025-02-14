package tokens

import (
	"alertflow-backend/functions/auth"
	"alertflow-backend/functions/httperror"
	"alertflow-backend/pkg/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func ValidateServiceToken(context *gin.Context, db *bun.DB) {
	token := context.GetHeader("Authorization")

	var key models.Tokens
	err := db.NewSelect().Model(&key).Where("key = ?", token).Scan(context)
	if err != nil {
		httperror.Unauthorized(context, "Token is invalid or expired", errors.New("token invalid or expired"))
		return
	}

	err = auth.ValidateToken(token)
	if err != nil {
		httperror.Unauthorized(context, "Token is invalid", err)
		return
	}
	context.JSON(http.StatusOK, gin.H{"result": "success"})
}
