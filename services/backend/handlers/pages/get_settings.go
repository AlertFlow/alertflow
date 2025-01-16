package pages

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func GetSettings(context *gin.Context, db *bun.DB) {
	var settings models.Settings
	err := db.NewSelect().Model(&settings).Column(
		"maintenance",
		"signup",
		"create_projects",
		"create_flows",
		"create_runners",
		"create_api_keys",
		"add_project_members",
		"add_flow_actions",
		"start_executions",
		"inject_payloads",
	).Where("id = 1").Scan(context)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting settings data on db", err)
		return
	}

	context.JSON(http.StatusOK, gin.H{"settings": settings})
}