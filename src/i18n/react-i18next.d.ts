import 'react-i18next';
import common from './locales/en/common.json';
import index from './locales/en/index.json';
import about from './locales/en/about.json';
import collections from './locales/en/collections.json';
import toolDetail from './locales/en/tool-detail.json';
import header from './locales/en/header.json';
import footer from './locales/en/footer.json';
import hero from './locales/en/hero.json';
import search from './locales/en/search.json';
import categories from './locales/en/categories.json';
import featured from './locales/en/featured.json';
import tools from './locales/en/tools.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof common;
      index: typeof index;
      about: typeof about;
      collections: typeof collections;
      toolDetail: typeof toolDetail;
      header: typeof header;
      footer: typeof footer;
      hero: typeof hero;
      search: typeof search;
      categories: typeof categories;
      featured: typeof featured;
      tools: typeof tools;
    };
    defaultNS: 'common';
    ns: 'common' | 'index' | 'about' | 'collections' | 'toolDetail' | 'header' | 'footer' | 'hero' | 'search' | 'categories' | 'featured' | 'tools';
  }
}
