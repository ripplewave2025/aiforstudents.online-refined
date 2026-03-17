# Supabase Setup for Onboarding V1

This project now ships a school-onboarding pipeline, not the old multi-role student platform.

## Environment Variables

Create a `.env` file locally and set the same values in Vercel:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
```

## SQL to Run

Run the SQL in [supabase/onboarding_v1.sql](C:/Users/FaradaysCage007/Desktop/2_PROJECTS/AIforStudents/supabase/onboarding_v1.sql) inside the Supabase SQL editor.

That schema creates:

- `profiles`
- `school_applications`
- `application_notes`
- row-level security policies for public intake and internal operator access

## Create Your First Operator

1. In Supabase Auth, create a user with email/password.
2. Let the user sign in once, or create them with metadata containing `role`.
3. Promote the generated profile if needed:

```sql
update public.profiles
set full_name = 'Program Admin',
    role = 'admin'
where id = 'USER_UUID_HERE';
```

Use `role = 'operator'` for non-admin staff.

## How Access Works

- `/apply` is public and inserts a new lead into `school_applications`.
- `/login` is for internal operator/admin sign-in only.
- `/dashboard` requires a logged-in user whose profile role is `admin` or `operator`.

## Local Demo Mode

If env vars are missing, the app falls back to localStorage with demo accounts:

- `demo@operator`
- `demo@admin`

This lets you test the UI before the Supabase project is connected.
