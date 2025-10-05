# WhatsApp Bot Pairing Interface

## Overview
A web-based WhatsApp bot pairing interface with glassmorphism design that connects to an external backend API to manage WhatsApp session pairing and display active connections.

## Features
- **Dashboard**: Displays total active users and all active WhatsApp sessions with connection status
- **Pairing Page**: Allows users to pair new phone numbers and generates pairing codes
- **Error Handling**: Handles blocked numbers and API errors gracefully
- **Glassmorphism UI**: Modern design with transparent blur effects and purple-blue gradient background

## Architecture

### Backend (Express.js)
- **API Routes** (`server/routes.ts`):
  - `GET /api/sessions` - Proxies to external API to fetch all active WhatsApp sessions
  - `GET /api/pair?code=[number]` - Proxies to external API to generate pairing code

### Frontend (React + TypeScript)
- **Pages**:
  - `/` - Dashboard showing stats and active sessions
  - `/pair` - Pairing page for generating codes

### External API Integration
- Base URL: `http://yamanote.proxy.rlwy.net:17090` (configured via `WHATSAPP_API_URL` environment variable)
- Endpoints:
  - `/pair?code=[number]` - Returns pairing code or error
  - `/sessions` - Returns active sessions data

## Environment Variables
- `WHATSAPP_API_URL` - Backend API URL (default: http://yamanote.proxy.rlwy.net:17090)

## Design System
- **Colors**: WhatsApp green (#25D366) primary, purple-blue gradient background
- **Fonts**: Inter for UI, Roboto Mono for codes
- **Effects**: Glassmorphism with backdrop blur, transparent overlays

## Project Structure
```
client/src/
  ├── components/          # Reusable components
  │   ├── TopBar.tsx       # Header with branding
  │   ├── StatsCard.tsx    # Statistics display card
  │   ├── SessionCard.tsx  # Active session card
  │   └── PairingCodeDisplay.tsx  # Pairing code with copy button
  ├── pages/
  │   ├── Dashboard.tsx    # Main dashboard
  │   └── PairPage.tsx     # Pairing interface
  └── App.tsx              # Main app with routing

server/
  └── routes.ts            # API proxy routes
```

## User Preferences
- Clean, modern glassmorphism design
- WhatsApp green as primary color
- ALI-MD mini ❤️‍🩹 branding
- Responsive mobile-first design
