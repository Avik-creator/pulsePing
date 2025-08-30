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
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	database.ConnectToDB()
	if err := database.AutoMigrate(&models.User{}, &models.Log{}, &models.Task{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	if err != nil {
		log.Fatal("Error starting server:", err)
	}

	router := gin.Default()
	routes.SetupRouter(router)
	PORT := os.Getenv("PORT")

	go workers.StartPulseWorker()
	go workers.NotificationWorker()


	router.Run(":" + PORT)


}


