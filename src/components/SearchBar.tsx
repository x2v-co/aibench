import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SortOption } from '@/hooks/useToolSearch';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount
}) => {
  const { t } = useTranslation('search');

  return (
    <div className="glass-panel p-4 rounded-2xl border flex flex-col md:flex-row items-center gap-4">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('placeholder')}
          className="pl-10 h-12 bg-transparent border-none focus-visible:ring-1 focus-visible:ring-brand-blue text-lg"
        />
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
          <SlidersHorizontal className="h-4 w-4" />
          {t('sortLabel')}
        </div>

        <Select value={sortBy} onValueChange={(val) => onSortChange(val as SortOption)}>
          <SelectTrigger className="w-[140px] h-10 border-none bg-secondary/50 focus:ring-0">
            <SelectValue placeholder={t('sortPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">{t('results.trending')}</SelectItem>
            <SelectItem value="newest">{t('results.newest')}</SelectItem>
            <SelectItem value="rating">{t('results.rating')}</SelectItem>
          </SelectContent>
        </Select>

        <div className="hidden lg:block text-sm text-muted-foreground whitespace-nowrap border-l pl-4">
          <span dangerouslySetInnerHTML={{ __html: t('results.found', { count: resultCount }) }} />
        </div>
      </div>
    </div>
  );
};
