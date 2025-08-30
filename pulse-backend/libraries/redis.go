package libraries

import (
	"context"
	"log"
	"os"
	"sync"

	"github.com/redis/go-redis/v9"
)

//
var lock = &sync.Mutex{}

type Singleton struct {
	Client *redis.Client
}

var instance *Singleton

func GetRedisInstance() *Singleton {
	if instance == nil {
		lock.Lock()
		defer lock.Unlock()
		if instance == nil {
			instance = &Singleton{
				Client: GetRedisClient(),
			}
		}
	}
	return instance
}

func GetRedisClient() *redis.Client {
	redisURL := os.Getenv("REDIS_URL")
	opts, err := redis.ParseURL(redisURL)
	if err != nil {
		log.Fatal("SERVER Error - Failed to parse Redis URL: ", err)
	}
	client := redis.NewClient(opts)
	ctx := context.Background()
	_, err = client.Ping(ctx).Result()
	if err != nil {
		log.Fatal("SERVER Error - Redis Not Available and not connected")
	}
	log.Print("SERVER - Redis Available and connected")
	return client
}
