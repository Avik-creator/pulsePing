package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	database "github.com/Avik-creator/pulse-backend/Database"
	models "github.com/Avik-creator/pulse-backend/Models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type UserInfo struct {
	Email string `json:"email"`
}

type CustomClaims struct {
	UserId uint   `json:"userId"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

// GoogleAuth authenticates with Google OAuth, registers user if not exists, and returns a JWT
func GoogleAuth(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Authorization header missing"})
		c.Abort()
		return
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid authorization format"})
		c.Abort()
		return
	}
	accessToken := parts[1]

	// ✅ Use Google's userinfo endpoint instead of deprecated tokeninfo
	req, _ := http.NewRequest("GET", "https://www.googleapis.com/oauth2/v3/userinfo", nil)
	req.Header.Set("Authorization", "Bearer "+accessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get user info"})
		c.Abort()
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid or expired access token"})
		c.Abort()
		return
	}

	var userInfo UserInfo
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to decode user info"})
		c.Abort()
		return
	}

	// ✅ Check if user exists, else create
	var user models.User
	if err := database.DB.First(&user, "email = ?", userInfo.Email).Error; err != nil {
		user = models.User{Email: userInfo.Email}
		if err := database.DB.Create(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create user"})
			c.Abort()
			return
		}
	}

	// ✅ Generate JWT with email + userId + expiry
	signedToken, err := GetSignedToken(user.ID, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to generate token"})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": signedToken,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
		},
	})
}

// GetSignedToken generates a JWT for the user with expiry
func GetSignedToken(userId uint, email string) (string, error) {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return "", ErrMissingSecret
	}

	claims := CustomClaims{
		UserId: userId,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)), // ✅ 24h expiry
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "pulse-backend", // ✅ helps identify your service
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtSecret))
}

// custom error if JWT_SECRET missing
var ErrMissingSecret = fmt.Errorf("JWT_SECRET environment variable not set")
