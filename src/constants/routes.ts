export const ROUTE_PATHS = {
  HOME: '/',
  CATEGORY: '/category/:slug',
  TOOL_DETAIL: '/tool/:id',
  SEARCH: '/search',
  ABOUT: '/about',
  SUBMIT: '/submit',
  COLLECTIONS: '/collections',
} as const;

export type RoutePath = typeof ROUTE_PATHS[keyof typeof ROUTE_PATHS];