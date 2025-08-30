package routes

import (
	"github.com/Avik-creator/pulse-backend/Middlewares"
	"github.com/Avik-creator/pulse-backend/handlers/pulse"
	"github.com/gin-gonic/gin"
)

type PingRequest struct {
	URL string `json:"url" binding:"required,url"`
}

func RegisterPingRoutes(router *gin.RouterGroup) {
	router.POST("/create", Middlewares.TokenValidator, pulse.CreatePulseHandler)
	router.PATCH("/reactivate", Middlewares.TokenValidator, pulse.ReactivatePulseHandler)
	router.DELETE("/delete", Middlewares.TokenValidator, pulse.DeletePulseHandler)
	router.GET("/getAll", Middlewares.TokenValidator, pulse.GetPingsHandler)
}

