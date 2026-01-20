-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_tools ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (true);

-- Tools policies
CREATE POLICY "Approved tools are viewable by everyone" ON public.tools
    FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can view their own submitted tools" ON public.tools
    FOR SELECT USING (auth.uid() = submitted_by);

CREATE POLICY "Authenticated users can insert tools" ON public.tools
    FOR INSERT WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Users can update their own tools" ON public.tools
    FOR UPDATE USING (auth.uid() = submitted_by);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON public.favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
    FOR DELETE USING (auth.uid() = user_id);

-- Ratings policies
CREATE POLICY "Ratings are viewable by everyone" ON public.ratings
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert ratings" ON public.ratings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings" ON public.ratings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings" ON public.ratings
    FOR DELETE USING (auth.uid() = user_id);

-- Tool submissions policies
CREATE POLICY "Users can view their own submissions" ON public.tool_submissions
    FOR SELECT USING (auth.uid() = submitted_by);

CREATE POLICY "Authenticated users can insert submissions" ON public.tool_submissions
    FOR INSERT WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Users can update their own pending submissions" ON public.tool_submissions
    FOR UPDATE USING (auth.uid() = submitted_by AND status = 'pending');

-- Collections policies
CREATE POLICY "Collections are viewable by everyone" ON public.collections
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create collections" ON public.collections
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own collections" ON public.collections
    FOR UPDATE USING (auth.uid() = created_by);

-- Collection tools policies
CREATE POLICY "Collection tools are viewable by everyone" ON public.collection_tools
    FOR SELECT USING (true);

CREATE POLICY "Collection owners can manage collection tools" ON public.collection_tools
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.collections 
            WHERE id = collection_id AND created_by = auth.uid()
        )
    );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update tool ratings
CREATE OR REPLACE FUNCTION public.update_tool_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.tools 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM public.ratings 
            WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
        ),
        rating_count = (
            SELECT COUNT(*) 
            FROM public.ratings 
            WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
        )
    WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for rating updates
DROP TRIGGER IF EXISTS on_rating_change ON public.ratings;
CREATE TRIGGER on_rating_change
    AFTER INSERT OR UPDATE OR DELETE ON public.ratings
    FOR EACH ROW EXECUTE PROCEDURE public.update_tool_rating();