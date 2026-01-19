import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import { ChevronRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 grid-pattern"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <img 
            src={IMAGES.NEURAL_NETWORK_3} 
            alt="Tech Background" 
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium border rounded-full glass-panel border-white/10 text-brand-blue"
        >
          <Sparkles className="w-4 h-4" />
          <span>探索 1000+ 顶尖 AI 工具</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-6 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
        >
          发现 <span className="text-brand-blue">AI</span> 的<br />
          <span className="relative inline-block">
            无限可能
            <motion.span 
              className="absolute bottom-2 left-0 w-full h-3 -z-10 bg-brand-orange/20"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-muted-foreground"
        >
          汇集全球最先进的人工智能工具，助力您的创意与工作效率。从文本写作到图像生成，一站式开启您的智能办公新时代。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="h-12 px-8 text-base bg-brand-blue hover:bg-brand-blue/90 glow-blue">
            立即开始探索
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5">
            提交您的工具
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative max-w-5xl mx-auto mt-20 group"
        >
          <div className="absolute inset-0 transition-opacity duration-500 opacity-50 -z-10 blur-3xl bg-gradient-to-r from-brand-blue/30 to-brand-orange/30 group-hover:opacity-70" />
          <div className="overflow-hidden border shadow-2xl rounded-2xl border-white/10">
            <img
              src={IMAGES.AI_TECH_2}
              alt="AI Interface Preview"
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
