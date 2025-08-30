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

type PulseRequest struct {
	URL string `json:"url" binding:"required,url"`
}

func CreatePulseHandler (c *gin.Context) {
	var pulseReq PulseRequest
	email, emailExists := c.Get("email")

	if !emailExists {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found", "details": "Email is required to create a pulse"})
		return
	}

	if err := c.BindJSON(&pulseReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Request Format Mate",
			"details": err.Error(),
		})
		return
	}

	var user models.User;
	err := database.DB.Preload("Tasks").Find(&user, "email = ?", email).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User not found",
			"details": err.Error(),
		})
		return
	}
	if len(user.Tasks) >= 5 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Task limit reached",
			"details": "You can only have 5 active tasks at a time",
		})
		return
	}

	for _, task := range user.Tasks {
		if task.URL == pulseReq.URL {
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   "Task already exists",
				"details": "You already have a task with this URL",
			})
			return
		}
	}

	newTask := models.Task{
		URL: pulseReq.URL,
		IsActive: true,
		UserID: user.ID,
		NotifyEmail: true,
	}

	if err := database.DB.Create(&newTask).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create task",
			"details": err.Error(),
		})
		return
	}

	redisClient := libraries.GetRedisClient()
	taskMember := fmt.Sprintf("%d|%s", newTask.ID, newTask.URL)

	// For every 5 mins:
	redisClient.ZAdd(c, "ping_queue", redis.Z{Score: float64(time.Now().Add(5 * time.Minute).Unix()),
		Member: taskMember})

	c.JSON(http.StatusOK, gin.H{
		"message": "Pulse created successfully",
		"task": newTask,
		"taskID": newTask.ID,
		"url": newTask.URL,
	})
}
