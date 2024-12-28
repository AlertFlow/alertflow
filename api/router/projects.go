package router

import (
	"alertflow-backend/handlers/projects"
	"alertflow-backend/middlewares"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func Projects(router *gin.RouterGroup, db *bun.DB) {
	project := router.Group("/projects").Use(middlewares.Auth(db))
	{
		project.GET("/", func(c *gin.Context) {
			projects.GetProjects(c, db)
		})
		project.GET("/:projectID", func(c *gin.Context) {
			projects.GetProject(c, db)
		})
		project.GET("/:projectID/tokens", func(c *gin.Context) {
			projects.GetProjectTokens(c, db)
		})
		project.GET("/:projectID/runners", func(c *gin.Context) {
			projects.GetProjectRunners(c, db)
		})
		project.GET("/:projectID/audit", func(c *gin.Context) {
			projects.GetProjectAuditLogs(c, db)
		})
		project.POST("/", func(c *gin.Context) {
			projects.CreateProject(c, db)
		})
		project.PUT("/:projectID", func(c *gin.Context) {
			projects.UpdateProject(c, db)
		})
		project.DELETE("/:projectID/leave", func(c *gin.Context) {
			projects.LeaveProject(c, db)
		})

		// project members
		project.POST("/:projectID/member", func(c *gin.Context) {
			projects.AddProjectMember(c, db)
		})
		project.PUT("/:projectID/member", func(c *gin.Context) {
			projects.EditProjectMember(c, db)
		})
		project.DELETE("/:projectID/member/:memberID", func(c *gin.Context) {
			projects.RemoveProjectMember(c, db)
		})

		// project invites
		project.PUT("/:projectID/invite", func(c *gin.Context) {
			projects.AcceptProjectInvite(c, db)
		})
		project.DELETE("/:projectID/invite", func(c *gin.Context) {
			projects.DeclineProjectInvite(c, db)
		})

		project.PUT("/:projectID/transfer_ownership", func(c *gin.Context) {
			projects.TransferOwnership(c, db)
		})

		project.DELETE("/:projectID", func(c *gin.Context) {
			projects.DeleteProject(c, db)
		})
	}
}