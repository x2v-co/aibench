import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToolSearch } from '@/hooks/useToolSearch';
import { useTranslatedTools } from '@/hooks/useTranslatedTools';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Collections: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('collections');
  const { aiTools, toolCategories } = useTranslatedTools();

  useSEO({
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
  });

  // Featured tools
  const featuredTools = aiTools.filter(t => t.isFeatured).slice(0, 8);

  // Top rated tools
  const topRatedTools = [...aiTools].sort((a, b) => b.rating - a.rating).slice(0, 8);

  // Latest tools
  const latestTools = [...aiTools].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 8);

  // Popular tools (by visits)
  const popularTools = [...aiTools].sort((a, b) => b.visitCount - a.visitCount).slice(0, 8);

  const collections = [
    {
      id: 'featured',
      title: t('collections.featured.title'),
      description: t('collections.featured.description'),
      icon: Sparkles,
      tools: featuredTools,
      color: 'text-brand-orange',
      bgColor: 'bg-brand-orange/10',
    },
    {
      id: 'top-rated',
      title: t('collections.topRated.title'),
      description: t('collections.topRated.description'),
      icon: Star,
      tools: topRatedTools,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      id: 'trending',
      title: t('collections.trending.title'),
      description: t('collections.trending.description'),
      icon: TrendingUp,
      tools: popularTools,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      id: 'latest',
      title: t('collections.latest.title'),
      description: t('collections.latest.description'),
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
              <Badge className="mb-4">{t('badge')}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {t('title')}
              </h1>
              <p className="text-muted-foreground">
                {t('subtitle')}
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
                  {collection.tools.map((tool) => {
                    const category = toolCategories.find(c => c.id === tool.categoryId);
                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
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
              <h2 className="text-2xl font-bold mb-2">{t('categories.title')}</h2>
              <p className="text-muted-foreground">{t('categories.subtitle')}</p>
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
                      <p className="text-sm text-muted-foreground">{count} {t('categories.toolsCount')}</p>
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
