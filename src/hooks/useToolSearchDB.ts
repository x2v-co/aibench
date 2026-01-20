import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toolsApi } from '@/services/api';
import type { Database } from '@/types/database';

/**
 * useToolSearch 钩子用于集成数据库查询和实时数据搜索
 * 该钩子封装了搜索防抖、分类过滤以及基于 React Query 的数据缓存逻辑
 */

// 提取工具行的类型定义
export type Tool = Database['public']['Tables']['tools']['Row'];

interface UseToolSearchOptions {
  initialQuery?: string;
  initialCategory?: string;
}

export const useToolSearch = (options?: UseToolSearchOptions) => {
  const [searchQuery, setSearchQuery] = useState(options?.initialQuery || '');
  const [selectedCategory, setSelectedCategory] = useState(options?.initialCategory || '全部');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // 实现搜索关键字防抖，避免频繁触发 API 请求
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // 使用 TanStack Query 进行数据获取和缓存管理
  const {
    data: tools,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['tools', debouncedQuery, selectedCategory],
    queryFn: async () => {
      // 如果分类为 "全部"，则不传递 category 过滤参数
      const categoryParam = selectedCategory === '全部' ? undefined : selectedCategory;
      
      // 调用 api 服务层的方法获取数据
      // 注意：这里假设 toolsApi.getTools 已在 src/services/api.ts 中定义，并接受 query 和 category 参数
      return await toolsApi.getTools({
        query: debouncedQuery,
        category: categoryParam,
      });
    },
    // 设置缓存时间，优化性能
    staleTime: 1000 * 60 * 2, // 2分钟内数据被认为是新鲜的
    placeholderData: (previousData) => previousData, // 保持旧数据直到新数据加载完成，避免闪烁
  });

  /**
   * 更新搜索关键字
   * @param query 搜索词
   */
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * 更新选中的分类
   * @param category 分类名称
   */
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return {
    // 数据状态
    tools: tools || [],
    isLoading,
    isFetching,
    isError,
    error,
    
    // 搜索与过滤状态
    searchQuery,
    selectedCategory,
    
    // 操作方法
    setSearchQuery: handleSearchChange,
    setSelectedCategory: handleCategoryChange,
    refresh: refetch,
    
    // 派生状态
    isEmpty: !isLoading && (!tools || tools.length === 0),
  };
};
