export interface Paginated {
  take: number;
  page: number;
  categorizeBy?: string;
  order: "ASC" | "DESC";
}
