import CategoryRepository from "../../category/domain/repository/category.repository";
import { Category } from "../../category/domain/entities/category";
import { InMemorySearchableRepository } from "../../shared/domain/repository/in-memory-repository";

export default class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository
{
  constructor() {
    super();
    this.items = [];
  }
}
