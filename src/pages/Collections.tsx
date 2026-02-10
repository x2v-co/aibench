import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { aiTools, toolCategories } from '@/data/tools';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Clock, Star } from 'lucide-react';

const Collections: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: '专题集合 - 精选AI工具合集',
    description: '探索AIHub精心整理的AI工具合集，包括编辑精选、高分推荐、热门工具、最新收录等多个专题，帮助您快速发现优质AI工具。',
    keywords: 'AI工具合集,精选AI工具,热门AI工具,最新AI工具,AI工具推荐',
  });

  // 精选工具集合
  const featuredTools = aiTools.filter(t => t.isFeatured).slice(0, 8);

  // 高评分工具
  const topRatedTools = [...aiTools].sort((a, b) => b.rating - a.rating).slice(0, 8);

  // 最新工具
  const latestTools = [...aiTools].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 8);

  // 热门工具（按访问量）
  const popularTools = [...aiTools].sort((a, b) => b.visitCount - a.visitCount).slice(0, 8);

  const collections = [
    {
      id: 'featured',
      title: '编辑精选',
      description: '由我们精心挑选的优质AI工具',
      icon: Sparkles,
      tools: featuredTools,
      color: 'text-brand-orange',
      bgColor: 'bg-brand-orange/10',
    },
    {
      id: 'top-rated',
      title: '高分推荐',
      description: '用户评分最高的AI工具',
      icon: Star,
      tools: topRatedTools,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      id: 'trending',
      title: '热门工具',
      description: '访问量最高的AI工具',
      icon: TrendingUp,
      tools: popularTools,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      id: 'latest',
      title: '最新收录',
      description: '近期新增的AI工具',
      icon: Clock,
      tools: latestTools,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4">专题集合</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                精选 AI 工具合集
              </h1>
              <p className="text-muted-foreground">
                我们根据不同维度为您整理了多个精选合集，帮助您快速发现优质工具
              </p>
            </motion.div>
          </div>
        </section>

        {/* Collections */}
        <section className="py-12">
          <div className="container mx-auto px-4 space-y-16">
            {collections.map((collection, collectionIndex) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: collectionIndex * 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${collection.bgColor}`}>
                      <collection.icon className={`h-6 w-6 ${collection.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{collection.title}</h2>
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {collection.tools.map((tool, index) => {
                    const category = toolCategories.find(c => c.id === tool.categoryId);
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          className="cursor-pointer hover:shadow-md transition-shadow h-full"
                          onClick={() => navigate(`/tool/${tool.id}`)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden border bg-muted flex-shrink-0">
                                <img
                                  src={tool.iconUrl}
                                  alt={tool.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&size=64`;
                                  }}
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold truncate">{tool.name}</h3>
                                  {tool.isFeatured && (
                                    <span className="flex h-2 w-2 rounded-full bg-brand-orange" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {tool.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    {category?.name}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-brand-orange text-brand-orange" />
                                    {tool.rating.toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">按分类浏览</h2>
              <p className="text-muted-foreground">探索不同类别的AI工具</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {toolCategories.map((category) => {
                const count = aiTools.filter(t => t.categoryId === category.id).length;
                return (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/?category=${category.id}`)}
                  >
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{count} 个工具</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
