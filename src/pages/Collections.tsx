import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { aiTools, toolCategories } from '@/data/tools';
import { IMAGES } from '@/assets/images';
import { Sparkles, Zap, PenTool, Layout } from 'lucide-react';

const Collections: React.FC = () => {
  // Define some curated collections based on available data
  const collections = [
    {
      id: 'featured',
      title: '本周编辑精选',
      description: '由我们团队亲手挑选的最具创新力的 AI 工具。',
      icon: <Sparkles className="w-6 h-6 text-brand-orange" />,
      tools: aiTools.filter(t => t.isFeatured),
      gradient: 'from-orange-500/10 to-transparent'
    },
    {
      id: 'writing',
      title: '高效写作神器',
      description: '释放你的创造力，用 AI 重塑文字创作流程。',
      icon: <PenTool className="w-6 h-6 text-brand-blue" />,
      tools: aiTools.filter(t => t.categoryId === '1'),
      gradient: 'from-blue-500/10 to-transparent'
    },
    {
      id: 'productivity',
      title: '职场生产力套件',
      description: '告别繁琐任务，让 AI 助你事半功倍。',
      icon: <Zap className="w-6 h-6 text-brand-blue" />,
      tools: aiTools.filter(t => t.categoryId === '6'),
      gradient: 'from-indigo-500/10 to-transparent'
    },
    {
      id: 'visual',
      title: '视觉创作工坊',
      description: '从静态图到动态视频，AI 助力每一个创意瞬间。',
      icon: <Layout className="w-6 h-6 text-brand-orange" />,
      tools: aiTools.filter(t => t.categoryId === '2' || t.categoryId === '4'),
      gradient: 'from-pink-500/10 to-transparent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 z-0">
            <img 
              src={IMAGES.DASHBOARD_6} 
              alt="Collections Hero" 
              className="w-full h-full object-cover opacity-10 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container relative z-10 px-4 py-20 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                精选 AI <span className="text-brand-blue">专题合集</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                发现针对特定场景优化的顶级 AI 工具。我们为您分类整理了各种高效解决方案，
                助您在学习、工作和创作中快人一步。
              </p>
            </motion.div>
          </div>
        </section>

        {/* Collections List */}
        <section className="container px-4 mx-auto mt-16">
          <div className="flex flex-col gap-20">
            {collections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-8"
              >
                <div className={`p-8 rounded-3xl bg-gradient-to-br ${collection.gradient} border border-border/50`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                      {collection.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{collection.title}</h2>
                      <p className="text-muted-foreground">{collection.description}</p>
                    </div>
                  </div>

                  {collection.tools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                      {collection.tools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-muted-foreground bg-muted/20 rounded-xl">
                      暂无该专题工具，更多精彩内容正在准备中...
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="container px-4 mx-auto mt-24 text-center">
          <div className="bg-zinc-900 text-white rounded-3xl p-12 overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">发现更多可能性</h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                我们每日更新最新、最前沿的 AI 工具，不错过任何一个提升效率的机会。
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-8 py-3 bg-brand-blue hover:bg-blue-600 text-white rounded-full font-medium transition-colors">
                  查看全部分类
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/20 blur-3xl rounded-full -ml-32 -mb-32" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;