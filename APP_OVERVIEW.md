# Ashabi Clinic Landing Page

## What the App Is

This is a Next.js landing and booking app for Ashabi Clinic. It provides a public home page, an appointment booking flow, an appointment cancellation page, and an admin portal for managing appointments.

## Tech Stack

- Next.js 13 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase JS client
- EmailJS browser SDK
- lucide-react icons
- PostCSS / autoprefixer
- ESLint

## Routes

Routes are defined automatically by the `app/` folder structure.

- `/` → `app/page.tsx`
- `/admin` → `app/admin/page.tsx`
- `/admin/dashboard` → `app/admin/dashboard/page.tsx`
- `/admin/login` → `app/admin/login/page.tsx`
- `/book` → `app/book/page.tsx`
- `/cancel` → `app/cancel/page.tsx`

## File Summary

### Root files
- `package.json` — app dependencies and npm scripts.
- `next.config.js` — Next.js config file (currently empty).
- `tailwind.config.ts` — Tailwind CSS paths, fonts, and custom color definitions.
- `postcss.config.js` — PostCSS setup for Tailwind.
- `tsconfig.json` — TypeScript compiler configuration.
- `next-env.d.ts` — Next.js generated type definitions.
- `test.txt` — placeholder/test file.
- `public/service-worker.js` — static service worker file.

### App files
- `app/globals.css` — global CSS imported by the root layout.
- `app/layout.tsx` — shared root layout, metadata, font setup, and body wrapper.
- `app/page.tsx` — landing page route; renders the home UI.

### Admin routes
- `app/admin/page.tsx` — redirects to admin dashboard or login based on Supabase session.
- `app/admin/dashboard/page.tsx` — authenticated dashboard for listing and managing appointments.
- `app/admin/login/page.tsx` — admin login page with Supabase email/password auth.

### Public pages
- `app/book/page.tsx` — booking page containing header, doctor info, booking form, and footer.
- `app/cancel/page.tsx` — cancellation page that validates token links and shows cancellation status.

### Components
- `app/components/BookingForm.tsx` — multi-step appointment booking form that saves bookings and sends email confirmations.
- `app/components/Header.tsx` — reusable header with phone CTA or back button.
- `app/components/Footer.tsx` — footer with branding, admin link, and developer credit.
- `app/components/DoctorInfoStrip.tsx` — small doctor info banner used on booking and cancel pages.
- `app/components/claude-result.tsx` — landing page UI shown by `app/page.tsx`.
- `app/components/gemini-result.tsx` — alternate landing/marketing component, currently not used by the main page.

### Library
- `lib/supabase/supabase.ts` — Supabase client initialization using environment variables.

## How Routing Works

This app uses the Next.js App Router, so each `app/[folder]/page.tsx` file becomes a route automatically. Nested folders create nested routes.

## How Data and Auth Work

- Supabase authenticates admin users and stores appointment records.
- Appointment booking uses Supabase inserts plus EmailJS to send booking emails.
- The cancel page looks up appointments by a cancellation token.

## Supabase Schema

### `appointments` table

Stores all patient appointment bookings.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary key (auto-generated) |
| `name` | `text` | Patient's full name |
| `phone` | `text` | Patient's 10-digit phone number |
| `age` | `text` | Patient's age |
| `date` | `date` | Appointment date (YYYY-MM-DD) |
| `day_preference` | `text` | Day preference (Mon–Sun or "Any") |
| `slot` | `text` | Time slot ("Morning (9:00 AM – 12:00 PM)" or "Evening (5:00 PM – 8:00 PM)") |
| `reason` | `text` | Reason for appointment or "Not specified" |
| `status` | `text` | One of: `pending`, `confirmed`, `cancelled` |
| `cancel_token` | `uuid` | Unique token for safe appointment cancellation link |
| `created_at` | `timestamp` | When the appointment was created (auto-set) |

### `auth.users` table

Managed by Supabase Auth. Stores admin login credentials.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | User ID (primary key) |
| `email` | `text` | Admin email address |
| `encrypted_password` | `text` | Hashed password |
| `created_at` | `timestamp` | Account creation time |

**Row Level Security (RLS)**: Admin dashboard queries require active Supabase session to fetch appointments.
