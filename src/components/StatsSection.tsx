import { motion } from 'framer-motion';
import { aiTools, toolCategories } from '@/data/tools';
import { Wrench, Users, LayoutGrid, Star } from 'lucide-react';

export function StatsSection() {
  const totalTools = aiTools.length;
  const totalCategories = toolCategories.length;
  const totalVisits = aiTools.reduce((acc, tool) => acc + (tool.visitCount || 0), 0);
  const featuredCount = aiTools.filter(t => t.isFeatured).length;

  const stats = [
    {
      label: '已收录工具',
      value: totalTools.toLocaleString(),
      icon: Wrench,
      color: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
    },
    {
      label: '累计访问量',
      value: (totalVisits / 10000).toFixed(1) + 'W+',
      icon: Users,
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
    },
    {
      label: '精选分类',
      value: totalCategories,
      icon: LayoutGrid,
      color: 'text-brand-blue',
      bg: 'bg-brand-blue/10',
    },
    {
      label: '优质推荐',
      value: featuredCount,
      icon: Star,
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
    },
  ];

  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
