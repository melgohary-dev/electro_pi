# Electro Pi Product Store

A production-grade e-commerce product listing app built with Next.js, featuring authentication, infinite scroll, i18n (Arabic/English), RTL support, and dark/light mode.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** Ant Design 6
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit (auth + app state)
- **Server State:** TanStack React Query v5
- **i18n:** next-intl (cookie-based locale, no URL prefix)
- **Auth:** JWT in httpOnly cookies via Next.js API Routes
- **Infinite Scroll:** IntersectionObserver + useInfiniteQuery
- **API:** FakeStoreAPI (products) + custom auth API

## Features

### Core

- User registration & login with JWT (httpOnly cookies)
- Product listing with infinite scroll
- Search by product title (debounced)
- Category filter (clickable tags)
- Product detail page with SEO metadata
- Loading skeletons & error states

### Internationalization

- Arabic (العربية) & English
- Cookie-based locale (no URL prefix — cleaner URLs)
- Full RTL support via Ant Design ConfigProvider + Tailwind `rtl:` variants

### Theming

- Light & Dark mode
- Persisted in cookie
- Ant Design theme algorithm + Tailwind `dark:` class
- No flash on hydration

### Performance & Security

- `next/image` with AVIF/WebP, lazy loading
- React Query caching (5min stale time)
- Ant Design package optimization
- JWT in httpOnly cookie (XSS-safe)
- Security headers via Next.js config
- Console removed in production (except errors)

### Developer Experience

- TypeScript strict + noUncheckedIndexedAccess
- ESLint (next/core-web-vitals + prettier)
- Prettier with Tailwind plugin
- Husky + lint-staged pre-commit hooks
- EditorConfig

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd e-commerce-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and set a secure JWT_SECRET

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `npm run dev`       | Start development server  |
| `npm run build`     | Production build          |
| `npm run start`     | Start production server   |
| `npm run lint`      | Run ESLint                |
| `npm run lint:fix`  | Fix lint issues           |
| `npm run format`    | Format code with Prettier |
| `npm run typecheck` | TypeScript type checking  |

## Project Structure

```
src/
├── app/
│   ├── api/auth/           # Next.js API routes (register, login, me, logout)
│   ├── product/[id]/       # Product details page (SSR + dynamic metadata)
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── layout.tsx          # Root layout (i18n, theme, font)
│   ├── client-layout.tsx   # Client wrapper (providers, navbar, footer)
│   └── page.tsx            # Home — product list
├── components/
│   ├── auth/               # AuthGuard, AuthForm
│   ├── layout/             # Navbar, Footer, LanguageSwitcher, ThemeSwitcher
│   ├── product/            # ProductCard, ProductGrid
│   ├── providers/          # ReduxProvider, QueryProvider, AntdConfigProvider
│   └── ui/                 # SearchBar, CategoryFilter, InfiniteScrollObserver, etc.
├── hooks/                  # useProducts, useProduct, useAuth, useDebounce, useLocale
├── lib/                    # api-client, fake-store, jwt
├── store/                  # Redux store + slices (auth, app)
├── types/                  # TypeScript types
└── config/                 # Constants
```

## API Endpoints

### Auth (built-in, via Next.js API Routes)

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login               |
| POST   | `/api/auth/logout`   | Logout              |
| GET    | `/api/auth/me`       | Get current user    |

### Products (FakeStoreAPI)

| Method | URL                                            | Description    |
| ------ | ---------------------------------------------- | -------------- |
| GET    | `https://fakestoreapi.com/products`            | All products   |
| GET    | `https://fakestoreapi.com/products/{id}`       | Single product |
| GET    | `https://fakestoreapi.com/products/categories` | Category list  |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repo on Vercel
3. Set `JWT_SECRET` environment variable
4. Deploy

### Build Note

This project uses Webpack instead of Turbopack for compatibility on all platforms.

```bash
npm run build  # Uses --webpack flag
```

## Postman Collection

Import the following collection to test the API:

```json
{
  "info": {
    "name": "Electro Pi Store API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/auth/register",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"user@example.com\",\"password\":\"password123\",\"name\":\"User\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"user@example.com\",\"password\":\"password123\"}"
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/auth/me"
      }
    },
    {
      "name": "Logout",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/auth/logout"
      }
    },
    {
      "name": "Get Products",
      "request": {
        "method": "GET",
        "url": "https://fakestoreapi.com/products"
      }
    },
    {
      "name": "Get Product by ID",
      "request": {
        "method": "GET",
        "url": "https://fakestoreapi.com/products/1"
      }
    },
    {
      "name": "Get Categories",
      "request": {
        "method": "GET",
        "url": "https://fakestoreapi.com/products/categories"
      }
    }
  ]
}
```

## License

MIT
