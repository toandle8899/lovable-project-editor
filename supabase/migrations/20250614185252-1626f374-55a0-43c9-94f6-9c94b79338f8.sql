
-- 1. Enable Row Level Security on all relevant tables for authentication
-- 2. Create a "profiles" table to store user info (for future user details)

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  username text
);

-- 3. Create topics table (owned by user)
CREATE TABLE public.topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Create crumbs table (each is a content item in a topic)
CREATE TABLE public.crumbs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES public.topics(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  summary text,
  url text,
  type text,
  tags text[],
  completed boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. RLS policies: users can only see their own data
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crumbs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles: Only owner can view/update" ON public.profiles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Topics: Only owner" ON public.topics
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Crumbs: Only owner" ON public.crumbs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
