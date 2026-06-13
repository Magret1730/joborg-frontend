# joborg Frontend

joborg is a career page tracking app that helps users monitor company job/career pages and get notified when changes are detected.

This repository contains the frontend application for joborg.

---

## Project Overview

The joborg frontend is built with Next.js and provides the user interface for:

- Landing page
- User registration
- User login
- Dashboard
- Tracker management
- Alerts history
- Settings page

In MVP 1, users can add company career page URLs, view their saved trackers, manually check for page changes, and see alert history.

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- React
- React Icons
- Fetch API or Axios

---

## MVP 1 Features

### Authentication

Users can:

- Register
- Log in
- Log out
- Access protected dashboard pages

---

### Dashboard

The dashboard will show:

- Total trackers
- Active trackers
- Changes detected today
- Alerts sent
- Recent changes
- Recent alerts

---

### Trackers

Users can:

- Add a career page tracker
- View saved trackers
- Edit tracker details
- Delete trackers
- Pause trackers
- Resume trackers
- Run a manual “Check Now”

---

### Alerts

Users can view email notification history, including:

- Date and time sent
- Company name
- Alert type
- Alert method
- Delivery status

---

### Settings

Users can view basic account and app settings, including:

- Name
- Email
- Default alert email
- Polling interval
- Dark mode preference

---

## Folder Structure

```txt
src/
  app/
    page.tsx
    login/
      page.tsx
    register/
      page.tsx
    dashboard/
      page.tsx
    trackers/
      page.tsx
    alerts/
      page.tsx
    settings/
      page.tsx

  components/
    layout/
    ui/
    trackers/
    dashboard/
    alerts/

  hooks/

  lib/

  types/

## Pages

| Page | Route | Description |
|---|---|---|
| Landing Page | `/` | Public homepage for joborg |
| Login | `/login` | User login page |
| Register | `/register` | User registration page |
| Dashboard | `/dashboard` | Main user dashboard |
| Trackers | `/trackers` | Manage career page trackers |
| Alerts | `/alerts` | View email alert history |
| Settings | `/settings` | View and update user settings |

---

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/joborg-frontend.git
cd joborg-frontend
```

### 2. Install dependencies
```
npm install
```

### 3. Create environment file
Create a .env.local file in the root of the project.
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the development server
```
npm run dev
```
The app should be available at:
```
http://localhost:3000
```
