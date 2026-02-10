import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedTools } from '@/components/FeaturedTools';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ToolCard } from '@/components/ToolCard';
import { Footer } from '@/components/Footer';
import { useToolSearch } from '@/hooks/useToolSearch';
import { useTranslatedTools } from '@/hooks/useTranslatedTools';
import { useSEO } from '@/hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';
import { Loader2 } from 'lucide-react';

const Index: React.FC = () => {
  useSEO();
  const { t } = useTranslation('index');
  const { aiTools } = useTranslatedTools();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortBy,
    setSortBy,
    filteredTools,
    resetFilters
  } = useToolSearch({ tools: aiTools });

  const hasActiveFilters = searchQuery.length > 0 || selectedCategoryId !== null;

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.alreadySubscribed) {
          toast.info('You are already subscribed!');
        } else {
          toast.success('Successfully subscribed! Check your email for confirmation.');
        }
        setNewsletterEmail('');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again later.');
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Only show when no filters are applied */}
        {!hasActiveFilters && <HeroSection />}

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
                  {hasActiveFilters ? t('searchResults') : t('title')}
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-sm font-medium text-brand-blue hover:underline transition-all"
                  >
                    {t('resetFilters')}
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
                    <h3 className="text-xl font-semibold mb-2">{t('noResults.title')}</h3>
                    <p className="text-muted-foreground max-w-md">
                      {t('noResults.description')}
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all"
                    >
                      {t('noResults.clearFilters')}
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
            <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50"
                disabled={isNewsletterSubmitting}
                required
              />
              <button
                type="submit"
                disabled={isNewsletterSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isNewsletterSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  t('newsletter.button')
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
