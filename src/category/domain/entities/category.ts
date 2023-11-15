import Entity from "../../../shared/domain/entity/entity";
import UniqueEntityId from "../../../shared/domain/value-objects/unique-entity-id.vo";

export type CategoryProperties = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);

    this.description = this.props.description;
    this.isActive = this.props.isActive;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(name: string, description?: string): void {
    this.name = name;
    this.description = description;
  }

  activate() {
    this.props.isActive = true;
  }

  deactivate() {
    this.props.isActive = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get isActive(): boolean | undefined {
    return this.props.isActive;
  }

  private set isActive(value: boolean) {
    this.props.isActive = value ?? true;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }
}
