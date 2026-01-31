-- Add template column to resumes table
alter table resumes add column if not exists template text default 'modern';
