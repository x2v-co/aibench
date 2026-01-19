export type PricingType = '免费' | '付费' | '免费增值' | '按量计费';

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description?: string;
}

export type ToolTag = string;

export interface AITool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  iconUrl: string;
  websiteUrl: string;
  categoryId: string;
  tags: ToolTag[];
  pricing: PricingType;
  rating: number;
  visitCount: number;
  isFeatured: boolean;
  createdAt: string;
}