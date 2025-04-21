import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mjhvodgbuwkutomfnwui.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qaHZvZGdidXdrdXRvbWZud3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDQ1NTAsImV4cCI6MjA2MDgyMDU1MH0.qt2RFi4mM8KEpHJvgerGe3vVqmHU0FdzjfNt8mkHKAY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
