export interface Paginated {
  take: number;
  page: number;
  orderBy?: string;
  order: "ASC" | "DESC";
}
