import { Category } from "../../../../category/domain/entities/category";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import CategoryInMemoryRepository from "../../../infra/repository/category-in-memory.repository";
import UpdateCategoryUseCase from "../update-category.use-case";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id", name: "a" })).rejects.toThrow(
      new NotFoundError("Entity Not Found using ID: fake id")
    );
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Category({ name: "Movie" });
    repository.items = [entity];

    let output = await useCase.execute({ id: entity.id, name: "test" });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "test2",
      description: "test description",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test2",
      description: "test description",
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "test",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(3);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActive",
      isActive: false,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(4);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActive",
      description: null,
      isActive: false,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActive",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(5);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActive",
      description: null,
      isActive: false,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActiveTrue",
      isActive: true,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(6);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActiveTrue",
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActiveTrue",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(7);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActiveTrue",
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActiveTrue",
      isActive: false,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(8);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActiveTrue",
      description: null,
      isActive: false,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActiveTrue2",
      description: "aaaaaaaaaaaa",
      isActive: true,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(9);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActiveTrue2",
      description: "aaaaaaaaaaaa",
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      id: entity.id,
      name: "testIsActiveTrue3",
      description: "bbbb",
      isActive: false,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(10);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "testIsActiveTrue3",
      description: "bbbb",
      isActive: false,
      createdAt: entity.createdAt,
    });
  });
});
