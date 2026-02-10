import React from 'react';
import { motion } from 'framer-motion';
import { useTranslatedTools } from '@/hooks/useTranslatedTools';
import { ToolCard } from '@/components/ToolCard';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FeaturedTools: React.FC = () => {
  const { t } = useTranslation('featured');
  const { aiTools } = useTranslatedTools();
  const featuredTools = aiTools.filter(tool => tool.isFeatured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 mb-2 md:justify-start">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <span className="text-sm font-bold tracking-widest uppercase text-brand-orange">{t('badge')}</span>
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">{t('title')}</h2>
            <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#"
              className="px-6 py-2 text-sm font-medium transition-colors border rounded-full hover:bg-secondary border-border"
            >
              {t('viewAll')}
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuredTools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
