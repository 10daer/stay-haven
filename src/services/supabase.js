import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://frcchznrdmuujfagzvmt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyY2Noem5yZG11dWpmYWd6dm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NTgyNzAsImV4cCI6MjAyOTQzNDI3MH0.mehcwaMCjuW47L66641D9X-yMQJ5bGRTcz-PGDtPwCk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
