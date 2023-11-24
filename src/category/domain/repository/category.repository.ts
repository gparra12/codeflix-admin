import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultResultParams,
  SearchableRepositoryInterface,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { Category } from "../entities/category";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultResultParams<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CategoryRepository;
