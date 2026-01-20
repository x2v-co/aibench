-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS public.tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    website_url TEXT NOT NULL,
    icon_url TEXT,
    category_id UUID REFERENCES public.categories(id),
    pricing_type TEXT CHECK (pricing_type IN ('免费', '付费', '免费增值', '按量计费')),
    tags TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    submitted_by UUID REFERENCES public.profiles(id),
    visit_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tool_id)
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS public.ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tool_id)
);

-- Create tool_submissions table for pending submissions
CREATE TABLE IF NOT EXISTS public.tool_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    website_url TEXT NOT NULL,
    icon_url TEXT,
    category_id UUID REFERENCES public.categories(id),
    pricing_type TEXT CHECK (pricing_type IN ('免费', '付费', '免费增值', '按量计费')),
    tags TEXT[] DEFAULT '{}',
    submitted_by UUID REFERENCES public.profiles(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collections table
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    icon_name TEXT,
    gradient_class TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collection_tools junction table
CREATE TABLE IF NOT EXISTS public.collection_tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(collection_id, tool_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON public.tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON public.tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_tools_is_approved ON public.tools(is_approved);
CREATE INDEX IF NOT EXISTS idx_tools_created_at ON public.tools(created_at);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_tool_id ON public.favorites(tool_id);
CREATE INDEX IF NOT EXISTS idx_ratings_tool_id ON public.ratings(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_submissions_status ON public.tool_submissions(status);

-- Insert initial categories
INSERT INTO public.categories (name, slug, description, icon_name) VALUES
('文本写作', 'text-writing', 'AI 写作助手、翻译及内容生成工具', 'PenTool'),
('图像生成', 'image-generation', 'AI 绘画、图像编辑及视觉创作工具', 'Image'),
('编程开发', 'coding', 'AI 代码补全、Bug 修复及开发效率工具', 'Code'),
('视频创作', 'video-creation', 'AI 视频生成、剪辑及数字人工具', 'Video'),
('音频音效', 'audio-speech', 'AI 配音、音乐创作及音频处理工具', 'Mic'),
('办公效率', 'productivity', 'AI 笔记、PPT 生成及日程管理工具', 'Zap')
ON CONFLICT (slug) DO NOTHING;