class Num1 extends Number {
  static test = (a: number) => typeof a.valueOf() === "number";
  static example = 1;

  constructor(value: number) {
    if (Num1.test(value)) {
      super(value);
    } else {
      throw new TypeError(`Expected ${Num1.name} e.g. ${Num1.example}
Received ${value}`);
    }
  }

  toThePowerOf(a: number) {
    return this.valueOf() ** a;
  }
}

const logNumber = (a: Num1) => console.log(a);

// logNumber(1);

// logNumber(new Num1(1));

// console.log(typeof new Num1(1));

// console.log(new Num1(1).toThePowerOf(2));
