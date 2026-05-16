export type ToolCategory = '开发' | '图片' | '文本处理' | '安全' | '其他';

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  seoTitle: string;
  seoDesc: string;
  keywords: string[];
}
