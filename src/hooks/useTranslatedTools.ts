import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { aiTools as baseAiTools, toolCategories as baseToolCategories } from '@/data/tools';
import { AITool, ToolCategory } from '@/types/tools';

/**
 * Hook to get translated tool data
 * Tool names stay in English, descriptions are translated
 */
export const useTranslatedTools = (): {
  aiTools: AITool[];
  toolCategories: ToolCategory[];
} => {
  const { t } = useTranslation('tools');
  const { t: catT } = useTranslation('categories');

  const translatedAiTools = useMemo(() => {
    return baseAiTools.map((tool) => {
      const translation = t(tool.id, { returnObjects: true }) as {
        name?: string;
        description?: string;
        longDescription?: string;
      };

      return {
        ...tool,
        // Tool names stay in English, only translate descriptions
        description: translation?.description || tool.description,
        longDescription: translation?.longDescription || tool.longDescription,
      };
    });
  }, [t]);

  const translatedToolCategories = useMemo(() => {
    return baseToolCategories.map((category) => ({
      ...category,
      name: catT(`categories.${category.id}.name`, category.name),
      description: catT(`categories.${category.id}.description`, category.description),
    }));
  }, [catT]);

  return {
    aiTools: translatedAiTools,
    toolCategories: translatedToolCategories,
  };
};

export default useTranslatedTools;
