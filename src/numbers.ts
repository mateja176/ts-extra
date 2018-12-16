class Int extends Number {
  static test = (a: number) => a === Math.round(a);
  static example = 1;
  static toInt = (a: number) => Math.round(a);

  constructor(value: number) {
    if (Int.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${Int.name} e.g. ${Int.example}
Received ${value}`);
    }
  }

  // a way for the compiler to differentiate between Int and Dec
  // there is an issue when implementing a class with private or protected properties
  _int() {}
}

class Dec extends Number {
  static test = (a: number) => !Int.test(a);
  static example = 1.1;
  static toDecimal = (a: string) => parseFloat(a);

  constructor(value: number) {
    if (Dec.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${Dec.name} e.g. ${Dec.example}
Received ${value}`);
    }
  }

  _decimal() {}
}

class Pos extends Number {
  static test = (a: number) => Math.sign(a) > 0;
  static example = 1;
  static toPos = (a: number) => Math.abs(a);

  constructor(value: number) {
    if (Pos.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${Pos.name} e.g. ${Pos.example}
Received ${value}`);
    }
  }

  _pos() {}
}

class Neg extends Number {
  static test = (a: number) => !Pos.test(a);
  static example = -1;
  static toNeg = (a: number) => -Math.abs(a);

  constructor(value: number) {
    if (Neg.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${Neg.name} e.g. ${Neg.example}
Received ${value}`);
    }
  }

  _neg() {}
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
  static example = 1;
  static toPosInt = (a: number) => Pos.toPos(Int.toInt(a));

  constructor(value: number) {
    if (PosInt.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${PosInt.name} e.g. ${PosInt.example}
Received ${value}`);
    }
  }

  _pos() {}

  _posInt() {}
}

// ==============================

// Difference

// ==============================

class NegInt extends Int implements Neg {
  static test = (a: number) => Int.test(a) && !Pos.test(a);
  static example = -1;
  static toNegInt = (a: number) => Neg.toNeg(Int.toInt(a));

  constructor(value: number) {
    if (NegInt.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${NegInt.name} e.g. ${NegInt.example}
Received ${value}`);
    }
  }

  _neg() {}

  _negInt() {}
}

// ==============================

// Exclusion

// ==============================

class NegDecOrPosInt extends Number implements Dec, Pos, Neg {
  static test = (a: number) =>
    (Dec.test(a) || Pos.test(a)) && !(Dec.test(a) && Pos.test(a));
  static example = [1, -1.1];

  constructor(value: number) {
    if (NegDecOrPosInt.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${NegDecOrPosInt.name} e.g. ${
        NegDecOrPosInt.example
      }
Received ${value}`);
    }
  }

  _decimal() {}

  _pos() {}

  _neg() {}

  _negDecOrPosInt() {}
}

// ==============================

// Combination

// ==============================

class Address extends Array {
  static streetTest = (street: string) => typeof street === "string";
  static numberTest = Int.test;

  static streetExample = "Saint John's";
  static numberExample = 28;

  constructor(street: string, number: Int) {
    // @ts-ignore
    super(street, number);
  }
}

type IAddress = Array<string | Int>;

// ==============================

// Division

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
