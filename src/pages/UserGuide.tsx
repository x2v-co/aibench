import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Search, Filter, Bookmark, MessageSquare, Star, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const UserGuide: React.FC = () => {
  const { t } = useTranslation('userGuide');

  useSEO({
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
  });

  const sections = [
    {
      icon: Search,
      title: t('sections.searching.title'),
      description: t('sections.searching.description'),
      steps: [
        t('sections.searching.steps.useSearchBar'),
        t('sections.searching.steps.useFilters'),
        t('sections.searching.steps.sortResults'),
      ],
    },
    {
      icon: Filter,
      title: t('sections.categories.title'),
      description: t('sections.categories.description'),
      steps: [
        t('sections.categories.steps.browseCategories'),
        t('sections.categories.steps.filterByCategory'),
        t('sections.categories.steps.exploreCollections'),
      ],
    },
    {
      icon: Bookmark,
      title: t('sections.saving.title'),
      description: t('sections.saving.description'),
      steps: [
        t('sections.saving.steps.clickBookmark'),
        t('sections.saving.steps.accessSaved'),
        t('sections.saving.steps.manageBookmarks'),
      ],
    },
    {
      icon: Star,
      title: t('sections.rating.title'),
      description: t('sections.rating.description'),
      steps: [
        t('sections.rating.steps.selectRating'),
        t('sections.rating.steps.shareExperience'),
        t('sections.rating.steps.helpOthers'),
      ],
    },
    {
      icon: MessageSquare,
      title: t('sections.submission.title'),
      description: t('sections.submission.description'),
      steps: [
        t('sections.submission.steps.clickSubmit'),
        t('sections.submission.steps.fillDetails'),
        t('sections.submission.steps.awaitReview'),
      ],
    },
    {
      icon: Share2,
      title: t('sections.sharing.title'),
      description: t('sections.sharing.description'),
      steps: [
        t('sections.sharing.steps.copyLink'),
        t('sections.sharing.steps.socialMedia'),
        t('sections.sharing.steps.embedTool'),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Guide Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12 max-w-4xl mx-auto">
              {sections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                >
                  <Card className="mb-4">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-blue/10">
                          <section.icon className="h-6 w-6 text-brand-blue" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                          <p className="text-muted-foreground">{section.description}</p>
                        </div>
                      </div>
                      <div className="ml-16">
                        <ol className="space-y-3">
                          {section.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex gap-3">
                              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue text-white text-sm font-medium">
                                {stepIndex + 1}
                              </span>
                              <span className="text-muted-foreground pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {t('tips.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{t(`tips.items.${index}.title`)}</h3>
                        <p className="text-sm text-muted-foreground">{t(`tips.items.${index}.description`)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                {t('faq.title')}
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{t(`faq.items.${index}.question`)}</h3>
                        <p className="text-sm text-muted-foreground">{t(`faq.items.${index}.answer`)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UserGuide;
