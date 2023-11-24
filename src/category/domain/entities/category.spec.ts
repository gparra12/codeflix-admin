import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Unit Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "test" });
    let props = omit(category.props, "createdAt");
    expect(props).toStrictEqual({
      name: "test",
      description: null,
      isActive: true,
    });
    expect(category.props.createdAt).toBeInstanceOf(Date);
    let createdAt = new Date();
    category = new Category({
      name: "test",
      description: "some description",
      isActive: false,
      createdAt,
    });
    expect(category.props).toStrictEqual({
      name: "test",
      description: "some description",
      isActive: false,
      createdAt,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      isActive: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      isActive: true,
    });

    createdAt = new Date();
    category = new Category({
      name: "Movie",
      createdAt,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      createdAt,
    });
  });

  test("getter of id prop", () => {
    const id = new UniqueEntityId();
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "test" } },
      { props: { name: "test" }, id: null },
      { props: { name: "test" }, id: undefined },
      { props: { name: "test" }, id: id },
    ];

    data.forEach((it) => {
      const category = new Category(it.props, it.id);
      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of name prop", () => {
    const category = new Category({ name: "test" });
    expect(category.name).toBe("test");

    category["description"] = "other name";
    expect(category.description).toBe("other name");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({ name: "test" });
    expect(category.description).toBeNull();

    category = new Category({ name: "test", description: "some description" });
    expect(category.description).toBe("some description");

    category = new Category({ name: "test" });
    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("getter and setter of isActive prop", () => {
    let category = new Category({ name: "test" });
    expect(category.isActive).toBeTruthy();

    category["isActive"] = false;
    expect(category.isActive).toBeFalsy();

    category = new Category({ name: "test", isActive: true });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "test", isActive: false });
    expect(category.isActive).toBeFalsy();
  });

  test("getter of createdAt prop", () => {
    let category = new Category({ name: "test" });
    expect(category.createdAt).toBeInstanceOf(Date);

    const createdAt = new Date();
    category = new Category({ name: "test", createdAt });
    expect(category.createdAt).toBe(createdAt);
  });

  it("should update name and description", () => {
    let category = new Category({ name: "test", description: "aa" });
    category.update("test2", "some description");
    expect(category.name).toBe("test2");
    expect(category.description).toBe("some description");

    category = new Category({ name: "test", description: "aa" });
    category.update("test2");
    expect(category.name).toBe("test2");
    expect(category.description).toBeNull();

    category = new Category({ name: "test" });
    category.update("test2");
    expect(category.name).toBe("test2");
    expect(category.description).toBeNull();

    category = new Category({ name: "test" });
    category.update("test2", "some description");
    expect(category.name).toBe("test2");
    expect(category.description).toBe("some description");
  });

  it("should activate category", () => {
    let category = new Category({ name: "test", isActive: false });
    category.activate();
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "test", isActive: true });
    category.activate();
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "test" });
    category.activate();
    expect(category.isActive).toBeTruthy();
  });

  it("should deactivate category", () => {
    let category = new Category({ name: "test", isActive: false });
    category.deactivate();
    expect(category.isActive).toBeFalsy();

    category = new Category({ name: "test", isActive: true });
    category.deactivate();
    expect(category.isActive).toBeFalsy();

    category = new Category({ name: "test" });
    category.deactivate();
    expect(category.isActive).toBeFalsy();
  });
});
