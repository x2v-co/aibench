import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { aiTools, toolCategories } from '@/data/tools';
import { useSEO } from '@/hooks/useSEO';
import {
  ExternalLink,
  Star,
  Eye,
  ArrowLeft,
  Calendar,
  Tag,
  Folder,
  Share2,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const tool = aiTools.find(t => t.id === id);
  const category = tool ? toolCategories.find(c => c.id === tool.categoryId) : null;
  const relatedTools = tool
    ? aiTools.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 4)
    : [];

  useSEO(tool ? {
    title: `${tool.name} - ${category?.name || 'AI工具'}`,
    description: tool.longDescription || tool.description,
    keywords: `${tool.name},${tool.tags.join(',')},${category?.name || ''},AI工具`,
  } : {});

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">工具未找到</h1>
            <p className="text-muted-foreground mb-8">抱歉，您访问的工具不存在或已被移除。</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => navigate('/')}
                className="hover:text-foreground transition-colors"
              >
                首页
              </button>
              <span>/</span>
              {category && (
                <>
                  <button
                    onClick={() => navigate(`/?category=${category.id}`)}
                    className="hover:text-foreground transition-colors"
                  >
                    {category.name}
                  </button>
                  <span>/</span>
                </>
              )}
              <span className="text-foreground font-medium">{tool.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Button>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 bg-white shadow-lg flex-shrink-0">
                    <img
                      src={tool.iconUrl}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&size=128`;
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold">{tool.name}</h1>
                      {tool.isFeatured && (
                        <Badge className="bg-brand-orange text-white">精选</Badge>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-brand-orange text-brand-orange" />
                        <span className="font-semibold">{tool.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">评分</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-5 w-5" />
                        <span>{tool.visitCount.toLocaleString()}</span>
                        <span className="text-sm">访问</span>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {tool.pricing}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-brand-blue hover:bg-blue-600"
                    onClick={() => window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    访问官网
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    收藏
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="mr-2 h-5 w-5" />
                    分享
                  </Button>
                </div>

                {/* Description */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">工具介绍</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {tool.longDescription || tool.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      标签
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-sm px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Info Card */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg">工具信息</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Folder className="h-4 w-4" />
                          分类
                        </span>
                        <span className="font-medium">{category?.name || '未分类'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          收录时间
                        </span>
                        <span className="font-medium">{tool.createdAt}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">定价模式</span>
                        <Badge variant="secondary">{tool.pricing}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">相关工具</h3>
                      <div className="space-y-3">
                        {relatedTools.map((relatedTool) => (
                          <button
                            key={relatedTool.id}
                            onClick={() => navigate(`/tool/${relatedTool.id}`)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden border bg-white flex-shrink-0">
                              <img
                                src={relatedTool.iconUrl}
                                alt={relatedTool.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(relatedTool.name)}&background=random&size=64`;
                                }}
                              />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="font-medium truncate">{relatedTool.name}</div>
                              <div className="text-xs text-muted-foreground truncate">
                                {relatedTool.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ToolDetail;
