import CategoryRepository from "../../category/domain/repository/category.repository";
import { Category } from "../../category/domain/entities/category";
import { InMemorySearchableRepository } from "../../shared/domain/repository/in-memory-repository";
import { SortDirection } from "shared/domain/repository/repository-contracts";
export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "createdAt"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((it) => {
      return it.props.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string | null,
    sortDir: SortDirection | null
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, "createdAt", "desc")
      : super.applySort(items, sort, sortDir);
  }
}
