package functions_runner

import (
	"alertflow-backend/functions/auth"
	"alertflow-backend/models"
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

func GenerateProjectAutoJoinToken(projectID string, db *bun.DB) (token string, err error) {
	var key models.Tokens

	key.ID = uuid.New()
	key.CreatedAt = time.Now()
	key.ProjectID = projectID
	key.Type = "project_auto_runner"
	key.Description = "Token for Project Auto Runner Join"

	key.Key, key.ExpiresAt, err = auth.GenerateProjectAutoRunnerJWT(projectID, key.ID)
	if err != nil {
		return "", err
	}

	_, err = db.NewInsert().Model(&key).Exec(context.Background())
	if err != nil {
		return "", err
	}

	return key.Key, nil
}
