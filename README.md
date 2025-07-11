
# TeacherHub

TeacherHub is a modern, responsive teacher management platform for schools, academies, and private educators. It provides a unified dashboard for managing teachers, students, schedules, payments, documents, analytics, and more—all with a beautiful, user-friendly interface.

## Features

- **Dashboard**: Overview of teachers, students, lessons, revenue, and key analytics with interactive charts and stats.
- **Teachers Profile**: View and edit teacher details, schedule, students, analytics, and performance.
- **Students**: List of all students with details, status, and subject assignments.
- **Schedule**: Weekly timetable for all teachers, with lesson/slot management and modal-based editing.
- **Subjects**: Manage subjects and qualifications, with add/edit/delete and teacher assignment.
- **Payments**: Track earnings, invoices, payment history, and generate/send invoices.
- **Messages**: Inbox and chat view for all conversation threads, with unread notifications and responsive chat UI.
- **Reports**: Insights and summaries about lessons, hours, earnings, engagement, attendance, and performance over time, with export options.
- **Documents**: Digital file folder for storing and managing teacher-related files (certifications, ID proofs, contracts, tax docs, etc.).
- **Settings**: Manage personal and account settings, security (password, 2FA, linked accounts), notification preferences, app preferences, and privacy/danger zone.

## Tech Stack

- **Frontend**: React + TypeScript
- **UI**: Tailwind CSS, custom UI components, Lucide icons
- **Routing**: React Router
- **Charts**: Recharts
- **State**: React hooks, in-memory mock data
- **Build Tool**: Vite

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Mock Data
- All features use in-memory mock data for teachers, students, schedules, payments, messages, and documents.
- No backend/API is required for demo/testing.
- You can customize mock data in `src/data/mockData.ts` and related files.

## UI/UX Highlights
- **Consistent layout:** Sidebar, header, and main content area on all pages.
- **Responsive design:** Works on desktop and mobile.
- **Modern UI:** Cards, badges, avatars, modals, and beautiful charts.
- **Accessibility:** Keyboard navigation, ARIA labels, and focus management.
- **Always-filled analytics:** All charts and stats show sample/mock data, never empty.
- **Quick navigation:** Sidebar and header links, with active tab highlighting.
- **Dialogs and confirmations:** For uploads, deletions, and danger zone actions.

## Customization
- To add real data, connect to your backend/API and replace the mock data imports.
- To add more features, follow the existing component and page structure.
- To change the theme, edit `tailwind.config.ts` and UI component classes.

## Folder Structure
```
src/
  components/      # UI and layout components
  data/            # Mock data files
  hooks/           # Custom React hooks
  pages/           # Main app pages (Dashboard, Students, etc.)
  types/           # TypeScript types
  lib/             # Utilities
```

## License
This project is for educational/demo purposes. You may use, modify, or extend it as needed.

---

**TeacherHub** — The all-in-one platform for teacher and student management.
