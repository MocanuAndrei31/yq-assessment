# YQ App

Analytics dashboard for the YQ assessment. Built with React, TypeScript, and Tailwind CSS v4.

## Features

**User Authentication** - Secure login with email and password
**Interactive Charts** - Active users trends, wait time analysis, and workforce utilization
**Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
**Real-time Notifications** - Periodic updates every 30 seconds
**Data Tables** - Sortable, paginated tables with workforce details

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **Charts**: Recharts
- **Tables**: TanStack Table (React Table v8)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yq-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

Simply use any email address with a password that's at least 6 characters long to log in.

Example:
- Email: `user@example.com`
- Password: `password123`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Dashboard layout components
│   ├── NotificationSystem.tsx
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts (Authentication)
├── data/              # Mock data files
├── pages/             # Page components
│   ├── Analytics.tsx
│   ├── Dashboard.tsx
│   ├── DataTable.tsx
│   └── Login.tsx
├── services/          # API services and data fetching
├── types/             # TypeScript type definitions
├── App.tsx            # Main app component with routing
├── main.tsx           # App entry point
└── index.css          # Global styles with Tailwind imports
```

## How it works

- Login with any email and password (min 6 chars)
- Dashboard shows metrics from the sample data
- Analytics page has charts for active users, wait times, and utilization
- Data table shows all the store sections with sorting
- Notifications pop up every 30 seconds
- Settings let you change theme color and toggle notifications

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Notes

- Using the provided sample data file only
- Auth is handled locally (no backend)
- Notifications are randomly generated
- Time buckets are shown as daily data
- Made it responsive for mobile/tablet

## What could be added

- Real backend integration
- Date filters for the charts
- Export to CSV/PDF
- Dark mode
- WebSocket for real-time data
- Tests
- Better performance for large data
- More accessibility features

## Build

```bash
npm run build
```

Builds to `dist/` folder.