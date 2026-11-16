import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Returns null until you add your keys to .env.local, so the site
// still runs (the form will fall back to opening an email).
export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;
