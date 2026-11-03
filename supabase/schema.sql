-- =========================================================
-- AD ZOOM STUDIO - SUPABASE POSTGRES SCHEMA & RLS POLICIES
-- =========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PHOTOS TABLE
create table if not exists public.photos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null,
  category_id uuid references public.categories(id) on delete set null,
  image_url text not null,
  alt_text text default '',
  caption text,
  aspect_ratio text default 'landscape',
  is_featured boolean default false,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. FILMS & CINEMA TABLE
create table if not exists public.films (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  couple_name text not null,
  location text not null,
  event_date text not null,
  category text default 'Wedding Films',
  video_type text default 'youtube',
  video_url text not null,
  thumbnail_url text not null,
  duration text,
  description text,
  is_featured boolean default false,
  display_order int default 0,
  still_frames jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. EQUIPMENT TABLE
create table if not exists public.equipment (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null,
  model text not null,
  specs text not null,
  image_url text not null,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. SERVICES TABLE
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text not null,
  description text not null,
  image_url text not null,
  features jsonb default '[]'::jsonb,
  show_price boolean default true,
  price text,
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. TESTIMONIALS TABLE
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  quote text not null,
  client_name text not null,
  event_type text not null,
  year text not null,
  location text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. YOUTUBE VIDEOS TABLE
create table if not exists public.youtube_videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  youtube_id text not null,
  url text not null,
  thumbnail_url text not null,
  category text default 'Wedding Films',
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. INSTAGRAM POSTS TABLE
create table if not exists public.instagram_posts (
  id uuid primary key default uuid_generate_v4(),
  caption text,
  post_url text not null,
  thumbnail_url text not null,
  media_type text default 'reel',
  display_order int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. CUSTOM PAGES TABLE
create table if not exists public.custom_pages (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  cover_image text,
  excerpt text,
  content text not null,
  show_in_nav boolean default false,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. ENQUIRIES TABLE
create table if not exists public.enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text not null,
  event_type text not null,
  event_date text not null,
  location text not null,
  message text not null,
  status text default 'unread',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. SITE SETTINGS TABLE (Single Row)
create table if not exists public.site_settings (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- Public can READ published content; Only Authenticated Admin can WRITE
-- =========================================================

alter table public.categories enable row level security;
alter table public.photos enable row level security;
alter table public.films enable row level security;
alter table public.equipment enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.youtube_videos enable row level security;
alter table public.instagram_posts enable row level security;
alter table public.custom_pages enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;

-- Public read policies
create policy "Public can view categories" on public.categories for select using (true);
create policy "Public can view photos" on public.photos for select using (true);
create policy "Public can view films" on public.films for select using (true);
create policy "Public can view equipment" on public.equipment for select using (true);
create policy "Public can view services" on public.services for select using (true);
create policy "Public can view testimonials" on public.testimonials for select using (true);
create policy "Public can view youtube_videos" on public.youtube_videos for select using (true);
create policy "Public can view instagram_posts" on public.instagram_posts for select using (true);
create policy "Public can view custom_pages" on public.custom_pages for select using (is_published = true);
create policy "Public can view site_settings" on public.site_settings for select using (true);

-- Anyone can submit an enquiry form
create policy "Public can insert enquiry" on public.enquiries for insert with check (true);

-- Authenticated Admin Full Access Policies
create policy "Admin can do everything on categories" on public.categories for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on photos" on public.photos for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on films" on public.films for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on equipment" on public.equipment for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on services" on public.services for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on youtube_videos" on public.youtube_videos for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on instagram_posts" on public.instagram_posts for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on custom_pages" on public.custom_pages for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on enquiries" on public.enquiries for all using (auth.role() = 'authenticated');
create policy "Admin can do everything on site_settings" on public.site_settings for all using (auth.role() = 'authenticated');

-- =========================================================
-- STORAGE BUCKETS (Execute in Supabase Storage Dashboard)
-- 1. Create public bucket 'photos'
-- 2. Create public bucket 'videos'
-- 3. Create public bucket 'equipment'
-- 4. Create public bucket 'site'
-- =========================================================

