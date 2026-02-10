import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { AITool } from '@/types/tools';
import { aiTools as defaultAiTools } from '@/data/tools';

export type SortOption = 'trending' | 'newest' | 'rating';

interface UseToolSearchOptions {
  tools?: AITool[];
}

export const useToolSearch = ({ tools }: UseToolSearchOptions = {}) => {
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const initializedRef = useRef(false);

  // Use provided tools or fallback to default
  const aiTools = tools || defaultAiTools;

  // Initialize search query from URL parameter (only once on mount)
  useEffect(() => {
    if (!initializedRef.current) {
      try {
        // Use URLSearchParams to parse window.location.search
        const urlSearchParams = new URLSearchParams(window.location.hash.split('?')[1] || window.location.search.substring(1));

        const searchParam = urlSearchParams.get('search') || urlSearchParams.get('q');
        if (searchParam) {
          setSearchQuery(decodeURIComponent(searchParam));
        }
        // Initialize category from URL parameter
        const categoryParam = urlSearchParams.get('category');
        if (categoryParam) {
          setSelectedCategoryId(categoryParam);
        }
      } catch (error) {
        console.error('Error initializing search params:', error);
      }
      initializedRef.current = true;
    }
  }, []); // Empty deps - run only once

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
    initializedRef.current = false; // Reset initialization flag
    navigate('/');
  }, [navigate]);

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
