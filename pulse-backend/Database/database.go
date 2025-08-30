package database

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// DB is a global database connection pool
var DB *gorm.DB

// ConnectToDB establishes a connection to the database
func ConnectToDB(){
	DATABASE_URL := os.Getenv("DATABASE_URL")
	logger := logger.Default.LogMode(logger.Info)
	connection, err := gorm.Open(postgres.Open(DATABASE_URL), &gorm.Config{
		Logger: logger,
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB = connection
}

// AutoMigrate automatically migrates the database schema
func AutoMigrate(models ...interface{}) error {
	return DB.AutoMigrate(models...)
}