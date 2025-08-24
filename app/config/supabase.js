import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gtyjozzqkslmsutwzats.supabase.co'
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0eWpvenpxa3NsbXN1dHd6YXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzc1NjksImV4cCI6MjA0ODk1MzU2OX0.syxZYygbcQ5cBm2AUXUDaz6OPrTSbNpzO0tNcuHI7Ik";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
