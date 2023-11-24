import CategoryInMemoryRepository from "../../../../category/infra/repository/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.use-case";

describe("CreateCategoryUseCase Unit Tests", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it("should create a category", async () => {
    const spyInsert = jest.spyOn(repository, "insert");

    let output = await useCase.execute({ name: "test" });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test",
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "test description",
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "test",
      description: "test description",
      isActive: true,
      createdAt: repository.items[1].createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "test description",
      isActive: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(3);
    expect(output).toStrictEqual({
      id: repository.items[2].id,
      name: "test",
      description: "test description",
      isActive: false,
      createdAt: repository.items[2].createdAt,
    });

    output = await useCase.execute({
      name: "test",
      isActive: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(4);
    expect(output).toStrictEqual({
      id: repository.items[3].id,
      name: "test",
      description: null,
      isActive: false,
      createdAt: repository.items[3].createdAt,
    });
  });
});
