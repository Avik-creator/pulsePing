package pulse

import (
	"net/http"

	database "github.com/Avik-creator/pulse-backend/Database"
	models "github.com/Avik-creator/pulse-backend/Models"
	"github.com/gin-gonic/gin"
)

type DeletePulseRequest struct {
	TaskID uint `json:"task_id" binding:"required"`
}

func DeletePulseHandler(c *gin.Context) {
	var delPulseReq DeletePulseRequest

	email, emailExists := c.Get("email")
	if !emailExists {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Email not found",
			"details": "Email is required to delete a pulse",
		})
	}

	if err := c.BindJSON(&delPulseReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid Request Format",
			"details": err.Error(),
		})
	}
	var user models.User
	err := database.DB.Preload("Tasks").Find(&user, "email = ?", email).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to find user",
			"details": err.Error(),
		})
		return
	}

	for _, task := range user.Tasks {
		if task.ID == delPulseReq.TaskID {
			if err := database.DB.Delete(&task).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to delete pulse",
					"details": err.Error(),
				})
			}

			if err := database.DB.Where("task_id = ?", task.ID).Delete(&models.Log{}).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to delete pulse",
					"details": err.Error(),
				})
				return
			}

			if err := database.DB.Model(&user).Association("Tasks").Delete(&task); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error":   "Failed to delete pulse relation with user",
					"details": err.Error(),
				})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"message": "Pulse deleted successfully",
				"taskID":  delPulseReq.TaskID,
			})
			return
		}
	}
}
