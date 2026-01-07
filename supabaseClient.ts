import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize with placeholders if missing to prevent crash, 
// but auth functions will fail gracefully with clear errors.
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Authentication will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local');
}
