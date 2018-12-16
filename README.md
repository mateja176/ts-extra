# Typescript Extra

## TODO

- [x] Add random generators
- [ ] Add helpers for
  - [ ] testing
  - [x] utilities like `range`
  - [ ] type arithmetic
- [ ] Add string derivatives
- [ ] Add async validation
  - validator function returns a Promise which is awaited
  - Example unique username

## Benefits

- benefits of schema validation combined with static analysis
  - analyze code an build time using typescript and vscode
- unlimited free fuzz testing
  - the value which the fuzz tests provide is proportional to the specificity of your types
- comparing functions

```typescript
// any f where f is
type f = (email: Email) => Username
// is approximately equal to g where g is
type g = (email: Email) => Username
// f ~ g
```

## Contents

- [Basic Usage](#basic-usage)
- [Making Types](#making-types)
- [Type Arithmetic](#type-arithmetic)
- [Testing](#testing)
- [Naming Convention](#naming-convention)
- [Aliases](#aliases)
- [Conditionals](#conditionals)

## Basic Usage

```typescript
import { Num, Pos } from "category"

const getAbsoluteValue = (a: Number) => {
  return Pos(a) ? a : -a
}
```

## Built-ins

### Number

```typescript
Int
Int.Pos
Int.Neg

Dec
Dec.Pos
Dec.Neg

Pos
PosInt
PosDecimal

Neg
NegInt
NegDecimal
```

### String

```typescript
Email
Password
Name
Age
Address
City
Country
Url
CreditCardNumber
BankAccountNumber
DrivingLicenceNumber
HealthInsuranceNumber
```

## Making Types

### Import

#### Named import

```typescript
import te from "typescript-extra"
```

#### Or import just what you need

```typescript
import { Int } from "typescript-extra"
```

### Empty category

```typescript
void
```

### Single Element

```typescript
type One = 1
```

### Collection

```typescript
const OneToFive = 1 | 2 | 3 | 4 | 5
```

### Range

```typescript
import { range } from "typescript-extra"
import * as Chance from "chance"

const chance = new Chance()

class OneToHundred extends te.Int {
  static test = (a: Int) => range(1, 100).includes(a)
  static generate = () => chance.integer({ min: 1, max: 100 })

  constructor(a: Int) {
    if (OneToHundred.test(a)) {
    } else {
      throw new TypeError(`Expected ${
        OneToHundred.name
      } e.g. ${OneToHundred.generate()}
Received ${a}`)
    }
  }
}
```

## Type Arithmetic

### Union

```typescript
const Num = Int | Decimal
```

### Difference

```typescript
import { Int, Pos } from "typescript-extra"

const NegInt = (a: number) => Int.test(a) && !Pos.test(a)
```

### Intersection

```typescript
import { Int, Pos } from "typescript-extra"

const PosInt = (a: number) => Int.test(a) && Pos.test(a)
```

### Exclusion

```typescript
import { Decimal, Int, Pos } from "typescript-extra"

const NegDecAndPosInt = (a: number) =>
  (Decimal.test(a) || Pos.test(a)) && !(Decimal.test(a) && Pos.test(a))
```

### Combination

```typescript
// making StreetName and StreetNumber is suggested
import { Int } from "typescript-extra"

type IAddress = Array<string, Int>
```

### Division

#### Not possible due to typescript limitations

#### Overview

```typescript
import { divide } from "typescript-extra"

const [Int, Decimal] = divide(Number, a => a === Math.round(a))
```

```typescript
import { divide, range } from "typescript-extra"

const [Prime, NonPrime] = divide(Int, a => range(2¸ Math.sqrt(a)).all(b => a % b))
```

## Testing

---

[example](https://github.com/mytee306/typescript-extra/blob/master/src/utils/check.test.ts)

---

## Naming Convention

Int.Pos with an alias PosInt

## Aliases

```typescript
import Int from "./Int"

const PosInt = Int.Pos

export default PosInt
```

## Conditionals

### If Else

```typescript
import { Pos } from "typescript-extra"

if (Pos(a)) {
  return a
} else {
  return -a
}
```

### Switch

```typescript
import { Pos } from "typescript-extra"

switch (Pos(a)) {
  case true:
    return a

  default:
    return -a
}
```

### Switch True

```typescript
import { Pos } from "typescript-extra"

switch (true) {
  case Pos(a):
    return a

  default:
    return -a
}
```

### Ternary

```typescript
import { Pos } from "typescript-extra"

return Pos(a) ? a : -a
```

### If

```typescript
import { Pos } from "typescript-extra"

if Pos(a) {
  return a
}

return -a
```
