import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { IMAGES } from '@/assets/images';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Zap, Mail, Github, Globe } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    { 
      icon: <Heart className="h-6 w-6 text-brand-orange" />, 
      title: '热爱创新', 
      desc: '我们热衷于探索人工智能的边界，并将其带给每一个人。' 
    },
    { 
      icon: <Users className="h-6 w-6 text-brand-blue" />, 
      title: '社区驱动', 
      desc: '由 AI 爱好者共同维护，确保内容的真实性与实用性。' 
    },
    { 
      icon: <Shield className="h-6 w-6 text-brand-orange" />, 
      title: '客观中立', 
      desc: '提供无偏见的工具评价，帮助用户做出最适合的选择。' 
    },
    { 
      icon: <Zap className="h-6 w-6 text-brand-blue" />, 
      title: '追求效率', 
      desc: '通过智能推荐，让用户在几秒钟内找到所需工具。' 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-black">
          <img 
            src={IMAGES.AI_TECH_4} 
            alt="About AI Hub" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              让 AI 触手可及
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              我们致力于打造全球最全面、最客观的 AI 工具导航平台，连接创造力与未来科技。
            </motion.p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">我们的核心价值</h2>
              <div className="h-1 w-20 bg-brand-blue mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                  <div className="mb-6">{v.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                  <p className="text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Details */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src={IMAGES.NEURAL_NETWORK_7} 
                  alt="Mission" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">为什么选择我们？</h2>
                <p className="text-lg text-muted-foreground">
                  在 AI 爆炸式增长的今天，每天都有数百个新工具出现。用户面临着严重的信息过载和选择困难。我们的团队通过深度测试、社区反馈和技术评估，为您筛选出真正能解决问题的工具。
                </p>
                <ul className="space-y-4">
                  {['每日更新最新发布的 AI 技术', '深度行业分析与工具对比报告', '真实用户评价与评分系统', '开发者直达与独家优惠活动'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <Zap className="h-5 w-5 text-brand-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">联系我们</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="flex items-center gap-2 p-4 rounded-full border hover:bg-muted transition-colors">
                <Mail className="h-5 w-5" />
                <span>contact@aihub.com</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-4 rounded-full border hover:bg-muted transition-colors">
                <Github className="h-5 w-5" />
                <span>GitHub Project</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-4 rounded-full border hover:bg-muted transition-colors">
                <Globe className="h-5 w-5" />
                <span>Twitter / X</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;