import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTE_PATHS } from '@/constants/routes';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link
        to={ROUTE_PATHS.HOME}
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        <span>首页</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <ChevronRight className="w-4 h-4 shrink-0 opacity-50" />
            {isLast || !item.href ? (
              <span className={cn("font-medium truncate max-w-[200px]", isLast && "text-foreground")}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-foreground transition-colors truncate max-w-[200px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
