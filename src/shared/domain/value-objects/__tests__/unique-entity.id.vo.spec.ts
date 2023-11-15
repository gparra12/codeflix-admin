import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueEntityId Unit Test", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "d9cf1d21-4753-4146-8f32-12b1cbb1d5f2";
    expect(() => new UniqueEntityId(uuid)).not.toThrow(new InvalidUuidError());
    expect(new UniqueEntityId(uuid).value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    expect(() => new UniqueEntityId()).not.toThrow(new InvalidUuidError());
    expect(uuidValidate(new UniqueEntityId().value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
