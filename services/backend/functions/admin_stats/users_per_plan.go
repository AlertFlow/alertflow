package admin_stats

import (
	"alertflow-backend/functions/httperror"
	"alertflow-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func UsersPerPlanStats(context *gin.Context, db *bun.DB) []models.PlanCountStats {
	var stats []models.PlanCountStats
	err := db.NewRaw("SELECT pl.name as plan, COUNT(us.*) as count FROM plans as pl LEFT JOIN users as us ON pl.id = us.plan GROUP BY pl.name, pl.price ORDER BY pl.price ASC").Scan(context, &stats)
	if err != nil {
		httperror.InternalServerError(context, "Error collecting user stats from db", err)
		return nil
	}

	return stats
}
