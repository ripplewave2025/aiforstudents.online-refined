# AIforStudents

AIforStudents is now a school-onboarding pipeline for getting schools operational with domain identity, education suites, teacher onboarding, and handoff.

## What Ships in This V1

- Public landing page for the school-offer narrative
- Public application form at `/apply`
- Internal operator login at `/login`
- Internal onboarding dashboard at `/dashboard`
- Supabase-ready schema for school records and operator notes
- Local demo mode when Supabase is not configured

## Product Scope

This repo is focused on the first operational wedge:

1. capture a school lead
2. collect principal and POC details
3. track document readiness
4. move the school through setup stages
5. keep implementation notes and next actions in one place

The older student/teacher/parent platform concepts are preserved under `src/_future/` and are not part of the live app.

## Local Development

```bash
cmd /c npm install
cmd /c npm start
```

## Build

```bash
cmd /c npm run build
```

## Demo Accounts

If `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` are missing, the app runs in local demo mode.

- `demo@operator`
- `demo@admin`

## Supabase

Use [SUPABASE_SETUP.md](C:/Users/FaradaysCage007/Desktop/2_PROJECTS/AIforStudents/SUPABASE_SETUP.md) and run [supabase/onboarding_v1.sql](C:/Users/FaradaysCage007/Desktop/2_PROJECTS/AIforStudents/supabase/onboarding_v1.sql).
