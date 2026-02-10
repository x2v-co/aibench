import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Users, Target, Sparkles, Globe, Mail, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation('about');

  useSEO({
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
  });

  const stats = [
    { label: t('stats.aiTools'), value: '60+', icon: Sparkles },
    { label: t('stats.categories'), value: '10', icon: Target },
    { label: t('stats.monthlyVisits'), value: '100K+', icon: Users },
    { label: t('stats.countries'), value: '50+', icon: Globe },
  ];

  const features = [
    {
      title: t('features.list.curated.title'),
      description: t('features.list.curated.description'),
    },
    {
      title: t('features.list.categorized.title'),
      description: t('features.list.categorized.description'),
    },
    {
      title: t('features.list.updated.title'),
      description: t('features.list.updated.description'),
    },
    {
      title: t('features.list.reviews.title'),
      description: t('features.list.reviews.description'),
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
              <Badge className="mb-4">{t('badge')}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {t('title')}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t('description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 mx-auto mb-3 text-brand-blue" />
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('features.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contact.title')}</h2>
              <p className="text-muted-foreground mb-8">
                {t('contact.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Card className="flex-1">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Mail className="h-6 w-6 text-brand-blue" />
                    <div className="text-left">
                      <div className="font-medium">{t('contact.email.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact.email.value')}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-6 flex items-center gap-4">
                    <MessageSquare className="h-6 w-6 text-brand-blue" />
                    <div className="text-left">
                      <div className="font-medium">{t('contact.feedback.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact.feedback.value')}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
