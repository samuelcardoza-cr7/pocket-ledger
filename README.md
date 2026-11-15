# Pocket Ledger

A responsive personal finance tracker built around a clear monthly overview. The project uses a React dashboard, Clerk sign-in, an Express REST API, and MongoDB/Mongoose. Clerk issues signed session JWTs; the API verifies those JWTs and authorizes access to records by the verified Clerk user ID.

## Features

- Sign in and create an account using Clerk's prebuilt React authentication UI.
- Add income and expense records with category, amount, date, and optional note.
- View totals, a selectable six- or twelve-month income and expense chart with bar or area views, category spending chart, and recent activity.
- Search and filter the transaction history by type, category, and month.
- Edit transaction details, with ownership enforced by the API.
- Set a monthly spending budget and compare it with recorded expenses.
- Delete a transaction, with ownership enforced by the API.
- Explore a seeded sample dashboard without creating external accounts or configuring API keys.
- Responsive navigation and charts for phone, tablet, and desktop layouts.

## Project structure

```text
client/
  src/components/   Reusable forms, dialogs, and sign-in screen
  src/data/         Sample transactions and categories
  src/lib/           API client and currency/date formatting
  src/App.jsx        Dashboard composition and view state
  src/styles.css     Responsive interface styles
server/
  src/config/        MongoDB connection
  src/controllers/   HTTP request handlers
  src/middleware/    Clerk JWT auth, errors, and request handling
  src/models/        Mongoose transaction and budget models
  src/routes/        REST route definitions
  src/services/      Transaction validation and budget logic
```

## Run locally

Requirements: Node.js 20.9 or later, a Clerk application, and a MongoDB instance (local or MongoDB Atlas) for signed-in accounts.

1. Install root and app dependencies:

   ```bash
   npm install
   npm install --prefix client
   npm install --prefix server
   ```

2. Create an application in the [Clerk Dashboard](https://dashboard.clerk.com/) and copy its publishable and secret keys into local environment files:

   ```bash
   Copy-Item client/.env.example client/.env
   Copy-Item server/.env.example server/.env
   ```

   Set `VITE_CLERK_PUBLISHABLE_KEY` in `client/.env`. Set `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and `MONGODB_URI` in `server/.env`. Keep the secret key private; environment files are ignored by Git.

3. To explore the sample dashboard without configuring Clerk or MongoDB, start only the frontend:

   ```bash
   npm run dev
   ```

   The frontend opens at `http://localhost:5173`. Choose **Open the sample dashboard**.

4. For Clerk sign-in and saved personal records, configure both environment files and MongoDB as above, then run `npm run dev:fullstack`. The API listens on `http://localhost:4000`; its health check is `GET /api/health`.

For a separate frontend/API deployment, set `CLIENT_ORIGIN` on the API to the deployed frontend origin and set `VITE_API_URL` at frontend build time to the deployed API base ending in `/api`.

## API overview

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/transactions` | Clerk JWT | List the signed-in user's transactions |
| POST | `/api/transactions` | Clerk JWT | Add a validated transaction |
| PUT | `/api/transactions/:id` | Clerk JWT | Update an owned transaction with validated fields |
| GET | `/api/transactions/summary?month=YYYY-MM` | Clerk JWT | Calculate monthly totals and expense categories on the server |
| DELETE | `/api/transactions/:id` | Clerk JWT | Delete an owned transaction |
| GET | `/api/budgets/current?month=YYYY-MM` | Clerk JWT | Read the monthly limit and server-calculated spend |
| PUT | `/api/budgets/current` | Clerk JWT | Save a monthly spending limit |

## Security and data behavior

- Clerk manages account credentials and sessions. The client sends a Clerk session JWT as a bearer token to the API.
- Express `clerkMiddleware()` verifies Clerk session tokens; protected endpoints reject requests without an authenticated Clerk user ID.
- Every transaction and budget query or deletion is scoped to the verified Clerk user ID. The API ignores client-supplied owner IDs.
- Transaction fields and amount/date constraints are validated server-side. Totals and budget spend are calculated from MongoDB records.
- Helmet sets security headers, CORS is limited to the configured frontend origin, and API requests are rate limited.
- The sample dashboard uses clearly labeled fictional records stored in this browser's local storage. Sample mode does not call the API and is not a secure account or cloud backup.
- Clerk handles the sign-in UI and session lifecycle. A production deployment should use HTTPS, monitoring, and a tested recovery policy.

## Known scope

This is a runnable project scaffold, not a deployed service. Live accounts and persistent personal data require a configured MongoDB instance and API environment. No third-party payment, bank connection, geolocation, or external credentials are required. Transaction history is capped at 1,000 records per request; pagination can be added as the data set grows.
