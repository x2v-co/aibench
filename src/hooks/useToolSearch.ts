import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AITool } from '@/types/tools';
import { aiTools as defaultAiTools } from '@/data/tools';

export type SortOption = 'trending' | 'newest' | 'rating';

interface UseToolSearchOptions {
  tools?: AITool[];
}

export const useToolSearch = ({ tools }: UseToolSearchOptions = {}) => {
  const searchParams = useSearchParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('trending');

  // Use provided tools or fallback to default
  const aiTools = tools || defaultAiTools;

  // Initialize search query from URL parameter on mount
  useMemo(() => {
    const searchParam = searchParams.get('search') || searchParams.get('q');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
    // Initialize category from URL parameter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategoryId(categoryParam);
    }
  }, [location.search, searchParams]);

  const filteredTools = useMemo(() => {
    let result = [...tools];

    // Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category Filter
    if (selectedCategoryId) {
      result = result.filter((tool) => tool.categoryId === selectedCategoryId);
    }

    // Tags Filter
    if (selectedTags.length > 0) {
      result = result.filter((tool) =>
        selectedTags.every((tag) => tool.tags.includes(tag))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return b.visitCount - a.visitCount;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategoryId, selectedTags, sortBy, tools]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategoryId(null);
    setSelectedTags([]);
    setSortBy('trending');
  }, [searchParams, setSearchQuery, setSelectedCategoryId, setSelectedTags, setSortBy]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedTags,
    toggleTag,
    sortBy,
    setSortBy,
    filteredTools,
    resetFilters
  };
};
