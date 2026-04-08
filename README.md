# Salon Backend (Node.js + Express + Prisma)

Full backend starter for a salon management system.

## Features

- JWT authentication (`register`, `login`, `me`)
- Customer CRUD
- Appointment CRUD
- Prisma ORM with SQLite
- Request validation with Zod
- Centralized error handling

## 1) Setup

```bash
npm install
```

Copy env file:

```bash
copy .env.example .env
```

Then update `JWT_SECRET` in `.env`.

## 2) Database

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run seed
```

## 3) Run server

Development:

```bash
npm run dev
```

Production-like:

```bash
npm run start
```

Server URL: `http://localhost:5000`

## 4) API Endpoints

Base: `/api`

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (Bearer token)
- `GET /customers` (Bearer token)
- `GET /customers/:id` (Bearer token)
- `POST /customers` (Bearer token)
- `PATCH /customers/:id` (Bearer token)
- `DELETE /customers/:id` (Bearer token)
- `GET /appointments` (Bearer token)
- `GET /appointments/:id` (Bearer token)
- `POST /appointments` (Bearer token)
- `PATCH /appointments/:id` (Bearer token)
- `DELETE /appointments/:id` (Bearer token)

## 5) Default seed admin

After `npm run seed`:

- Email: `admin@salon.local`
- Password: `Admin@123`

## 6) Example request flow

1. Register/login to receive JWT token.
2. Send `Authorization: Bearer <token>` for protected routes.
3. Create customer first.
4. Create appointment using `customerId` and `staffId`.
