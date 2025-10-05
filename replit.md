# WhatsApp Bot Pairing Interface

## Overview

This is a WhatsApp bot pairing and session management application that provides a modern web interface for pairing new WhatsApp bot instances and monitoring active sessions. The application features a glassmorphic dashboard design with a gradient background, allowing users to generate pairing codes for new bot connections and view real-time session status.

The system acts as a proxy/frontend to a WhatsApp bot API service, providing an intuitive user experience for bot management operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight React Router alternative)
- **TanStack Query (React Query)** for server state management and API data fetching
- **Tailwind CSS** with custom configuration for styling
- **shadcn/ui** component library with Radix UI primitives

**Design System:**
- Custom glassmorphism aesthetic with backdrop blur effects
- Gradient background (purple to blue diagonal)
- WhatsApp-inspired green color scheme for primary actions
- Responsive design with mobile-first approach
- Inter and Roboto font families for typography

**Key Architectural Decisions:**
- **Component-based architecture**: Reusable UI components in `client/src/components/ui/`
- **Path aliases**: Configured for cleaner imports (`@/`, `@shared/`, `@assets/`)
- **State management approach**: React Query for server state, local React state for UI-only state
- **No RSC (React Server Components)**: Traditional client-side rendering approach
- **Type safety**: Full TypeScript coverage across frontend codebase

### Backend Architecture

**Technology Stack:**
- **Node.js** with Express.js framework
- **TypeScript** for type-safe server code
- **PostgreSQL** database (via Neon serverless)
- **Drizzle ORM** for database operations and schema management

**API Design:**
- RESTful proxy endpoints that forward requests to upstream WhatsApp bot API
- Two main endpoints:
  - `GET /api/pair?code={phoneNumber}` - Generate pairing code for a phone number
  - `GET /api/sessions` - Retrieve all active bot sessions

**Key Architectural Decisions:**
- **Proxy pattern**: Backend acts as an intermediary between frontend and WhatsApp bot API
- **Stateless request handling**: No session persistence on this server, relies on upstream API
- **Environment-based configuration**: WhatsApp API URL configured via environment variables
- **Error handling**: Centralized error middleware with proper HTTP status codes
- **Development setup**: Vite middleware integration for seamless dev experience

**Database Layer:**
- Drizzle ORM with PostgreSQL dialect
- Schema-first approach with Zod validation
- Migration support via `drizzle-kit`
- User table structure prepared (though authentication not fully implemented)

### Data Storage Solutions

**Database:**
- **Neon Serverless PostgreSQL** as the primary database
- Connection via `@neondatabase/serverless` driver
- Schema defined in `shared/schema.ts` using Drizzle ORM

**Current Schema:**
- Users table with id, username, and password fields
- UUID primary keys with PostgreSQL's `gen_random_uuid()`
- Unique constraint on username

**Alternative In-Memory Storage:**
- `MemStorage` class implementation for development/testing
- Map-based storage for users
- Provides same interface as database storage (IStorage)

### Authentication and Authorization

**Current State:**
- Basic user schema defined but authentication not actively implemented
- Password field exists in user table (would need hashing in production)
- Session management prepared via `connect-pg-simple` package
- No active auth middleware protecting routes

**Design Considerations:**
- Infrastructure prepared for session-based authentication
- User creation and lookup methods available in storage layer
- Would benefit from bcrypt/argon2 for password hashing
- JWT or session cookies could be implemented

### External Dependencies

**WhatsApp Bot API Service:**
- Upstream API at configurable URL (default: `http://yamanote.proxy.rlwy.net:17090`)
- Provides pairing code generation functionality
- Returns session data including connection status, JID, and user information
- Backend acts as a proxy to this service

**Third-Party Services:**
- **Neon Database**: Serverless PostgreSQL hosting
- **Railway** (implied by default API URL): Likely hosting the WhatsApp bot service

**UI Component Libraries:**
- **Radix UI**: Accessible component primitives (20+ components)
- **shadcn/ui**: Pre-styled components built on Radix
- **Lucide React**: Icon library for UI elements
- **class-variance-authority**: Variant-based styling system

**Build & Development Tools:**
- **esbuild**: Backend bundling for production
- **tsx**: TypeScript execution for development
- **Replit-specific plugins**: Cartographer, dev banner, runtime error modal

**Utility Libraries:**
- **clsx & tailwind-merge**: Conditional className utilities
- **date-fns**: Date formatting and manipulation
- **nanoid**: Unique ID generation
- **zod**: Schema validation with Drizzle integration