import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from './locales/en/common.json';
import enIndex from './locales/en/index.json';
import enAbout from './locales/en/about.json';
import enCollections from './locales/en/collections.json';
import enToolDetail from './locales/en/tool-detail.json';
import enHeader from './locales/en/header.json';
import enFooter from './locales/en/footer.json';
import enHero from './locales/en/hero.json';
import enSearch from './locales/en/search.json';
import enCategories from './locales/en/categories.json';
import enFeatured from './locales/en/featured.json';
import enTools from './locales/en/tools.json';

// Import Chinese translations
import zhCommon from './locales/zh/common.json';
import zhIndex from './locales/zh/index.json';
import zhAbout from './locales/zh/about.json';
import zhCollections from './locales/zh/collections.json';
import zhToolDetail from './locales/zh/tool-detail.json';
import zhHeader from './locales/zh/header.json';
import zhFooter from './locales/zh/footer.json';
import zhHero from './locales/zh/hero.json';
import zhSearch from './locales/zh/search.json';
import zhCategories from './locales/zh/categories.json';
import zhFeatured from './locales/zh/featured.json';
import zhTools from './locales/zh/tools.json';

// Import German translations
import deCommon from './locales/de/common.json';
import deIndex from './locales/de/index.json';
import deAbout from './locales/de/about.json';
import deCollections from './locales/de/collections.json';
import deToolDetail from './locales/de/tool-detail.json';
import deHeader from './locales/de/header.json';
import deFooter from './locales/de/footer.json';
import deHero from './locales/de/hero.json';
import deSearch from './locales/de/search.json';
import deCategories from './locales/de/categories.json';
import deFeatured from './locales/de/featured.json';
import deTools from './locales/de/tools.json';

// Import Japanese translations
import jaCommon from './locales/ja/common.json';
import jaIndex from './locales/ja/index.json';
import jaAbout from './locales/ja/about.json';
import jaCollections from './locales/ja/collections.json';
import jaToolDetail from './locales/ja/tool-detail.json';
import jaHeader from './locales/ja/header.json';
import jaFooter from './locales/ja/footer.json';
import jaHero from './locales/ja/hero.json';
import jaSearch from './locales/ja/search.json';
import jaCategories from './locales/ja/categories.json';
import jaFeatured from './locales/ja/featured.json';
import jaTools from './locales/ja/tools.json';

// Import Spanish translations
import esCommon from './locales/es/common.json';
import esIndex from './locales/es/index.json';
import esAbout from './locales/es/about.json';
import esCollections from './locales/es/collections.json';
import esToolDetail from './locales/es/tool-detail.json';
import esHeader from './locales/es/header.json';
import esFooter from './locales/es/footer.json';
import esHero from './locales/es/hero.json';
import esSearch from './locales/es/search.json';
import esCategories from './locales/es/categories.json';
import esFeatured from './locales/es/featured.json';
import esTools from './locales/es/tools.json';

// Import French translations
import frCommon from './locales/fr/common.json';
import frIndex from './locales/fr/index.json';
import frAbout from './locales/fr/about.json';
import frCollections from './locales/fr/collections.json';
import frToolDetail from './locales/fr/tool-detail.json';
import frHeader from './locales/fr/header.json';
import frFooter from './locales/fr/footer.json';
import frHero from './locales/fr/hero.json';
import frSearch from './locales/fr/search.json';
import frCategories from './locales/fr/categories.json';
import frFeatured from './locales/fr/featured.json';
import frTools from './locales/fr/tools.json';

// Import Korean translations
import koCommon from './locales/ko/common.json';
import koIndex from './locales/ko/index.json';
import koAbout from './locales/ko/about.json';
import koCollections from './locales/ko/collections.json';
import koToolDetail from './locales/ko/tool-detail.json';
import koHeader from './locales/ko/header.json';
import koFooter from './locales/ko/footer.json';
import koHero from './locales/ko/hero.json';
import koSearch from './locales/ko/search.json';
import koCategories from './locales/ko/categories.json';
import koFeatured from './locales/ko/featured.json';
import koTools from './locales/ko/tools.json';

// Import Russian translations
import ruCommon from './locales/ru/common.json';
import ruIndex from './locales/ru/index.json';
import ruAbout from './locales/ru/about.json';
import ruCollections from './locales/ru/collections.json';
import ruToolDetail from './locales/ru/tool-detail.json';
import ruHeader from './locales/ru/header.json';
import ruFooter from './locales/ru/footer.json';
import ruHero from './locales/ru/hero.json';
import ruSearch from './locales/ru/search.json';
import ruCategories from './locales/ru/categories.json';
import ruFeatured from './locales/ru/featured.json';
import ruTools from './locales/ru/tools.json';

// Resources object
const resources = {
  en: {
    common: enCommon,
    index: enIndex,
    about: enAbout,
    collections: enCollections,
    toolDetail: enToolDetail,
    header: enHeader,
    footer: enFooter,
    hero: enHero,
    search: enSearch,
    categories: enCategories,
    featured: enFeatured,
    tools: enTools,
  },
  zh: {
    common: zhCommon,
    index: zhIndex,
    about: zhAbout,
    collections: zhCollections,
    toolDetail: zhToolDetail,
    header: zhHeader,
    footer: zhFooter,
    hero: zhHero,
    search: zhSearch,
    categories: zhCategories,
    featured: zhFeatured,
    tools: zhTools,
  },
  de: {
    common: deCommon,
    index: deIndex,
    about: deAbout,
    collections: deCollections,
    toolDetail: deToolDetail,
    header: deHeader,
    footer: deFooter,
    hero: deHero,
    search: deSearch,
    categories: deCategories,
    featured: deFeatured,
    tools: deTools,
  },
  ja: {
    common: jaCommon,
    index: jaIndex,
    about: jaAbout,
    collections: jaCollections,
    toolDetail: jaToolDetail,
    header: jaHeader,
    footer: jaFooter,
    hero: jaHero,
    search: jaSearch,
    categories: jaCategories,
    featured: jaFeatured,
    tools: jaTools,
  },
  es: {
    common: esCommon,
    index: esIndex,
    about: esAbout,
    collections: esCollections,
    toolDetail: esToolDetail,
    header: esHeader,
    footer: esFooter,
    hero: esHero,
    search: esSearch,
    categories: esCategories,
    featured: esFeatured,
    tools: esTools,
  },
  fr: {
    common: frCommon,
    index: frIndex,
    about: frAbout,
    collections: frCollections,
    toolDetail: frToolDetail,
    header: frHeader,
    footer: frFooter,
    hero: frHero,
    search: frSearch,
    categories: frCategories,
    featured: frFeatured,
    tools: frTools,
  },
  ko: {
    common: koCommon,
    index: koIndex,
    about: koAbout,
    collections: koCollections,
    toolDetail: koToolDetail,
    header: koHeader,
    footer: koFooter,
    hero: koHero,
    search: koSearch,
    categories: koCategories,
    featured: koFeatured,
    tools: koTools,
  },
  ru: {
    common: ruCommon,
    index: ruIndex,
    about: ruAbout,
    collections: ruCollections,
    toolDetail: ruToolDetail,
    header: ruHeader,
    footer: ruFooter,
    hero: ruHero,
    search: ruSearch,
    categories: ruCategories,
    featured: ruFeatured,
    tools: ruTools,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    defaultNS: 'common',
    ns: ['common', 'index', 'about', 'collections', 'toolDetail', 'header', 'footer', 'hero', 'search', 'categories', 'featured', 'tools'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
