import React from 'react';
import { ExternalLink, Star, Eye } from 'lucide-react';
import { AITool } from '@/types/tools';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: AITool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Card className="tech-card group h-full flex flex-col">
        <CardHeader className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl overflow-hidden border bg-muted">
              <img
                src={tool.iconUrl}
                alt={tool.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
            <Badge variant="secondary" className="bg-secondary/50 font-medium">
              {tool.pricing}
            </Badge>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg group-hover:text-brand-blue transition-colors">
                {tool.name}
              </h3>
              {tool.isFeatured && (
                <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[2.5rem]">
              {tool.description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-grow">
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 border-muted-foreground/20">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 border-t bg-secondary/10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-brand-orange text-brand-orange" />
              <span className="font-medium text-foreground">{tool.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{tool.visitCount > 1000 ? `${(tool.visitCount / 1000).toFixed(1)}k` : tool.visitCount}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10"
            onClick={() => window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            访问
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};