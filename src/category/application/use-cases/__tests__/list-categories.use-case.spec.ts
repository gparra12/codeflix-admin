import { Category } from "../../../../category/domain/entities/category";
import CategoryRepository from "../../../../category/domain/repository/category.repository";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import ListCategoriesUseCase from "../list-categories.use-case";

describe("ListCategoriesUseCase Unit Tests", () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  test("toOutput method", () => {
    let result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = useCase["toOutput"](result);
    expect(output).toEqual({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    });

    const entity = new Category({ name: "movie" });
    result = new CategoryRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = useCase["toOutput"](result);
    expect(output).toEqual({
      items: [entity.toJSON()],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
    });
  });

  it("should returns output using empty input with categories ordered by createdAt", async () => {
    const items = [
      new Category({ name: "movie" }),
      new Category({
        name: "tv",
        createdAt: new Date(new Date().getTime() + 100),
      }),
    ];

    repository.items = items;

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...items].reverse().map((it) => it.toJSON()),
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const items = [
      new Category({ name: "a" }),
      new Category({
        name: "AAA",
        createdAt: new Date(new Date().getTime() + 100),
      }),
      new Category({
        name: "AaA",
        createdAt: new Date(new Date().getTime() + 100),
      }),
      new Category({
        name: "b",
        createdAt: new Date(new Date().getTime() + 100),
      }),
      new Category({
        name: "c",
        createdAt: new Date(new Date().getTime() + 100),
      }),
    ];

    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      perPage: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 2,
      perPage: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 1,
      perPage: 2,
      sort: "name",
      filter: "a",
      sortDir: "desc",
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2,
    });

    output = await useCase.execute({
      page: 2,
      perPage: 2,
      sort: "name",
      filter: "a",
      sortDir: "desc",
    });
    expect(output).toStrictEqual({
      items: [items[1].toJSON()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2,
    });
  });
});
