# Category

## TODO

1. How to make type classes like Pos extensible from the outside?

2. Single most efficient definitions for a type and aliases

## Contents

- [Basic Usage](#basic-usage)
- [Making Categories](#making-categories)
- [Conditionals](#conditionals)
- [Testing](#testing)
- [Naming Convention](#naming-convention)
- [Aliases](#aliases)
- [Parser](#parser-with-custom-syntax)

## Basic Usage

```javascript
import { Num, PosNum } from "category"

// getAbsoluteValue :: Number -> Number
const getAbsoluteValue = a => {
  Num(a).throws()

  return PosNum(a) ? a : -a
}
```

## Built-ins

### Basic

```javascript
Str
Num
Bool
Obj
Arr
Func
```

### Derivatives

#### Number

```javascript
Num.Pos
Num.Pos.Int
Num.Pos.Decimal

Num.Neg
Num.Neg.Int
Num.Neg.Decimal

Num.Int
Num.Int.Pos
Num.Int.Neg

Num.Decimal
Num.Decimal.Pos
Num.Decimal.Neg
```

#### String

```javascript
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

## Making Categories

### Import

```javascript
import Category from "category"
```

### Empty category

```javascript
const Void = Category.empty()
```

### Single Element

```javascript
const One = Category.from.element(1)
```

### Collection

```javascript
const OneToFive = Category.from.collection([1, 2, 3, 4, 5])
```

### Range

```javascript
const oneToFive = Category.from.range(1, 5)
```

### Rule

```javascript
const Empty = a => {
  if (Str.or(Arr)(a)) {
    return a.length
  } else {
    throw new TypeError(`Expected something whose length can be read e.g. [1, 2, 3]
Received ${a}`)
  }
}
```

### Union

```javascript
const Num = Int.or(Decimal)
```

### Difference

```javascript
const NegInt = Int.and(not(Pos))
```

### Intersection

```javascript
const PosInt = Int.and(Pos)
```

### Exclusion

```javascript
const NegDecAndPosInt = Decimal.exclude(PosNum)
const NegDecAndPosInt = Decimal.or(PosNum).and(not(Decimal.and(PosNum)))
```

### Combination

```javascript
// making StreetName and StreetNumber is suggested
const Address = Str.with(Int)
```

### Division

```javascript
const [Int, Decimal] = Number.divide(a => a === Math.round(a))
```

```javascript
const [Prime, NonPrime] = Int.divide(a => Category.from.range(2¸ Math.sqrt(a)).toArray().all(b => a % b))
```

## Conditionals

### If Else

```javascript
if (PosNum(a)) {
  return a
} else {
  return -a
}
```

### Switch

```javascript
switch (PosNum(a)) {
  case true:
    return a

  default:
    return -a
}
```

### Switch True

```javascript
switch (true) {
  case PosNum(a):
    return a

  default:
    return -a
}
```

### Ternary

```javascript
return PosNum(a) ? a : -a
```

### If

```javascript
if PosNum(a) {
  return a
}

return -a
```

## Testing

[Fuzz testing](https://repl.it/@mytee306/javascript-schema-validators-comparison)

## Naming Convention

### Scoping

```javascript
Int.Pos
```

### Standalone

```javascript
const Age = Category.Num.Int.Pos
```

## Aliases

```javascript
import Category from "../category"

export { ...Category, PosNum: Category.Num.Pos }
```

## Parser with custom syntax

```javascript
const IntOrDecimal = parse("Int | Decimal")
```
