package auth

import (
	"alertflow-backend/pkg/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func GenerateAlertFlowAutoRunnerJWT(id uuid.UUID) (tokenString string, expirationTime time.Time, err error) {
	expirationTime = time.Now().Add(50 * 365 * 24 * time.Hour) // 10 years
	claims := &models.JWTProjectRunnerClaim{
		ProjectID: "admin",
		ID:        id,
		Type:      "alertflow_auto_runner",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err = token.SignedString(jwtKey)
	return
}
