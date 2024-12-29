package admin_stats

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func UsersPerRoleStats(context *gin.Context, db *bun.DB) []models.RoleCountStats {
	var stats []models.RoleCountStats
	err := db.NewRaw("SELECT role, COUNT(*) as count FROM users GROUP BY role ORDER BY role ASC").Scan(context, &stats)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting user stats from db", err)
		return nil
	}

	return stats
}
