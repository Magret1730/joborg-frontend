# Joborg Frontend

Joborg is a web application that helps users monitor company career pages and stay aware of possible updates without manually checking the same pages repeatedly.

This frontend is part of an MVP that is currently under active development.

## Status

Work in progress.

The frontend is being built with a focus on clean UI architecture, reusable layouts, light/dark mode support, authentication screens, and dashboard pages that will connect to the backend API.

## Overview

The MVP focuses on allowing users to save career page links, manage their trackers, and view monitoring activity from a simple dashboard.

The frontend is designed to support future improvements while keeping the current version focused and maintainable.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- CSS variables for light/dark themes
- Zustand for selected client-side state
- React Icons

## Main Areas

- Public landing pages
- Authentication pages
- User dashboard
- Tracker management
- Change activity views
- Alert history
- Settings
- Future admin area

## Frontend and Backend Connection

The frontend connects to the backend through an API base URL.

Create a `.env.local` file in the frontend project root:

`NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1`

The frontend uses this value when making requests to the backend during local development.

## Getting Started

- Install dependencies:

`npm install`

- Start the development server:

`npm run dev`

- The frontend should run on:

`http://localhost:3000`

## Available Scripts

`npm run dev  `
Runs the app in development mode.

`npm run build  `
Builds the app for production.

`npm run start ` 
Runs the production build.

`npm run lint  `
Runs linting checks.

## Design Direction

The UI is designed as a clean SaaS-style dashboard.

Brand direction:

- **App name**: Joborg
- **Theme**: Light and dark mode support
- **Style**: Simple, modern, professional, and dashboard-focused
- **Goal**: Easy to understand, easy to navigate, and scalable for future features

## Links

- Frontend Repository: [Frontend GitHub Link](https://github.com/Magret1730/joborg-frontend)
- Backend Repository: [Backend GitHub Link](https://github.com/Magret1730/joborg-backend)
<!-- - Live Frontend: [Add deployed frontend link here] -->

## Notes

This project is still in progress.

The frontend is being structured to support real authentication, protected pages, API integration, reusable components, and future product expansion.

Some features may currently use placeholder content or mock UI while backend integration is being completed.