package router

import (
	"alertflow-backend/handlers/auths"
	"alertflow-backend/handlers/tokens"

	"github.com/gin-gonic/gin"
	"github.com/uptrace/bun"
)

func Auth(router *gin.RouterGroup, db *bun.DB) {
	auth := router.Group("/auth")
	{
		auth.POST("/login", func(c *gin.Context) {
			tokens.GenerateToken(db, c)
		})
		auth.POST("/register", func(c *gin.Context) {
			auths.RegisterUser(c, db)
		})
		auth.POST("/user/taken", func(c *gin.Context) {
			auths.CheckUserTaken(c, db)
		})
	}
}
