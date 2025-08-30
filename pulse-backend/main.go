package main

import (
	"log"
	"os"

	database "github.com/Avik-creator/pulse-backend/Database"
	models "github.com/Avik-creator/pulse-backend/Models"
	routes "github.com/Avik-creator/pulse-backend/Routes"
	workers "github.com/Avik-creator/pulse-backend/Workers"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env only for local development
	if _, exists := os.LookupEnv("PORT"); !exists {
		_ = godotenv.Load()
	}

	database.ConnectToDB()
	if err := database.AutoMigrate(&models.User{}, &models.Log{}, &models.Task{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	router := gin.Default()
	routes.SetupRouter(router)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8000" // fallback
	}

	go workers.StartPulseWorker()
	go workers.NotificationWorker()

	log.Println("Server running on port", PORT)
	if err := router.Run(":" + PORT); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
