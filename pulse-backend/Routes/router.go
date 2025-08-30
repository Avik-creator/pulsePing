package routes

import (
	"net/http"

	"github.com/Avik-creator/pulse-backend/handlers/auth"
	"github.com/gin-gonic/gin"
)

func SetupRouter(router *gin.Engine) {
	apiGroup := router.Group("/api/v1")
	apiGroup.GET("/auth/google", auth.GoogleAuth)
	apiGroup.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "Server is Healthy"})
	})

	pingGroup := apiGroup.Group("/ping")
	RegisterPingRoutes(pingGroup)
}