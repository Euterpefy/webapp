export interface PagedResponse<T> {
  href: string;
  limit: number;
  next?: string;
  previous?: string;
  offset: number;
  total: number;
  items: T[];
}
