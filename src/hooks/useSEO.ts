import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultSEO = {
  title: 'AIBench - AI工具导航 | 发现全球最优质的人工智能工具',
  description: 'AIBench是专业的AI工具导航平台，收录60+优质AI工具，涵盖ChatGPT、Midjourney、Claude等热门应用。提供AI写作、图像生成、视频创作、编程开发等10大分类，助您发现最适合的AI解决方案。',
  keywords: 'AI工具,人工智能,ChatGPT,Midjourney,Claude,AI写作,AI绘画,AI视频,AI编程,AI导航,AIBench',
  image: 'https://aibench.top/og-image.png',
  url: 'https://aibench.top',
  type: 'website',
};

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type,
}: SEOProps = {}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update title
    const fullTitle = title ? `${title} | AIBench` : defaultSEO.title;
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description || defaultSEO.description);
    updateMeta('keywords', keywords || defaultSEO.keywords);

    // Open Graph tags with locale
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description || defaultSEO.description, true);
    updateMeta('og:image', image || defaultSEO.image, true);
    updateMeta('og:url', url || defaultSEO.url, true);
    updateMeta('og:type', type || defaultSEO.type, true);
    updateMeta('og:locale', currentLang === 'zh' ? 'zh_CN' : `${currentLang}_${currentLang.toUpperCase()}`, true);

    // Twitter tags
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description || defaultSEO.description);
    updateMeta('twitter:image', image || defaultSEO.image);

    // Cleanup function to reset to defaults when component unmounts
    return () => {
      document.title = defaultSEO.title;
      document.documentElement.lang = 'en';
    };
  }, [title, description, keywords, image, url, type, currentLang]);
};

export default useSEO;
