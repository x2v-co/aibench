export const ROUTE_PATHS = {
  HOME: '/',
  CATEGORY: '/category/:slug',
  TOOL_DETAIL: '/tool/:id',
  SEARCH: '/search',
  ABOUT: '/about',
  SUBMIT: '/submit',
  COLLECTIONS: '/collections',
  USER_GUIDE: '/user-guide',
  PRIVACY_POLICY: '/privacy',
  TERMS_OF_SERVICE: '/terms',
} as const;

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];