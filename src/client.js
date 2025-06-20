import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(URL, KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});