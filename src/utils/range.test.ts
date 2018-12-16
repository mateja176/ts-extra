import range from "./range";
import { Int } from "../numbers";

test("it should return an array with number ranging from the first to second specified parameter", () => {
  expect(range(new Int(1))(new Int(5))).toEqual([1, 2, 3, 4]);
});
