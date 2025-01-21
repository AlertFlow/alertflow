package admins

import (
	"alertflow-backend/functions/auth"
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

func GenerateServiceToken(context *gin.Context, db *bun.DB) {
	var expiresIn models.IncExpireTokenRequest
	if err := context.ShouldBindJSON(&expiresIn); err != nil {
		httperror.StatusBadRequest(context, "Error parsing incoming data", err)
		return
	}

	// save api key to tokens
	var token models.Tokens
	token.ID = uuid.New()
	token.Type = "service"
	token.Description = "Service API key. " + expiresIn.Description
	token.ProjectID = "admin"

	// generate api key
	tokenKey, expirationTime, err := auth.GenerateServiceJWT(expiresIn.ExpiresIn, token.ID)
	if err != nil {
		httperror.InternalServerError(context, "Error generating API key", err)
		return
	}

	token.Key = tokenKey
	token.ExpiresAt = expirationTime

	_, err = db.NewInsert().Model(&token).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error saving API key", err)
		return
	}

	context.JSON(http.StatusCreated, gin.H{
		"key": tokenKey,
	})
}
