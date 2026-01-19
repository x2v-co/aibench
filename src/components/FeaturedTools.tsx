import React from 'react';
import { motion } from 'framer-motion';
import { aiTools } from '@/data/tools';
import { ToolCard } from '@/components/ToolCard';
import { Sparkles } from 'lucide-react';

export const FeaturedTools: React.FC = () => {
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
              <span className="text-sm font-bold tracking-widest uppercase text-brand-orange">热门精选</span>
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">精选人工智能工具</h2>
            <p className="mt-2 text-muted-foreground">为您挑选当前最前沿、最高效的 AI 生产力工具</p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="#" 
              className="px-6 py-2 text-sm font-medium transition-colors border rounded-full hover:bg-secondary border-border"
            >
              查看全部工具
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
