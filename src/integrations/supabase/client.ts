import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jwnclgptrhqvsaygdzrq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bmNsZ3B0cmhxdnNheWdkenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Nzg3NDMsImV4cCI6MjA4NDM1NDc0M30.awR3wdhSwotJMNJINWhNLQ4LPgZ-KUVMFLsH5bKsU10'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// For React:
// import { supabase } from "@/integrations/supabase/client";
// For React Native:
// import { supabase } from "@/src/integrations/supabase/client";
