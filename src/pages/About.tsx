import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Users, Target, Sparkles, Globe, Mail, MessageSquare } from 'lucide-react';

const About: React.FC = () => {
  useSEO({
    title: '关于我们 - AIHub',
    description: 'AIHub是专业的AI工具导航平台，致力于帮助用户发现最适合自己需求的人工智能解决方案，提升工作效率和创造力。',
    keywords: '关于AIHub,AI工具导航,AI工具平台,人工智能导航',
  });

  const stats = [
    { label: 'AI工具收录', value: '60+', icon: Sparkles },
    { label: '工具分类', value: '10', icon: Target },
    { label: '月访问量', value: '100K+', icon: Users },
    { label: '覆盖国家', value: '50+', icon: Globe },
  ];

  const features = [
    {
      title: '精选优质工具',
      description: '我们精心筛选全球最优秀的AI工具，确保每一款都能为您带来价值。',
    },
    {
      title: '详细分类导航',
      description: '按照使用场景和功能特点进行分类，帮助您快速找到所需工具。',
    },
    {
      title: '实时更新',
      description: '持续追踪AI领域最新动态，第一时间收录新兴优质工具。',
    },
    {
      title: '用户评价',
      description: '真实的用户评分和反馈，帮助您做出更明智的选择。',
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
              <Badge className="mb-4">关于我们</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                发现 AI 的无限可能
              </h1>
              <p className="text-lg text-muted-foreground">
                AIHub 是一个专注于收录和推荐优质 AI 工具的导航平台。
                我们的使命是帮助用户发现最适合自己需求的人工智能解决方案，
                提升工作效率和创造力。
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">我们的特色</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                致力于为用户提供最优质的 AI 工具发现体验
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4">联系我们</h2>
              <p className="text-muted-foreground mb-8">
                如果您有任何问题、建议或合作意向，欢迎随时与我们联系。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Card className="flex-1">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Mail className="h-6 w-6 text-brand-blue" />
                    <div className="text-left">
                      <div className="font-medium">邮箱联系</div>
                      <div className="text-sm text-muted-foreground">contact@aihub.com</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-6 flex items-center gap-4">
                    <MessageSquare className="h-6 w-6 text-brand-blue" />
                    <div className="text-left">
                      <div className="font-medium">在线反馈</div>
                      <div className="text-sm text-muted-foreground">提交工具或建议</div>
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
