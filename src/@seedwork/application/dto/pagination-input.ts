import { SearchResult } from "../../domain/repository/repository-contracts";

export type PaginationOutputDto<Items = any> = {
  items: Items[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
};

export class PaginationOutputMapper {
  static toOutput(result: SearchResult): Omit<PaginationOutputDto, "items"> {
    return {
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    };
  }
}
