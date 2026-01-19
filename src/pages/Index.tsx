import React from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedTools } from '@/components/FeaturedTools';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ToolCard } from '@/components/ToolCard';
import { Footer } from '@/components/Footer';
import { useToolSearch } from '@/hooks/useToolSearch';
import { motion, AnimatePresence } from 'framer-motion';

const Index: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortBy,
    setSortBy,
    filteredTools,
    resetFilters
  } = useToolSearch();

  const hasActiveFilters = searchQuery.length > 0 || selectedCategoryId !== null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Tools Section - Only show when no filters are applied to keep UI clean */}
        {!hasActiveFilters && (
          <div className="bg-muted/30 py-12">
            <FeaturedTools />
          </div>
        )}

        {/* Main Content Area */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col space-y-8">
            {/* Filters and Search Area */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight">
                  {hasActiveFilters ? '搜索结果' : '探索所有工具'}
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-sm font-medium text-brand-blue hover:underline transition-all"
                  >
                    重置所有筛选
                  </button>
                )}
              </div>

              <CategoryFilter
                selectedCategoryId={selectedCategoryId}
                onCategoryChange={setSelectedCategoryId}
              />

              <div className="sticky top-20 z-10 py-2 bg-background/80 backdrop-blur-md">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  resultCount={filteredTools.length}
                />
              </div>
            </div>

            {/* Tool Grid */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="popLayout">
                {filteredTools.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredTools.map((tool) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ToolCard tool={tool} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">未找到匹配的工具</h3>
                    <p className="text-muted-foreground max-w-md">
                      尝试调整您的搜索关键词或选择不同的分类，发现更多精彩的 AI 资源。
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                      清除所有筛选
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA Section (Optional visual filler) */}
        <section className="border-t bg-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">订阅我们的周刊</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              每周获取最前沿的 AI 工具动态和行业深度分析，走在科技最前沿。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button className="w-full sm:w-auto px-8 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                立即订阅
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;