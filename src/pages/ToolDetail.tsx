import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import { QuickActions } from '@/components/QuickActions';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { aiTools, toolCategories } from '@/data/tools';
import { ExternalLink, Star, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = aiTools.find((t) => t.id === id);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">未找到该工具</h2>
            <Link to="/" className="text-brand-blue mt-4 inline-block hover:underline">返回首页</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = toolCategories.find((c) => c.id === tool.categoryId);
  const relatedTools = aiTools
    .filter((t) => t.categoryId === tool.categoryId && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb 
            items={[
              { label: category?.name || '分类', href: `/category/${category?.slug}` },
              { label: tool.name }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={tool.iconUrl} 
                  alt={tool.name} 
                  className="w-24 h-24 rounded-2xl border bg-white shadow-sm"
                />
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
                    <p className="text-xl text-muted-foreground mt-2">{tool.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                    <Badge variant="outline" className="border-brand-blue text-brand-blue">{tool.pricing}</Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-brand-orange fill-brand-orange" />
                      <span className="font-medium text-foreground">{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4" />
                      <span>{tool.visitCount.toLocaleString()} 访问</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>发布于 {tool.createdAt}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <QuickActions 
                      toolId={tool.id}
                      toolName={tool.name}
                      toolUrl={tool.websiteUrl}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-blue data-[state=active]:bg-transparent px-8 py-3">概述</TabsTrigger>
                    <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-blue data-[state=active]:bg-transparent px-8 py-3">功能特性</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="py-8 space-y-6">
                    <div className="prose max-w-none dark:prose-invert">
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {tool.longDescription || `${tool.name} 是一款功能强大的 AI 工具，专注于 ${category?.name} 领域。它利用先进的机器学习模型为用户提供高效的解决方案。无论您是专业人士还是初学者，${tool.name} 都能极大地提升您的工作流效率。`}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="py-8">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['智能自动化', '多语言支持', '实时协作', '高度自定义', '安全可靠', '跨平台同步'].map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                          <div className="h-2 w-2 rounded-full bg-brand-blue" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl border bg-card shadow-sm sticky top-24">
                <h3 className="font-bold mb-4">立即使用</h3>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 h-12 text-lg" asChild>
                  <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                    访问官网 <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  点击访问后将离开本站
                </p>
              </div>

              {relatedTools.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">相关推荐</h3>
                  <div className="space-y-4">
                    {relatedTools.map((t) => (
                      <ToolCard key={t.id} tool={t} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetail;