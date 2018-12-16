import * as Chance from "chance";

const chance = new Chance();

class Int extends Number {
  static test = (a: number) => a === Math.round(a);
  static generate = () => chance.integer();
  static toInt = (a: number) => Math.round(a);

  constructor(a: number) {
    if (Int.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${Int.name} e.g. '${Int.generate()}'
Received '${a}'`);
    }
  }

  // a way for the compiler to differentiate between Int and Dec
  // there is an issue when implementing a class with private or protected properties
  _Int() {}
}

class Dec extends Number {
  static test = (a: number) => !Int.test(a);
  static generate = () => chance.floating();
  static toDecimal = (a: string) => parseFloat(a);

  constructor(a: number) {
    if (Dec.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${Dec.name} e.g. '${Dec.generate()}'
Received '${a}'`);
    }
  }

  _Decimal() {}
}

class Pos extends Number {
  static test = (a: number) => Math.sign(a) > 0;
  static generate = () => chance.natural();
  static toPos = (a: number) => Math.abs(a);

  constructor(a: number) {
    if (Pos.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${Pos.name} e.g. '${Pos.generate()}'
Received '${a}'`);
    }
  }

  _Pos() {}
}

class Neg extends Number {
  static test = (a: number) => !Pos.test(a);
  static generate = () => -chance.natural();
  static toNeg = (a: number) => -Math.abs(a);

  constructor(a: number) {
    if (Neg.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${Neg.name} e.g. '${Neg.generate()}'
Received '${a}'`);
    }
  }

  _Neg() {}
}

// ==============================

// Union

// ==============================

type Num = Int | Dec;

// ==============================

// Intersection

// ==============================

// type PosInt = Int & Pos

// ==============================

class PosInt extends Int implements Pos {
  static test = (a: number) => Int.test(a) && Pos.test(a);
  static generate = () => chance.natural();
  static toPosInt = (a: number) => Pos.toPos(Int.toInt(a));

  constructor(a: number) {
    if (PosInt.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${PosInt.name} e.g. '${PosInt.generate()}'
Received '${a}'`);
    }
  }

  _Pos() {}

  _PosInt() {}
}

// ==============================

// Difference

// ==============================

class NegInt extends Int implements Neg {
  static test = (a: number) => Int.test(a) && !Pos.test(a);
  static generate = () => -chance.natural();
  static toNegInt = (a: number) => Neg.toNeg(Int.toInt(a));

  constructor(a: number) {
    if (NegInt.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${NegInt.name} e.g. '${NegInt.generate()}'
Received '${a}'`);
    }
  }

  _Neg() {}

  _NegInt() {}
}

// ==============================

// Exclusion

// ==============================

class NegDecOrPosInt extends Number implements Dec, Pos, Neg {
  static test = (a: number) =>
    (Dec.test(a) || Pos.test(a)) && !(Dec.test(a) && Pos.test(a));
  static generate = () => [chance.natural(), -Math.abs(chance.floating())];

  constructor(a: number) {
    if (NegDecOrPosInt.test(a)) {
      super(a);
    } else {
      throw new TypeError(`Expected ${
        NegDecOrPosInt.name
      } e.g. '${NegDecOrPosInt.generate()}
Received '${a}'`);
    }
  }

  _Decimal() {}

  _Pos() {}

  _Neg() {}

  _NegDecOrPosInt() {}
}

// ==============================

// Combination

// ==============================

class Address extends Array {
  generate = () => [chance.street(), chance.natural({ min: 1, max: 100 })];

  constructor(street: string, number: Int) {
    // @ts-ignore
    super(street, number);
  }
}

type IAddress = Array<string | Int>;

// ==============================

// Division

// ==============================

// ==============================

export {
  Int,
  Dec,
  Pos,
  Neg,
  Num,
  PosInt,
  NegInt,
  NegDecOrPosInt,
  Address,
  IAddress
};
