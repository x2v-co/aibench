-- Insert initial tools data
INSERT INTO public.tools (
    name, description, long_description, website_url, icon_url, category_id, 
    pricing_type, tags, is_featured, is_approved, visit_count, rating, rating_count
) VALUES 
(
    'ChatGPT',
    '由 OpenAI 开发的先进对话式 AI 语言模型。',
    'ChatGPT 是一个基于 GPT-4 架构的大型语言模型，能够进行自然对话、回答问题、协助写作、编程辅助等多种任务。它具有强大的理解能力和生成能力，是目前最受欢迎的 AI 助手之一。',
    'https://chatgpt.com',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'text-writing'),
    '免费增值',
    ARRAY['对话', '写作', '知识库'],
    true,
    true,
    999999,
    4.9,
    15420
),
(
    'Midjourney',
    '领先的 AI 艺术生成工具，将文字描述转化为精美图像。',
    'Midjourney 是一款革命性的 AI 图像生成工具，通过简单的文字描述就能创造出令人惊叹的艺术作品。它特别擅长生成具有艺术感和创意性的图像，被广泛应用于设计、插画、概念艺术等领域。',
    'https://www.midjourney.com',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'image-generation'),
    '付费',
    ARRAY['艺术', '设计', '高画质'],
    true,
    true,
    500000,
    4.8,
    8930
),
(
    'Claude',
    'Anthropic 开发的高智能、安全且诚实的 AI 助手。',
    'Claude 是由 Anthropic 开发的 AI 助手，以其安全性、诚实性和有用性而闻名。它在长文本处理、分析推理、创意写作等方面表现出色，特别适合需要深度思考和分析的任务。',
    'https://claude.ai',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'text-writing'),
    '免费增值',
    ARRAY['长文本', '分析', '研究'],
    true,
    true,
    300000,
    4.7,
    6540
),
(
    'GitHub Copilot',
    '你的 AI 结对编程伙伴，通过建议代码实时辅助开发。',
    'GitHub Copilot 是由 GitHub 和 OpenAI 合作开发的 AI 编程助手，它能够根据上下文自动补全代码、生成函数、解释代码逻辑等。支持多种编程语言，与主流 IDE 深度集成，大大提升开发效率。',
    'https://github.com/features/copilot',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'coding'),
    '付费',
    ARRAY['自动补全', 'IDE集成', '全语言'],
    false,
    true,
    450000,
    4.8,
    12300
),
(
    'Sora',
    'OpenAI 发布的视频生成模型，可创建长达一分钟的逼真视频。',
    'Sora 是 OpenAI 最新发布的文本到视频生成模型，能够根据文字描述创建高质量、长达一分钟的视频内容。它在视频生成领域代表了最前沿的技术水平，为内容创作者提供了全新的创作可能。',
    'https://openai.com/sora',
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'video-creation'),
    '付费',
    ARRAY['文本转视频', '超写实', '前沿'],
    true,
    true,
    150000,
    5.0,
    3200
),
(
    'Notion AI',
    '在 Notion 笔记中集成的 AI 写作、总结和编辑工具。',
    'Notion AI 是集成在 Notion 工作空间中的智能助手，能够帮助用户进行写作、总结、翻译、头脑风暴等任务。它与 Notion 的笔记和数据库功能完美结合，为知识管理和团队协作提供了强大的 AI 支持。',
    'https://www.notion.so/product/ai',
    'https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'productivity'),
    '免费增值',
    ARRAY['笔记', '整理', '协作'],
    false,
    true,
    200000,
    4.6,
    5670
),
(
    'Stable Diffusion',
    '开源的高质量图像生成模型，支持本地部署。',
    'Stable Diffusion 是一个开源的文本到图像生成模型，以其高质量的输出和可定制性而闻名。用户可以在本地部署，也可以通过各种在线平台使用，支持多种风格和用途的图像生成。',
    'https://stability.ai/stable-diffusion',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'image-generation'),
    '免费',
    ARRAY['开源', '本地部署', '可定制'],
    true,
    true,
    380000,
    4.5,
    9840
),
(
    'ElevenLabs',
    '先进的 AI 语音合成和克隆技术，生成自然流畅的语音。',
    'ElevenLabs 提供业界领先的 AI 语音合成技术，能够生成极其自然和富有表现力的语音。支持多种语言和声音风格，广泛应用于有声书制作、播客、视频配音等领域。',
    'https://elevenlabs.io',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=128&h=128&fit=crop',
    (SELECT id FROM public.categories WHERE slug = 'audio-speech'),
    '免费增值',
    ARRAY['语音合成', '多语言', '高质量'],
    true,
    true,
    120000,
    4.7,
    4320
);

-- Insert some collections
INSERT INTO public.collections (name, description, slug, icon_name, gradient_class, is_featured) VALUES
('编辑精选', '由我们团队亲手挑选的最具创新力的 AI 工具', 'featured', 'Sparkles', 'from-orange-500/10 to-transparent', true),
('高效写作神器', '释放你的创造力，用 AI 重塑文字创作流程', 'writing-tools', 'PenTool', 'from-blue-500/10 to-transparent', true),
('视觉创作工坊', '从静态图到动态视频，AI 助力每一个创意瞬间', 'visual-creation', 'Layout', 'from-pink-500/10 to-transparent', true),
('开发者必备', '提升编程效率的 AI 开发工具集合', 'developer-tools', 'Code', 'from-green-500/10 to-transparent', true);

-- Link tools to collections
INSERT INTO public.collection_tools (collection_id, tool_id, order_index) VALUES
-- Featured collection
((SELECT id FROM public.collections WHERE slug = 'featured'), (SELECT id FROM public.tools WHERE name = 'ChatGPT'), 1),
((SELECT id FROM public.collections WHERE slug = 'featured'), (SELECT id FROM public.tools WHERE name = 'Midjourney'), 2),
((SELECT id FROM public.collections WHERE slug = 'featured'), (SELECT id FROM public.tools WHERE name = 'Sora'), 3),
((SELECT id FROM public.collections WHERE slug = 'featured'), (SELECT id FROM public.tools WHERE name = 'Stable Diffusion'), 4),

-- Writing tools collection
((SELECT id FROM public.collections WHERE slug = 'writing-tools'), (SELECT id FROM public.tools WHERE name = 'ChatGPT'), 1),
((SELECT id FROM public.collections WHERE slug = 'writing-tools'), (SELECT id FROM public.tools WHERE name = 'Claude'), 2),
((SELECT id FROM public.collections WHERE slug = 'writing-tools'), (SELECT id FROM public.tools WHERE name = 'Notion AI'), 3),

-- Visual creation collection
((SELECT id FROM public.collections WHERE slug = 'visual-creation'), (SELECT id FROM public.tools WHERE name = 'Midjourney'), 1),
((SELECT id FROM public.collections WHERE slug = 'visual-creation'), (SELECT id FROM public.tools WHERE name = 'Stable Diffusion'), 2),
((SELECT id FROM public.collections WHERE slug = 'visual-creation'), (SELECT id FROM public.tools WHERE name = 'Sora'), 3),

-- Developer tools collection
((SELECT id FROM public.collections WHERE slug = 'developer-tools'), (SELECT id FROM public.tools WHERE name = 'GitHub Copilot'), 1);