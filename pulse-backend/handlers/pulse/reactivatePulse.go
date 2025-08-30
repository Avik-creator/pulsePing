package pulse

import (
	"fmt"
	"net/http"
	"time"

	database "github.com/Avik-creator/pulse-backend/Database"
	models "github.com/Avik-creator/pulse-backend/Models"
	"github.com/Avik-creator/pulse-backend/libraries"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

type ReactivatePulseRequest struct {
	TaskID int `json:"taskID" binding:"required"`
}

func ReactivatePulseHandler(c *gin.Context) {
	var pulseReq ReactivatePulseRequest

	email, emailExists := c.Get("email")
	if !emailExists {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email not found",
			"details": "User email is required to reactivate pulse",
		})
		return
	}

	if err := c.BindJSON(&pulseReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request payload",
			"details": err.Error(),
		})
		return
	}

	var user models.User
	err := database.DB.Preload("Tasks").First(&user, "email = ?", email).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "User not found",
			"details": err.Error(),
		})
		return
	}

	var task models.Task
	err = database.DB.First(&task, "id = ? AND user_id = ?", pulseReq.TaskID, user.ID).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Task not found for this user",
			"details": err.Error(),
		})
		return
	}

	// Reactivate the pulse
	task.IsActive = true
	if err := database.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to reactivate task",
			"details": err.Error(),
		})
		return
	}

	redisClient := libraries.GetRedisClient()
	taskMember := fmt.Sprintf("%d|%s", task.ID, task.URL)
	nextPingTime := time.Now().Add(5 * time.Minute).Unix()
	_, err = redisClient.ZAdd(c, "ping_queue", redis.Z{
		Score:  float64(nextPingTime),
		Member: taskMember,
	}).Result()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to add task to ping queue",
			"details": err.Error(),
		})
		return
	}


	c.JSON(http.StatusOK, gin.H{
		"message": "Task reactivated successfully",
		"taskId":  task.ID,
		"url":     task.URL,
	})

}