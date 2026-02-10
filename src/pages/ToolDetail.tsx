import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toolCategories } from '@/data/tools';
import { useTranslatedTools } from '@/hooks/useTranslatedTools';
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
import { useTranslation } from 'react-i18next';

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('toolDetail');
  const { aiTools, toolCategories } = useTranslatedTools();

  const tool = aiTools.find(t => t.id === id);
  const category = tool ? toolCategories.find(c => c.id === tool.categoryId) : null;
  const relatedTools = tool
    ? aiTools.filter(t => t.categoryId === tool.categoryId && t.id !== tool.id).slice(0, 4)
    : [];

  useSEO(tool ? {
    title: `${tool.name} - ${category?.name || t('sections.info.uncategorized')}`,
    description: tool.longDescription || tool.description,
    keywords: `${tool.name},${tool.tags.join(',')},${category?.name || ''},AI Tools`,
  } : {});

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t('notFound.title')}</h1>
            <p className="text-muted-foreground mb-8">{t('notFound.description')}</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('notFound.backButton')}
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
                onClick={() => navigate(-1)}
                className="hover:text-foreground transition-colors"
              >
                {t('breadcrumb.home')}
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
              {t('back')}
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
                        <Badge className="bg-brand-orange text-white">{t('featured')}</Badge>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-brand-orange text-brand-orange" />
                        <span className="font-semibold">{tool.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-sm">{t('rating')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-5 w-5" />
                        <span>{tool.visitCount.toLocaleString()}</span>
                        <span className="text-sm">{t('visits')}</span>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        {t(`pricing.${tool.pricing.toLowerCase()}`)}
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
                    {t('actions.visit')}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    {t('actions.favorite')}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="mr-2 h-5 w-5" />
                    {t('actions.share')}
                  </Button>
                </div>

                {/* Description */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">{t('sections.introduction.title')}</h2>
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
                      {t('sections.tags.title')}
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
                    <h3 className="font-semibold text-lg">{t('sections.info.title')}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Folder className="h-4 w-4" />
                          {t('sections.info.category')}
                        </span>
                        <span className="font-medium">{category?.name || t('sections.info.uncategorized')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {t('sections.info.addedDate')}
                        </span>
                        <span className="font-medium">{tool.createdAt}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('sections.info.pricing')}</span>
                        <Badge variant="secondary">{t(`pricing.${tool.pricing.toLowerCase()}`)}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Tools */}
                {relatedTools.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{t('sections.related.title')}</h3>
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
