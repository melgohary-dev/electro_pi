# Electro Pi Product Store

A production-grade e-commerce product listing app built with Next.js, featuring authentication, infinite scroll, i18n (Arabic/English), full RTL support, dark/light mode, and 4 primary color themes.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **UI Library:** Ant Design 6
- **State Management:** Redux Toolkit (auth state)
- **Server State:** TanStack React Query v5
- **i18n:** Custom cookie-based locale (no URL prefix) with Arabic & English translations
- **Theming:** CSS custom properties + Ant Design ConfigProvider (dark/light algorithm, 4 color themes)
- **Auth:** JWT in httpOnly cookies via Next.js API Routes
- **Infinite Scroll:** IntersectionObserver + useInfiniteQuery
- **API:** FakeStoreAPI (products) + custom auth API
- **Styling:** Ant Design components + CSS classes in globals.css (no Tailwind, no CSS modules, no inline styles except for dynamic values)

## Features

### Core

- User registration & login with JWT (httpOnly cookies)
- Product listing with infinite scroll
- Search by product title (debounced)
- Category filter (clickable tags with icons)
- Product detail page with SEO metadata
- Loading skeletons & error states

### Internationalization

- Arabic (العربية) & English
- Cookie-based locale (NEXT_LOCALE) — no URL prefix
- Full RTL support via Ant Design ConfigProvider direction
- Separate fonts: Inter (English), Noto Naskh Arabic (Arabic)
- Flag icons for language toggle

### Theming

- Light & Dark mode (persisted in cookie)
- 4 primary color options: Orange, Blue, Emerald, Violet
- Ant Design theme algorithm + CSS custom properties
- `data-theme` attribute on `<html>` drives CSS variable overrides
- `--primary-color` CSS variable updates dynamically (no flash on hydration)

### Responsive Design

- Nav links, auth buttons, color picker, and mode toggle hidden on ≤768px
- Language flag + hamburger menu shown only on mobile
- Drawer sidebar with grouped sections (Navigation, Theme, Language, Account)
- Mobile-optimized auth page padding

### Performance & Security

- Plain `<img>` tags with lazy loading (no next/image)
- React Query caching (5min stale time)
- Ant Design package optimization
- JWT in httpOnly cookie (XSS-safe)
- Security headers via Next.js config
- CSP headers with WebSocket support for dev HMR

### Developer Experience

- TypeScript strict
- ESLint (next/core-web-vitals)
- Prettier
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
│   ├── layout.tsx          # Root layout (fonts, providers)
│   ├── client-layout.tsx   # Client wrapper (LanguageProvider, ThemeProvider, ConfigProvider)
│   ├── page.tsx            # Home — product list with search, filters, infinite scroll
│   ├── loading.tsx         # Full-page skeleton grid
│   ├── error.tsx           # Error boundary
│   ├── global-error.tsx    # Root error boundary (own html/body)
│   └── globals.css         # All CSS (custom properties, responsive, component classes)
├── components/
│   ├── auth/               # AuthForm (login/register)
│   ├── common/             # ErrorFallback
│   ├── filters/            # SearchBar, CategoryFilter
│   ├── layout/             # Navbar, Footer, PageLayout
│   ├── product/            # ProductCard, ProductGrid
│   └── providers/          # ReduxProvider, QueryProvider
├── hooks/                  # useProducts, useProduct, useAuth, useDebounce, useAppStore, useIntersectionObserver
├── i18n/                   # en.ts, ar.ts, LanguageContext.tsx
├── lib/                    # api-client, fake-store, jwt
├── store/                  # Redux store + slices (auth)
├── theme/                  # ThemeContext (mode, primary color, cookie persistence)
├── types/                  # TypeScript types (auth, product)
└── config/                 # Constants (PRODUCTS_PER_PAGE)
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

## License

MIT
