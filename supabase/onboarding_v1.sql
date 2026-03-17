create extension if not exists pgcrypto;

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'New Operator',
  role text not null default 'operator' check (role in ('admin', 'operator')),
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_internal_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'operator')
      and is_active = true
  );
$$;

create table if not exists public.school_applications (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  district text not null default 'Darjeeling',
  board_affiliation text,
  school_type text,
  student_count integer,
  teacher_count integer,
  principal_name text not null,
  principal_email text not null,
  principal_phone text,
  poc_name text not null,
  poc_role text,
  poc_email text not null,
  poc_phone text,
  website_url text,
  domain_name text,
  suite_preference text not null default 'either' check (suite_preference in ('google', 'microsoft', 'either', 'not_sure')),
  internet_status text not null default 'not_sure' check (internet_status in ('mobile', 'broadband', 'mixed', 'none', 'not_sure')),
  device_count integer,
  principal_authorization_ready boolean not null default false,
  registration_certificate_ready boolean not null default false,
  dns_access_ready boolean not null default false,
  current_tools text,
  implementation_notes text,
  next_action text,
  next_action_due date,
  pipeline_stage text not null default 'lead' check (
    pipeline_stage in (
      'lead',
      'principal_authorization',
      'documents_pending',
      'domain_setup',
      'workspace_setup',
      'teacher_training',
      'handoff',
      'completed',
      'blocked'
    )
  ),
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  assigned_to uuid references public.profiles(id) on delete set null,
  assigned_to_name text,
  source text not null default 'website_form',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.application_notes (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.school_applications(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_school_applications_stage on public.school_applications(pipeline_stage);
create index if not exists idx_school_applications_updated_at on public.school_applications(updated_at desc);
create index if not exists idx_application_notes_application_id on public.application_notes(application_id);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();

drop trigger if exists school_applications_updated_at on public.school_applications;
create trigger school_applications_updated_at
before update on public.school_applications
for each row
execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'New Operator'),
    case
      when coalesce(new.raw_user_meta_data->>'role', 'operator') in ('admin', 'operator')
        then coalesce(new.raw_user_meta_data->>'role', 'operator')
      else 'operator'
    end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.school_applications enable row level security;
alter table public.application_notes enable row level security;

drop policy if exists "Internal users can view profiles" on public.profiles;
create policy "Internal users can view profiles"
on public.profiles
for select
using (public.is_internal_user());

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Public can submit school applications" on public.school_applications;
create policy "Public can submit school applications"
on public.school_applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "Internal users can view school applications" on public.school_applications;
create policy "Internal users can view school applications"
on public.school_applications
for select
using (public.is_internal_user());

drop policy if exists "Internal users can update school applications" on public.school_applications;
create policy "Internal users can update school applications"
on public.school_applications
for update
using (public.is_internal_user())
with check (public.is_internal_user());

drop policy if exists "Internal users can add notes" on public.application_notes;
create policy "Internal users can add notes"
on public.application_notes
for insert
to authenticated
with check (public.is_internal_user());

drop policy if exists "Internal users can view notes" on public.application_notes;
create policy "Internal users can view notes"
on public.application_notes
for select
using (public.is_internal_user());
