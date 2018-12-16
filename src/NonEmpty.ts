import * as Chance from "chance";

const chance = new Chance();

type HasLength = { length: number };

class NonEmpty extends Object {
  static test = (a: HasLength) => a.length;
  static example = [chance.string(), chance.n(chance.integer, 3)];

  constructor(a: HasLength) {
    if (NonEmpty.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${NonEmpty.name} e.g. ${NonEmpty.example}
Received ${a}`);
    }
  }

  _NonEmpty() {}
}

class NonEmptyString extends String {
  static test = (a: string) => NonEmpty.test(a);

  static generate = () => chance.string();

  constructor(a: string) {
    if (NonEmptyString.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${
        NonEmptyString.name
      } e.g. '${NonEmptyString.generate()}'
Received '${a}'`);
    }
  }

  _NonEmptyString() {}
}

class NonEmptyArray<A> extends Array {
  static test = <A>(a: Array<A>) => NonEmpty.test(a);

  static generate = () => chance.n(chance.integer, 3);

  constructor(a: Array<void>) {
    if (NonEmptyArray.test(a)) {
      super();
    } else {
      throw new TypeError(`Expected ${
        NonEmptyArray.name
      } e.g. '${NonEmptyArray.generate()}'
Received '${a}'`);
    }
  }

  _NonEmptyString() {}
}

export default NonEmpty;

export { NonEmptyString, NonEmptyArray };
