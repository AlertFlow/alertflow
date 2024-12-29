package router

import (
	"alertflow-backend/handlers/admins"
	"alertflow-backend/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func Admin(router *gin.RouterGroup, db *bun.DB) {
	admin := router.Group("/admin").Use(middlewares.Admin(db))
	{
		// stats
		admin.GET("/stats", func(c *gin.Context) {
			admins.GetStats(c, db)
		})

		admin.GET("/projects", func(c *gin.Context) {
			admins.GetProjects(c, db)
		})
		admin.PUT("/settings", func(c *gin.Context) {
			admins.UpdateSettings(c, db)
		})

		// users
		admin.GET("/users", func(c *gin.Context) {
			admins.GetUsers(c, db)
		})
		admin.PUT("/users/:userID", func(c *gin.Context) {
			admins.UpdateUser(c, db)
		})
		admin.PUT("/users/:userID/state", func(c *gin.Context) {
			admins.DisableUser(c, db)
		})
		admin.POST("/users/:userID/notification", func(c *gin.Context) {
			admins.SendAdminToUserNotification(c, db)
		})
		admin.DELETE("/users/:userID", func(c *gin.Context) {
			admins.DeleteUser(c, db)
		})

		// runners
		admin.GET("/runners", func(c *gin.Context) {
			admins.GetRunners(c, db)
		})
		admin.PUT("/runners/:runnerID/status", func(c *gin.Context) {
			admins.ChangeRunnerStatus(c, db)
		})

		// tokens
		admin.GET("/tokens", func(c *gin.Context) {
			admins.GetTokens(c, db)
		})
		admin.PUT("/tokens/:tokenID/status", func(c *gin.Context) {
			admins.ChangeTokenStatus(c, db)
		})

		// projects
		admin.PUT("/projects/:projectID/status", func(c *gin.Context) {
			admins.ChangeProjectStatus(c, db)
		})

		// flows
		admin.GET("/flows", func(c *gin.Context) {
			admins.GetFlows(c, db)
		})
		admin.PUT("/flows/:flowID/status", func(c *gin.Context) {
			admins.ChangeFlowStatus(c, db)
		})

		// payloads
		admin.GET("/payloads", func(c *gin.Context) {
			admins.GetPayloads(c, db)
		})

		// executions
		admin.GET("/executions", func(c *gin.Context) {
			admins.GetExecutions(c, db)
		})
	}
}