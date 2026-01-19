import { AITool, ToolCategory } from '@/types/tools';

export const toolCategories: ToolCategory[] = [
  {
    id: '1',
    name: '文本写作',
    slug: 'text-writing',
    iconName: 'PenTool',
    description: 'AI 写作助手、翻译及内容生成工具'
  },
  {
    id: '2',
    name: '图像生成',
    slug: 'image-generation',
    iconName: 'Image',
    description: 'AI 绘画、图像编辑及视觉创作工具'
  },
  {
    id: '3',
    name: '编程开发',
    slug: 'coding',
    iconName: 'Code',
    description: 'AI 代码补全、Bug 修复及开发效率工具'
  },
  {
    id: '4',
    name: '视频创作',
    slug: 'video-creation',
    iconName: 'Video',
    description: 'AI 视频生成、剪辑及数字人工具'
  },
  {
    id: '5',
    name: '音频音效',
    slug: 'audio-speech',
    iconName: 'Mic',
    description: 'AI 配音、音乐创作及音频处理工具'
  },
  {
    id: '6',
    name: '办公效率',
    slug: 'productivity',
    iconName: 'Zap',
    description: 'AI 笔记、PPT 生成及日程管理工具'
  }
];

export const aiTools: AITool[] = [
  {
    id: 't1',
    name: 'ChatGPT',
    description: '由 OpenAI 开发的先进对话式 AI 语言模型。',
    iconUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=128&h=128&fit=crop',
    websiteUrl: 'https://chatgpt.com',
    categoryId: '1',
    tags: ['对话', '写作', '知识库'],
    pricing: '免费增值',
    rating: 4.9,
    visitCount: 999999,
    isFeatured: true,
    createdAt: '2023-01-01'
  },
  {
    id: 't2',
    name: 'Midjourney',
    description: '领先的 AI 艺术生成工具，将文字描述转化为精美图像。',
    iconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop',
    websiteUrl: 'https://www.midjourney.com',
    categoryId: '2',
    tags: ['艺术', '设计', '高画质'],
    pricing: '付费',
    rating: 4.8,
    visitCount: 500000,
    isFeatured: true,
    createdAt: '2023-02-15'
  },
  {
    id: 't3',
    name: 'Claude',
    description: 'Anthropic 开发的高智能、安全且诚实的 AI 助手。',
    iconUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=128&h=128&fit=crop',
    websiteUrl: 'https://claude.ai',
    categoryId: '1',
    tags: ['长文本', '分析', '研究'],
    pricing: '免费增值',
    rating: 4.7,
    visitCount: 300000,
    isFeatured: true,
    createdAt: '2023-03-20'
  },
  {
    id: 't4',
    name: 'GitHub Copilot',
    description: '你的 AI 结对编程伙伴，通过建议代码实时辅助开发。',
    iconUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=128&h=128&fit=crop',
    websiteUrl: 'https://github.com/features/copilot',
    categoryId: '3',
    tags: ['自动补全', 'IDE集成', '全语言'],
    pricing: '付费',
    rating: 4.8,
    visitCount: 450000,
    isFeatured: false,
    createdAt: '2022-11-10'
  },
  {
    id: 't5',
    name: 'Sora',
    description: 'OpenAI 发布的视频生成模型，可创建长达一分钟的逼真视频。',
    iconUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=128&h=128&fit=crop',
    websiteUrl: 'https://openai.com/sora',
    categoryId: '4',
    tags: ['文本转视频', '超写实', '前沿'],
    pricing: '付费',
    rating: 5.0,
    visitCount: 150000,
    isFeatured: true,
    createdAt: '2024-02-15'
  },
  {
    id: 't6',
    name: 'Notion AI',
    description: '在 Notion 笔记中集成的 AI 写作、总结和编辑工具。',
    iconUrl: 'https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=128&h=128&fit=crop',
    websiteUrl: 'https://www.notion.so/product/ai',
    categoryId: '6',
    tags: ['笔记', '整理', '协作'],
    pricing: '免费增值',
    rating: 4.6,
    visitCount: 200000,
    isFeatured: false,
    createdAt: '2023-04-01'
  }
];