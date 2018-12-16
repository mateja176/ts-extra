import {
  Int,
  Dec,
  Pos,
  Neg,
  PosInt,
  NegInt,
  NegDecOrPosInt,
  Address
} from "./numbers";

describe("custom types derived from number", () => {
  test("Int", () => {
    expect(new Int(1));
  });
  test("Dec", () => {
    expect(new Dec(1.1));
  });
  test("Pos", () => {
    expect(new Pos(1));
  });
  test("Neg", () => {
    expect(new Neg(-1));
  });
  test("PosInt", () => {
    expect(new PosInt(1));
  });
  test("NegInt", () => {
    expect(new NegInt(-1));
  });
  test("NegDecOrPosInt", () => {
    expect(new NegDecOrPosInt(-1.1));
    expect(new NegDecOrPosInt(1));
  });
  test("Address", () => {
    expect(new Address("Prince Leo's", new Int(3)));
  });
});
