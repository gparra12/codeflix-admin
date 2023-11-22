import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    const index = await this._getIndex(entity.id);
    this.items[index] = entity;
  }
  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    const index = await this._getIndex(_id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((it) => it.id === id);

    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID: ${id}`);
    }
    return item;
  }

  protected async _getIndex(id: string): Promise<number> {
    const index = this.items.findIndex((it) => it.id === id);
    if (index < 0) {
      throw new NotFoundError(`Entity Not Found using ID: ${id}`);
    }

    return index;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
