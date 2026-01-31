// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuvztjkfskxhdegrvtfk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dnp0amtmc2t4aGRlZ3J2dGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTI3MjAsImV4cCI6MjA4NTM2ODcyMH0.HBQyyu9F-PqXnWCPZGL7xvq1gdzEKohAn5EJ59ArI5o'

export const supabase = createClient(supabaseUrl, supabaseKey)