import * as Chance from "chance";
import check from "./check";
import { Int } from "../numbers";

const chance = new Chance();

test("it should validate integers", () => {
  chance
    .n(chance.integer, 10)
    .forEach(a => check((a: number) => new Int(a))(a));
});
