import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, User, Profile } from '@/types/auth';
import { Session } from '@supabase/supabase-js';

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) return null;
      return data;
    } catch (err) {
      return null;
    }
  };

  const handleAuthStateChange = async (session: Session | null) => {
    if (session?.user) {
      const profile = await fetchProfile(session.user.id);
      const userWithProfile: User = { ...session.user, profile };
      setState({
        user: userWithProfile,
        session,
        isLoading: false,
        error: null,
      });
    } else {
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    }
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthStateChange(session);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthStateChange(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setState(prev => ({ ...prev, error: error as Error }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};