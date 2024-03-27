import type { Paginated } from "@app/shared/domain/types";

export interface findByTitleQuery {
  title: string;
}

export interface findAllQuery extends Paginated {
  title?: string;
  threshold?: number;
  actor?: string;
}
