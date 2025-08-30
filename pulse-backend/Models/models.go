package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email string `json:"email" binding:"required,email"`
	Tasks []Task `json:"tasks" gorm:"foreignKey:UserID"`
}

type Task struct {
	gorm.Model
	URL         string  `json:"url" binding:"required"`
	IsActive    bool    `json:"isActive"`
	NotifyEmail bool    `json:"notifyEmail" gorm:"default:false"`
	UserID     uint    `json:"userId"`
	Logs       []Log   `json:"logs" gorm:"foreignKey:TaskID"`
	FailCount  int     `json:"failCount" gorm:"default:0"`
}

type Log struct {
	gorm.Model
	TaskID uint `json:"taskId"`
	Time        time.Time `json:"time"`
	TimeTake    int64     `json:"timeTake"`
	LogResponse string    `json:"logResponse"`
	IsSuccess   bool      `json:"isSuccess"`
	RespCode    int       `json:"respCode"`
}
