import { SortDirection } from "../../domain/repository/repository-contracts";

export type SearchInputDto<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};
