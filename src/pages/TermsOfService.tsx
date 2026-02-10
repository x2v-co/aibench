import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { FileText, Users, AlertTriangle, Scale, Ban, Gavel } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TermsOfService: React.FC = () => {
  const { t } = useTranslation('terms');

  useSEO({
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
  });

  const sections = [
    {
      icon: Users,
      title: t('sections.account.title'),
      content: t('sections.account.content'),
    },
    {
      icon: FileText,
      title: t('sections.content.title'),
      content: t('sections.content.content'),
    },
    {
      icon: Ban,
      title: t('sections.prohibited.title'),
      content: t('sections.prohibited.content'),
    },
    {
      icon: Scale,
      title: t('sections.intellectual.title'),
      content: t('sections.intellectual.content'),
    },
    {
      icon: AlertTriangle,
      title: t('sections.disclaimer.title'),
      content: t('sections.disclaimer.content'),
    },
    {
      icon: Gavel,
      title: t('sections.termination.title'),
      content: t('sections.termination.content'),
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
              <Gavel className="h-16 w-16 mx-auto mb-6 text-brand-blue" />
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('subtitle')}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t('lastUpdated', { date: new Date().toLocaleDateString() })}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Agreement Notice */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-brand-blue/50 bg-brand-blue/5">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">{t('agreement.title')}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('agreement.content')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-8 max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-blue/10 flex-shrink-0">
                          <section.icon className="h-6 w-6 text-brand-blue" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                        </div>
                      </div>
                      <div className="ml-16">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Changes Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{t('changes.title')}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t('changes.content')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('changes.notice')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('contact.description')}
              </p>
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6">
                  <p className="font-medium">{t('contact.email')}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
