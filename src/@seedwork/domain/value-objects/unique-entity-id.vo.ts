import InvalidUuidError from "../errors/invalid-uuid.error";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidv4());
    this.validate();
  }

  private validate(): void {
    const isValid: boolean = uuidValidate(this._value);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
