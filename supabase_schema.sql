-- Is code ko Supabase ke SQL Editor mein run karein taake saare required columns ban jayen.

-- Agar table nahi bana to pehle ye run karein:
create table if not exists resumes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Phir ye columns add karne ke liye run karein:
alter table resumes add column if not exists personal_info jsonb;
alter table resumes add column if not exists summary text;
alter table resumes add column if not exists education jsonb;
alter table resumes add column if not exists experience jsonb;
alter table resumes add column if not exists skills text[];
alter table resumes add column if not exists projects jsonb;
alter table resumes add column if not exists languages text[];

-- Storage bucket create karne ke liye (agar nahi hai):
insert into storage.buckets (id, name)
values ('resume-images', 'resume-images')
on conflict do nothing;

-- Storage policy (taake images upload ho sakein):
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'resume-images' );

create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'resume-images' and auth.role() = 'authenticated' );
