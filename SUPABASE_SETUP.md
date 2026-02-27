# Supabase Integration for AIforStudents.online

## Environment Variables Required

Create a `.env` file in the project root (DO NOT commit this!):

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For Vercel deployment, add these in:
**Vercel Dashboard → Project → Settings → Environment Variables**

## Database Schema

Run these SQL commands in Supabase SQL Editor:

```sql
-- Users profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin')) NOT NULL DEFAULT 'student',
  class TEXT,
  school_id UUID,
  vision_statement TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student interests
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student goals
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reasoning sessions
CREATE TABLE reasoning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  initial_belief TEXT,
  assumptions JSONB DEFAULT '[]',
  evidence JSONB DEFAULT '[]',
  counter_arguments JSONB DEFAULT '[]',
  belief_revised BOOLEAN DEFAULT FALSE,
  new_belief TEXT,
  ai_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reflections
CREATE TABLE reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  prompt TEXT,
  mood TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artifacts (student work)
CREATE TABLE artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES reasoning_sessions(id),
  title TEXT NOT NULL,
  blocks JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Artifact reviews (teacher feedback)
CREATE TABLE artifact_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id UUID REFERENCES artifacts(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES profiles(id),
  scores JSONB NOT NULL,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reasoning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE artifact_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: users can read own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Students can manage their own data
CREATE POLICY "Own interests" ON interests FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own goals" ON goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own sessions" ON reasoning_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own reflections" ON reflections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own artifacts" ON artifacts FOR ALL USING (auth.uid() = user_id);

-- Teachers can view student data (simplified for MVP)
CREATE POLICY "Teachers view sessions" ON reasoning_sessions FOR SELECT 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'teacher'));
CREATE POLICY "Teachers view artifacts" ON artifacts FOR SELECT 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'teacher'));
CREATE POLICY "Teachers manage reviews" ON artifact_reviews FOR ALL 
  USING (teacher_id = auth.uid());

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'New User'), 
          COALESCE(NEW.raw_user_meta_data->>'role', 'student'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Files Created

1. `src/lib/supabase.js` - Supabase client initialization
2. `src/contexts/AuthContext.jsx` - Updated for Supabase auth
3. `.env.example` - Template for environment variables
