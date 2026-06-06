# Advanced MongoDB + Express + Node.js Boilerplate — ES6 Version

Production-style backend starter using ES Modules (`import/export`).

## Features

- ES Modules: `type: module`, `import/export`
- MVC architecture
- Service layer + repository layer
- MongoDB/Mongoose models
- JWT access + refresh token auth
- RBAC middleware
- Joi request validation
- Centralized error handling
- Winston logger
- Security middleware: Helmet, CORS, compression, rate limit
- Swagger docs placeholder
- Jest + Supertest test setup for ESM
- Docker + Docker Compose

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```

Health check:

```bash
GET http://localhost:4000/api/v1/health
```

## APIs

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh-token
GET  /api/v1/users/me
GET  /api/v1/users        Admin only
```

## Folder Structure

```text
src/
├── app.js
├── server.js
├── config/
├── constants/
├── controllers/
├── database/
├── docs/
├── events/
├── jobs/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── tests/
├── utils/
└── validators/
```

## Docker

```bash
docker compose up --build
```
