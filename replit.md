# Airavata Technologies Website

## Overview

This is a modern, responsive corporate website for Airavata Technologies, a tech company offering services like web development, mobile apps, cloud solutions, AI automation, and cybersecurity. The website features a futuristic, minimalistic design with smooth animations, glass UI effects, and a primary white/blue color palette. It includes a home page with hero section, about section, services showcase, project portfolio, and contact form with EmailJS integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and scroll effects
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Build Tool**: Vite with HMR support

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **TypeScript**: Full TypeScript support with ESM modules
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Development**: Vite middleware integration for seamless dev experience

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Current Storage**: In-memory storage implementation (`MemStorage` class) as default
- **Database Ready**: Configured for Neon PostgreSQL via `@neondatabase/serverless`

### Project Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components (layout, sections, ui)
│   │   ├── pages/       # Route pages (home, portfolio, not-found)
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and query client
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API route definitions
│   ├── storage.ts       # Data storage interface
│   └── vite.ts          # Vite dev server integration
├── shared/              # Shared code between client/server
│   └── schema.ts        # Database schema and types
└── attached_assets/     # Static assets and images
```

### Path Aliases
- `@/` → `client/src/` (components, lib, hooks)
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## External Dependencies

### Email Service
- **Digital Marketing Portfolio**: Integrated a complete marketing showcase with brand categories, reels, and project galleries.
- **Portfolio Section**: Added a comprehensive portfolio gallery with project details, technical stack visualizations, and image lightboxes.
- **API Endpoints**: Implemented backend routes for dynamic portfolio data retrieval.

### Database
- **Neon Database**: Serverless PostgreSQL (`@neondatabase/serverless`)
- Requires `DATABASE_URL` environment variable
- Schema migrations via `drizzle-kit push`

### Fonts
- **Google Fonts**: Inter (weights 300-900) for typography

### Development Tools
- **Replit Plugins**: Cartographer and runtime error modal for Replit environment
- **PostCSS**: Tailwind CSS and Autoprefixer processing

### Deployment
- **Vercel**: Configured via `vercel.json` for static deployment
- Build output: `dist/public` for frontend, `dist/index.cjs` for backend