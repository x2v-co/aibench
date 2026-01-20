import { supabase } from '@/integrations/supabase/client';
import { Database, Tables } from '@/types/database';

export const toolsApi = {
  async getAllTools() {
    const { data, error } = await supabase
      .from('tools')
      .select('*, categories(name, slug)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getToolById(id: string) {
    const { data, error } = await supabase
      .from('tools')
      .select('*, categories(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  },

  async searchTools(query: string) {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`);
    if (error) throw error;
    return data;
  }
};

export const authApi = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(profile: Partial<Tables<'profiles'>>) {
    if (!profile.id) throw new Error('User ID is required');
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profile)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

export const favoritesApi = {
  async toggleFavorite(userId: string, toolId: string, isFavorited: boolean) {
    if (isFavorited) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: userId, tool_id: toolId });
      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, tool_id: toolId });
      if (error) throw error;
      return true;
    }
  },

  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select('tool_id, tools(*)')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
};

export const ratingsApi = {
  async addRating(userId: string, toolId: string, score: number, comment?: string) {
    const { data, error } = await supabase
      .from('ratings')
      .upsert({ user_id: userId, tool_id: toolId, score, comment })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getToolRatings(toolId: string) {
    const { data, error } = await supabase
      .from('ratings')
      .select('*, profiles(username, avatar_url)')
      .eq('tool_id', toolId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};