import { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

export interface User extends SupabaseUser {
  profile?: Profile | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: Error | null;
}