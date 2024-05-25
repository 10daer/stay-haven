import { createClient } from "@supabase/supabase-js";

console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(process.env.VITE_SUPABASE_URL);
let supabaseUrl, supabaseKey;

if (import.meta.env.MODE === "development") {
  // Use dev keys
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
} else {
  // Use .env variables
  supabaseUrl = process.env.SUPABASE_URL;
  supabaseKey = process.env.SUPABASE_KEY;
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export { supabaseUrl };
