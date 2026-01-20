import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useToolSearch } from '@/hooks/useToolSearch';
import { Search as SearchIcon, FilterX } from 'lucide-react';

const Search: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Search & Header Section */}
        <section className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">搜索 AI 工具</h1>
              <p className="text-muted-foreground">在我们的数据库中搜索最适合您需求的 AI 解决方案</p>
            </div>

            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredTools.length}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <SearchIcon className="w-4 h-4" />
                    分类筛选
                  </h3>
                  <CategoryFilter
                    selectedCategoryId={selectedCategoryId}
                    onCategoryChange={setSelectedCategoryId}
                  />
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full py-2 px-4 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <FilterX className="w-4 h-4" />
                  重置所有筛选
                </button>

                <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                  <h4 className="text-sm font-bold text-brand-blue mb-2">提示</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    尝试使用更具体的关键词，如 "写作助手" 或 "图像生成" 以获得更精准的结果。
                  </p>
                </div>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-grow">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {searchQuery ? `关于 "${searchQuery}" 的搜索结果` : '所有工具'}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({filteredTools.length})
                  </span>
                </h2>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredTools.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
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
                    className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-3xl border border-dashed"
                  >
                    <div className="p-6 rounded-full bg-muted mb-4">
                      <SearchIcon className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">未找到相关结果</h3>
                    <p className="text-muted-foreground mb-6">请尝试调整搜索词或筛选条件</p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    >
                      清空搜索
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;