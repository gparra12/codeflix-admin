import { Category } from "../../../category/domain/entities/category";
import { CategoryOutputMapper } from "./category-output";

describe("CategoryOutputMapper Unit Tests", () => {
  it("should convert a category in output", () => {
    const createdAt = new Date();
    const entity = new Category({
      name: "movie",
      description: "some description",
      isActive: true,
      createdAt,
    });

    const spyToJson = jest.spyOn(entity, "toJSON");
    const output = CategoryOutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: "movie",
      description: "some description",
      isActive: true,
      createdAt,
    });
  });
});
