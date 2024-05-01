# Goal Tracking

## Description

This project is a web application that utilizes Bun.js and Elysia.js for server-side rendering and TypeScript for type safety. The client-side is built with Next.js to provide a fast and efficient user experience.

## Tech Stack

- [Bun.js](https://bun.js.org/): A server-side rendering framework for Node.js applications.
- [Elysia.js](https://elysia.dev/): A JavaScript library for ray tracing and rendering realistic images.
- [TypeScript](https://www.typescriptlang.org/): A superset of JavaScript that adds static types to the language.
- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and statically generated web applications.
- [MongoDb](https://www.mongodb.com/cloud/atlas/register?adgroup=131761134692&cq_cmp=14412646494) : A document based database

## Architecture

- Backend built with Bun.js runtime and Elysia server
- Client is built with Nextjs
- Validation is done with Elysia plugin
- Cron run with Elysia which is run on every 5 minutes to fetch reminder and send email using Nodemailer
- Client using radix UI for components

## User Model

### Schema

- `name`: String
- `email`: String
- `password`: String
- `phone`: Date
- `weight`: Date
- `height`: Date
- `bmi`: Date

## Goal Model

### Schema

- `userId`: Reference
- `title`: String
- `minTimeline`: Date
- `maxTimeline`: Date
- `startDate`: Date
- `tasks`: Array of tasks Id

## Task Model

### Schema

- `goalId`: Reference to goal collection
- `title`: String
- `quantity`: Number
- `frequency`: ENUM
- `customDays`: Number (7 digits number represent each day of week)
- `reminders`: Array of reminders

## Reminder Model

### Schema

- `userId`: Reference to goal collection
- `taskId`: String
- `time`: Date

## How To Run

```bash
git clone https://github.com/your-username/your-project.git
```

```bash
cd server
bun run dev
```

```bash
cd client
npm run dev
```
