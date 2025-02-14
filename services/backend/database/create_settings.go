package database

import (
	"alertflow-backend/pkg/models"
	"context"

	functions_runner "alertflow-backend/functions/runner"

	log "github.com/sirupsen/logrus"
	"github.com/uptrace/bun"
)

func createDefaultSettings(db *bun.DB) {
	ctx := context.Background()

	var settings models.Settings
	count, err := db.NewSelect().Model(&settings).Where("id = 1").ScanAndCount(ctx)
	if err != nil && count != 0 {
		panic(err)
	}

	if count == 0 {
		log.Info("No existing settings found. Creating default...")
		settings.ID = 1
		settings.AlertFlowRunnerAutoJoinToken, err = functions_runner.GenerateAlertFlowAutoJoinToken(db)
		if err != nil {
			panic(err)
		}

		_, err := db.NewInsert().Model(&settings).Exec(ctx)
		if err != nil {
			panic(err)
		}
	}
}
