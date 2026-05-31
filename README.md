# Spendly - Frontend

Spendly is a personal finance management web application built as a capstone project. It helps users track their daily spending, manage budgets across multiple wallets, and gain insights into their financial habits through AI-powered analysis and receipt scanning.

## Features

- **Dashboard** - Overview of balance, recent transactions, budget progress, and AI-generated spending insights
- **Receipt Scanning** - Upload or capture a receipt photo; the AI service extracts the total amount and merchant details via OCR
- **Transaction History** - Filterable and paginated list of all recorded transactions, grouped by date
- **Budget Management** - Set spending limits per category, track progress, and view historical budget data
- **Wallet Management** - Manage multiple wallets, transfer funds between them, and monitor per-wallet activity
- **AI Analysis** - Monthly spending trends, category breakdowns, predictive spending estimates, and AI-generated alerts
- **Categories** - Custom spending categories with icons and colors
- **Authentication** - JWT-based login and registration with automatic token refresh and session persistence
- **Dark Mode** - Theme toggle with system preference detection

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
| Forms | Zod (validation) |
| Notifications | Sonner |
| Email | EmailJS (contact form) |

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
│   ├── main.tsx
│   ├── index.css
│   ├── api/
│   │   ├── client.ts           # Axios instance + token refresh interceptor
│   │   ├── token.ts            # localStorage wrapper for JWT tokens
│   │   ├── cache.ts            # In-memory GET cache + request dedupe
│   │   ├── index.ts
│   │   └── endpoints/          # One file per backend resource
│   │       ├── auth.ts
│   │       ├── dashboard.ts
│   │       ├── budget.ts
│   │       ├── categories.ts
│   │       ├── transactions.ts
│   │       ├── wallets.ts
│   │       ├── scans.ts
│   │       └── analysis.ts
│   ├── components/             # Reusable UI grouped by domain
│   │   ├── ads/                # AdSense banner
│   │   ├── ai-analysis/
│   │   ├── auth/               # Login, register, route guards
│   │   ├── budget/
│   │   ├── categories/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   ├── forms/
│   │   ├── history/
│   │   ├── landing/            # Public marketing sections
│   │   ├── layout/             # Sidebar, navbar, bottom nav
│   │   ├── privacy/
│   │   ├── profile/
│   │   ├── scan/
│   │   ├── tnc/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   └── wallet/
│   ├── contexts/
│   │   ├── AuthContext.tsx     # User session state and auth actions
│   │   └── ThemeContext.tsx    # Dark/light mode
│   ├── features/               # Page-level hooks and orchestration
│   │   ├── analytics/          # useAnalysis
│   │   ├── budget/             # useBudgetList
│   │   ├── categories/         # useCategoriesList
│   │   ├── dashboard/          # useDashboard + transformers
│   │   ├── history/            # useHistoryList + dialogs + panels
│   │   ├── scan/               # useScanUpload (OCR polling)
│   │   └── wallet/             # useWalletList
│   ├── hooks/
│   │   ├── useForm.ts          # Zod-backed form helper
│   │   ├── useMediaQuery.ts    # useMediaQuery + useIsDesktop
│   │   ├── usePageTitle.ts
│   │   └── useScrollReveal.ts
│   ├── layouts/
│   │   ├── AuthLayout.tsx
│   │   ├── MainLayout.tsx
│   │   └── PublicLayout.tsx
│   ├── lib/
│   │   ├── category-icons.ts   # Lucide icon name -> component
│   │   ├── utils.ts            # cn() helper
│   │   └── validations/
│   │       └── auth.ts         # Zod schemas
│   ├── pages/                  # One folder per route
│   ├── types/                  # TypeScript interfaces grouped by feature
│   │   ├── analysis.ts
│   │   ├── auth.ts
│   │   ├── budget.ts
│   │   ├── categories.ts
│   │   ├── dashboard.ts
│   │   ├── forms.ts
│   │   ├── history.ts
│   │   ├── layout.ts
│   │   ├── pages.ts
│   │   ├── profile.ts
│   │   ├── scan.ts
│   │   ├── wallet.ts
│   │   ├── ai-analysis.ts
│   │   └── index.ts            # Aggregated re-exports
│   └── utils/
│       └── index.ts            # formatRupiah, formatDate, etc.
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
| `/reset-password` | Reset Password | Unauthenticated only |
| `/dashboard` | Dashboard | Authenticated |
| `/scan` | Scan Receipt | Authenticated |
| `/ai-analysis` | AI Analysis | Authenticated |
| `/history` | Transaction History | Authenticated |
| `/budget` | Budget | Authenticated |
| `/wallet` | Wallet | Authenticated |
| `/categories` | Categories | Authenticated |
| `/profile` | Profile | Authenticated |

## Architecture Notes

### Layered structure

- **`api/`** - HTTP client setup and one endpoint module per backend resource. Endpoint modules wrap raw axios calls in typed methods and handle cache invalidation.
- **`types/`** - Pure TypeScript types grouped by feature. No runtime code lives here. Components import types via the aggregated `@/types` barrel.
- **`components/`** - Presentational and structural components grouped by domain. Each domain folder has an `index.ts` that re-exports its public surface.
- **`features/`** - Higher-level page composition: data-fetching hooks, transformers, and feature-specific dialog components that pull together multiple `components/` and `api/` modules.
- **`pages/`** - Thin route entrypoints that orchestrate features and components. Pages keep one component per file and lean on hooks from `features/` for data and state.
- **`hooks/`** - Cross-feature hooks (form helpers, media queries, page title).

### Request deduplication and caching

All GET endpoints go through a small in-memory cache (`src/api/cache.ts`):

- Identical concurrent calls share a single in-flight promise (no duplicate network requests when the dashboard, sidebar, and a dialog all ask for categories at the same time).
- Successful responses are cached for 60 seconds (transactions cache for 30 seconds since filters change frequently).
- Mutations (`create`, `update`, `delete`, `transfer`) invalidate cache entries by key prefix so subsequent reads always reflect the latest server state.
- The cache is cleared on login and logout.

### Loading states

Pages that fetch data render skeleton placeholders that mirror the final layout (cards, rows, avatars) rather than spinners. Skeletons are extracted into their own components (e.g. `CategoryCardSkeleton`, `HistoryTableSkeleton`) and are responsive so they match the breakpoints of the real content.

### Authentication flow

1. On login or register, the server returns an access token, a refresh token, and the user object.
2. Tokens are stored in `localStorage`.
3. Every outgoing request attaches the access token as a `Bearer` header.
4. When a 401 is received, pending requests are queued and the client attempts a silent token refresh.
5. On successful refresh, queued requests are retried with the new token.
6. If the refresh fails, all queued requests are rejected and the user is redirected to `/login`.

## Getting Started

### Prerequisites

- Node.js 18 or later (or Bun)
- A running instance of the backend REST API
- A running instance of the AI/OCR service (consumed by the backend)

### Installation

```bash
git clone <repository-url>
cd spendly-fe
npm install   # or bun install
cp .env.example .env
```

Then open `.env` and fill in the values (see Environment Variables below).

### Running

```bash
npm run dev      # development server at http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL for the backend REST API (without `/v1` suffix) |
| `VITE_ADSENSE_CLIENT_ID` | Google AdSense client ID (optional) |
| `VITE_ADS_ENABLED` | `'true'` to enable AdSense, anything else disables ads |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service id (used by the contact form) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template id |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `VITE_EMAIL_TO` | Recipient address for contact form submissions |

All variables must be prefixed with `VITE_` to be exposed to the client by Vite.

## Contributing

1. Create a new branch from `main` for your feature or fix.
2. Match the existing folder conventions:
   - Types go under `src/types/<feature>.ts`.
   - Data-fetching hooks go under `src/features/<feature>/`.
   - Reusable presentational components go under `src/components/<domain>/` with one component per file.
3. Run `npm run lint` and `npm run build` before submitting a pull request.
4. Keep components focused on a single responsibility. If a page file declares more than one component, move the helpers into `components/` or `features/`.
