# Spendly - Frontend

Spendly is a personal finance management web application built as a capstone project. It helps users track their daily spending, manage budgets across multiple wallets, and gain insights into their financial habits through AI-powered analysis and receipt scanning.

## Features

- **Dashboard** - Overview of balance, recent transactions, budget progress, and AI-generated spending insights
- **Receipt Scanning** - Upload or capture a receipt photo; the AI service extracts the total amount and merchant details via OCR
- **Transaction History** - Filterable and paginated list of all recorded transactions, grouped by date
- **Budget Management** - Set spending limits per category, track progress, and view historical budget data
- **Wallet Management** - Manage multiple wallets, transfer funds between them, and monitor per-wallet activity
- **AI Analysis** - Monthly spending trends, category breakdowns, and predictive spending estimates
- **Categories** - Custom spending categories with icons and colors
- **Authentication** - JWT-based login and registration with automatic token refresh and session persistence

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI, shadcn/ui |
| Icons | Lucide React |
| HTTP Client | Axios |
| Tables | TanStack Table |
| Date Utilities | date-fns, Moment.js |
| Notifications | Sonner |
| Theme | next-themes (dark/light mode) |

## Project Structure

```
spendly-fe/
├── public/
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── logos/
├── src/
│   ├── App.tsx                 # Root router and context providers
│   ├── components/             # Reusable UI components grouped by domain
│   │   ├── ai-analysis/
│   │   ├── auth/               # Login, register forms and route guards
│   │   ├── budget/
│   │   ├── categories/
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── landing/
│   │   ├── layout/             # Sidebar, navbar, bottom navigation
│   │   ├── profile/
│   │   ├── scan/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   └── wallet/
│   ├── contexts/
│   │   ├── AuthContext.tsx     # User session state and auth actions
│   │   └── ThemeContext.tsx
│   ├── features/               # Feature-level page compositions
│   ├── hooks/
│   ├── layouts/
│   │   ├── AuthLayout.tsx
│   │   ├── MainLayout.tsx
│   │   └── PublicLayout.tsx
│   ├── lib/                    # Utility helpers and constants
│   ├── pages/                  # One folder per route
│   ├── services/
│   │   ├── backend-api.ts      # Axios instance for the REST backend
│   │   ├── ai-api.ts           # Axios instance for the AI/OCR service
│   │   └── auth-api.ts         # Auth endpoint wrappers
│   ├── types/                  # TypeScript interfaces per domain
│   └── utils/
│       └── auth-storage.ts     # localStorage wrapper for tokens and user data
├── .env.example
├── components.json             # shadcn/ui configuration
└── package.json
```

## Pages and Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/contact-us` | Contact Us | Public |
| `/faq` | FAQ | Public |
| `/tnc` | Terms and Conditions | Public |
| `/privacy-policy` | Privacy Policy | Public |
| `/login` | Login | Unauthenticated only |
| `/register` | Register | Unauthenticated only |
| `/forgot-password` | Forgot Password | Unauthenticated only |
| `/dashboard` | Dashboard | Authenticated |
| `/scan` | Scan Receipt | Authenticated |
| `/ai-analysis` | AI Analysis | Authenticated |
| `/history` | Transaction History | Authenticated |
| `/budget` | Budget | Authenticated |
| `/wallet` | Wallet | Authenticated |
| `/categories` | Categories | Authenticated |
| `/profile` | Profile | Authenticated |

## Getting Started

### Prerequisites

- Node.js 18 or later (or Bun)
- A running instance of the backend REST API
- A running instance of the AI/OCR service

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd spendly-fe
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Then open `.env` and fill in the values (see the Environment Variables section below).

### Running the Development Server

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
```

This runs TypeScript type checking followed by a Vite production build. Output goes to the `dist/` folder.

### Preview the Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

| Variable | Description | Default |
|---|---|---|
| `VITE_BACKEND_URL` | Base URL for the backend REST API | `http://localhost:3000/api` |
| `VITE_AI_API_URL` | Base URL for the AI/OCR service | `http://localhost:8000/api` |
| `VITE_ADSENSE_CLIENT_ID` | Google AdSense client ID (optional) | — |

All variables must be prefixed with `VITE_` to be exposed to the client by Vite.

## API Overview

The frontend communicates with two separate backend services:

**Backend REST API** (`VITE_BACKEND_URL`)

Handles all core application data including users, transactions, budgets, and wallets. Requests are automatically authenticated with a Bearer token. On a 401 response, the client attempts a silent token refresh before retrying the original request. If the refresh fails, the user is redirected to the login page.

**AI Service** (`VITE_AI_API_URL`)

Handles receipt OCR and spending predictions. The OCR endpoint accepts a multipart form upload and returns extracted transaction data. The predictions endpoint returns estimated future spending based on historical patterns.

## Authentication Flow

1. On login or register, the server returns an access token, a refresh token, and the user object.
2. Tokens are stored in `localStorage` under the `spendly:` namespace.
3. Every outgoing request attaches the access token as a `Bearer` header.
4. When a 401 is received, the client queues pending requests and attempts to refresh the token silently.
5. On successful refresh, queued requests are retried with the new token.
6. If the refresh fails, all queued requests are rejected and the user is redirected to `/login`.

## Contributing

1. Create a new branch from `main` for your feature or fix.
2. Follow the existing code style and component structure.
3. Run `npm run lint` before submitting a pull request.
4. Keep components focused on a single responsibility and co-locate related files within their domain folder.
