import { values } from "lodash";
import ValueObject from "../value-object";

class StubValueObjects extends ValueObject {}

describe("Value Objects Unit Tests", () => {
  it("should set value", () => {
    let vo = new StubValueObjects("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObjects({ prop: "a" });
    expect(vo.value).toStrictEqual({ prop: "a" });
  });

  it("should convert to a string", () => {
    const date = new Date();
    const arrange: { received: unknown; expected: string }[] = [
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: new Boolean(false), expected: "false" },
      { received: "", expected: "" },
      { received: "string", expected: "string" },
      { received: new String("string"), expected: "string" },
      { received: 123, expected: "123" },
      { received: 99, expected: "99" },
      { received: 5, expected: "5" },
      { received: new Number(5), expected: "5" },
      { received: date, expected: date.toString() },
      { received: { prop: "a" }, expected: JSON.stringify({ prop: "a" }) },
      {
        received: new Object({ prop: "a" }),
        expected: JSON.stringify({ prop: "a" }),
      },
    ];

    arrange.forEach((it) => {
      const vo = new StubValueObjects(it.received);
      expect(vo + "").toBe(it.expected);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value",
      deep: {
        prop2: "value2",
        prop3: new Date(),
      },
    };

    const vo = new StubValueObjects(obj);

    expect(() => {
      (vo as any).value.prop1 = "a";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (vo as any).value.deep.prop2 = "a";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect((vo as any).value.deep.prop3).toBeInstanceOf(Date);
  });
});
