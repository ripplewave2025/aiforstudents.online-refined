# AIforStudents V1 Summary

## Current Product

This codebase currently ships a working onboarding v1 for schools.

### Live routes

- `/` public landing page
- `/apply` public school intake form
- `/login` internal operator login
- `/dashboard` internal onboarding pipeline

## Core Workflow

1. A school submits the intake form
2. The record lands in the onboarding pipeline
3. Operators update stage, next action, checklist readiness, and notes
4. The school moves through:
   - lead
   - principal authorization
   - documents pending
   - domain setup
   - workspace setup
   - teacher training
   - handoff
   - completed

## Backend

- Supabase auth for operator/admin sign-in
- Supabase tables for profiles, school applications, and notes
- Public insert policy for school intake
- Internal select/update policies for operator workflow

## Demo mode

If Supabase env vars are not present, the app uses localStorage and seeded demo records.

## Preserved future work

The older multi-role education product remains under `src/_future/` for later reactivation, but it is not part of the live v1.
