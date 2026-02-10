import React, { useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { useNavigate, useParams } from 'react-router-dom';
import { toolCategories } from '@/data/tools';
import { useTranslatedTools } from '@/hooks/useTranslatedTools';
import { useSEO } from '@/hooks/useSEO';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('categories');
  const { aiTools, toolCategories } = useTranslatedTools();

  const category = toolCategories.find(c => c.slug === slug);

  useEffect(() => {
    if (!category) {
      navigate('/');
    }
  }, [category, navigate]);

  const categoryTools = useMemo(() => {
    return category
      ? aiTools.filter(tool => tool.categoryId === category.id)
      : [];
  }, [aiTools, category]);

  useSEO(category ? {
    title: `${category.name} - AI Tools`,
    description: category.description,
  } : {});

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">
            {t('all')}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>

        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No tools found in this category yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
