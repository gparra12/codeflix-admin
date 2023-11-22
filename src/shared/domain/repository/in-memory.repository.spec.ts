import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "./in-memory-repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });
  it("should inserts a new entity", async () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID: fake id`)
    );
    expect(
      repository.findById(
        new UniqueEntityId("d9cf1d21-4753-4146-8f32-12b1cbb1d5f2")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID: d9cf1d21-4753-4146-8f32-12b1cbb1d5f2`
      )
    );
  });

  it("should finds a entity by id", async () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    await repository.insert(entity);

    let entityFounded = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFounded.toJSON());

    entityFounded = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFounded.toJSON());
  });

  it("should returns all entities", async () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities.length).toBe(1);
    expect(entities[0].toJSON()).toStrictEqual(entity.toJSON());
    expect(entities).toStrictEqual([entity]);

    await repository.insert(entity);
    expect(entities).toStrictEqual([entity, entity]);
  });

  it("should throws error on update when entity not found", () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID: ${entity.id}`)
    );
  });

  it("should updates an entity", async () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    await repository.insert(entity);

    const updatedEntity = new StubEntity(
      {
        name: "<NAME>",
        price: 200,
      },
      entity.uniqueEntityId
    );

    await repository.update(updatedEntity);

    expect(updatedEntity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    expect(repository.delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID: ${entity.id}`)
    );

    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID: fake id`)
    );
  });

  it("should deletes an entity", async () => {
    const entity = new StubEntity({
      name: "<NAME>",
      price: 100,
    });
    await repository.insert(entity);
    await repository.delete(entity.id);

    expect(repository.items.length).toBe(0);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);

    expect(repository.items.length).toBe(0);
    expect(repository.items).toHaveLength(0);
  });
});
