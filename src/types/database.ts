export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          icon?: string | null;
          created_at?: string;
        };
      };
      tools: {
        Row: {
          id: string;
          name: string;
          description: string;
          url: string;
          logo_url: string | null;
          category_id: string | null;
          tags: string[];
          pricing: 'free' | 'paid' | 'freemium';
          average_rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          url: string;
          logo_url?: string | null;
          category_id?: string | null;
          tags?: string[];
          pricing?: 'free' | 'paid' | 'freemium';
          average_rating?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          url?: string;
          logo_url?: string | null;
          category_id?: string | null;
          tags?: string[];
          pricing?: 'free' | 'paid' | 'freemium';
          average_rating?: number;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          avatar_url?: string | null;
          updated_at?: string | null;
        };
      };
      favorites: {
        Row: {
          user_id: string;
          tool_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          tool_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          tool_id?: string;
          created_at?: string;
        };
      };
      ratings: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string;
          score: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_id: string;
          score: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_id?: string;
          score?: number;
          comment?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];