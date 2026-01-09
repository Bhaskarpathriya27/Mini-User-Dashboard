# Mini User Dashboard — Real-Time Cryptocurrency Data

Professional, production-ready full-stack sample project that displays top cryptocurrencies using CoinGecko. Built for interview evaluation.

## Project Overview

- Backend: Node.js + Express — proxy API, caching, resilient HTTP client.
- Frontend: React (Vite) — responsive dashboard with search, theme toggle, skeleton loader.

## ✨ Features

- 📡 Backend API that fetches crypto data from CoinGecko
- 🖥️ Modern, responsive React dashboard UI
- 🔍 Search coins by name
- 🔄 Refresh button to re-fetch latest data
- 🌗 Light / Dark mode toggle
- ⏳ Loading skeleton states
- ❌ Error handling for API failures
- 🧱 Clean and structured codebase
- 📱 Fully responsive grid layout

## Tech Stack

- Node.js, Express, Axios
- React, Vite
- Plain CSS with theme tokens

## How to run

Start backend:

```pwsh
cd backend
npm install
# dev (requires nodemon globally or install as devDependency)
npm run dev
# or production
npm start
```

Start frontend:

```pwsh
cd frontend
npm install
npm run dev
```

## Architecture

- `backend/src/clients` — external API client (CoinGecko)
- `backend/src/services` — business logic, caching & normalization
- `frontend/src/components` — reusable UI components
- `frontend/src/services` — client-side API layer

## Notes

This repository is intentionally small but demonstrates production patterns: service layer, centralized error handling, caching, API retries, clean component structure, and UX polish.
