import React from 'react';
import { toolCategories } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface CategoryFilterProps {
  selectedCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategoryId, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button
        variant={selectedCategoryId === null ? 'default' : 'outline'}
        size="sm"
        className={cn(
          "rounded-full px-5 transition-all",
          selectedCategoryId === null 
            ? "bg-brand-blue hover:bg-blue-600 shadow-sm" 
            : "hover:border-brand-blue hover:text-brand-blue"
        )}
        onClick={() => onCategoryChange(null)}
      >
        全部工具
      </Button>
      
      {toolCategories.map((category) => {
        const IconComponent = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[category.iconName] || Icons.Box;
        const isActive = selectedCategoryId === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            className={cn(
              "rounded-full px-5 gap-2 transition-all",
              isActive 
                ? "bg-brand-blue hover:bg-blue-600 shadow-sm" 
                : "hover:border-brand-blue hover:text-brand-blue"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            <IconComponent className="h-3.5 w-3.5" />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};