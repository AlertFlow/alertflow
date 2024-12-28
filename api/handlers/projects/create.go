package projects

import (
	"alertflow-backend/functions/auth"
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
	"github.com/uptrace/bun"
)

func GenerateProjectRunnerJoinSecretKey() (string, error) {
	key := make([]byte, 32)
	if _, err := rand.Read(key); err != nil {
		return "", err
	}
	return hex.EncodeToString(key), nil
}

func CreateProject(context *gin.Context, db *bun.DB) {
	userID, err := auth.GetUserIDFromToken(context.GetHeader("Authorization"))
	if err != nil {
		httperror.InternalServerError(context, "Error receiving userID from token", err)
		return
	}

	var project models.Projects
	if err := context.ShouldBindJSON(&project); err != nil {
		httperror.StatusBadRequest(context, "Error parsing incoming data", err)
		return
	}

	if project.Name == "" {
		httperror.StatusBadRequest(context, "Project name is required", errors.New("project name is required"))
		return
	} else if project.Description == "" {
		httperror.StatusBadRequest(context, "Project description is required", errors.New("project description is required"))
		return
	}

	project.ID = uuid.New()

	project.RunnerJoinSecret, err = GenerateProjectRunnerJoinSecretKey()
	if err != nil {
		return
	}

	_, err = db.NewInsert().Model(&project).Column("id", "name", "description", "alertflow_runners", "icon", "color", "runner_join_secret").Exec(context)
	if err != nil {
		log.Error(err)
		httperror.InternalServerError(context, "Error creating project on db", err)
		return
	}

	projectMember := models.ProjectMembers{
		UserID:         userID.String(),
		ProjectID:      project.ID.String(),
		Role:           "Owner",
		Disabled:       false,
		DisabledReason: "",
		InvitePending:  false,
		InvitedAt:      time.Now(),
	}
	_, err = db.NewInsert().Model(&projectMember).Exec(context)
	if err != nil {
		httperror.InternalServerError(context, "Error adding member to project on db", err)
		return
	}

	context.JSON(http.StatusCreated, gin.H{"result": "success"})
}