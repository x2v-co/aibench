import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { SearchBar } from '@/components/SearchBar';
import { useToolSearch } from '@/hooks/useToolSearch';
import { toolCategories } from '@/data/tools';
import { motion } from 'framer-motion';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = toolCategories.find((c) => c.slug === slug);

  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredTools,
    setSelectedCategoryId
  } = useToolSearch();

  useEffect(() => {
    if (category) {
      setSelectedCategoryId(category.id);
    }
  }, [category, setSelectedCategoryId]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl font-medium">未找到该分类</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Category Header */}
        <section className="relative py-16 md:py-24 border-b overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description || `探索最优秀的 ${category.name} AI 工具，提升您的创作与工作效率。`}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Sort Area */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredTools.length}
            />
          </div>
        </section>

        {/* Tools Grid */}
        <section className="container mx-auto px-4 py-12">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">暂无相关工具，换个搜索词试试吧</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Category;