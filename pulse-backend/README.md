# PulsePing Backend

This is the backend service for PulsePing, a server monitoring and notification platform. It is built with Go, Gin, GORM, PostgreSQL, Redis, and Resend for email notifications.

---

## Features

- **Google OAuth Authentication**  
  Authenticate users via Google and issue JWT tokens.

- **Server Health Monitoring**  
  Add URLs to monitor. The backend pings servers every 5 minutes.

- **Automatic Email Notifications**  
  Sends email alerts (via Resend) when a server fails consecutive health checks.

- **Task & Log Management**  
  Create, delete, reactivate tasks; view logs for each monitored server.

---

## Tech Stack

- **Language:** Go
- **Framework:** Gin
- **Database:** PostgreSQL (via GORM)
- **Cache/Queue:** Redis
- **Email:** Resend
- **Auth:** Google OAuth, JWT

---

## Getting Started

### Prerequisites

- Go (v1.24+)
- PostgreSQL
- Redis
- Resend API Key
- Google OAuth credentials

---

### 1. Environment Variables

Create a `.env` file in `pulse-backend/`:

```
DATABASE_URL=your_postgres_url
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
REDIS_URL=your_redis_url
PORT=8000
```

---

### 2. Install Dependencies

```sh
go mod tidy
```

---

### 3. Run the Backend

```sh
go run main.go
```

The server will start on the port specified in `.env` (default: 8000).

---

## API Endpoints

- `GET /api/v1/auth/google`  
  Authenticate with Google and receive a JWT.

- `POST /api/v1/ping/create`  
  Create a new monitoring task.

- `PATCH /api/v1/ping/reactivate`  
  Reactivate a paused task.

- `DELETE /api/v1/ping/delete`  
  Delete a monitoring task.

- `GET /api/v1/ping/getAll`  
  Get all tasks and logs for the authenticated user.

---

## Project Structure

```
pulse-backend/
  main.go
  Database/
    database.go
  Models/
    models.go
  Routes/
    router.go
    ping.go
  handlers/
    auth/
      google.go
    pulse/
      createPulse.go
      getPulse.go
      deletePulse.go
      reactivatePulse.go
  libraries/
    redis.go
    resend.go
  Middlewares/
    token.go
  Workers/
    pingWorker.go
    NotificationWorker.go
```

---

## Contributing

Pull requests are welcome! For major changes, open an issue first.

---
