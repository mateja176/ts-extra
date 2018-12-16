# Dynamically generated classes

## Throw in constructor

## Edit class name after creation

## Edit constructor after class creation

```typescript
const newType = <A>(BaseClass: any) => (validate: (a: A) => boolean) => (
  generate: () => A,
) => {
  BaseClass.test = validate
  BaseClass.generate = generate
  BaseClass.constructor = function(a: A) {
    if (BaseClass.test(a)) {
      // super cannot be called outside the constructor
      super(a)
    } else {
      throw new TypeError(
        `Expected ${BaseClass.name} e.g. ${BaseClass.generate()}
Received ${a}`,
      )
    }
  }
  return BaseClass
}

const Str = newType<string>(class Str extends String {})(_ => false)(() => "")

console.log(new Str("abc"))
```

## Private constructor

- If the constructor is protected someone could extends the class just to get access to the constructor

```typescript
class Str extends String {
  static create(a: string) {
    if (BaseClass.test(a)) {
      return new Str(a)
    } else {
      throw new TypeError(
        `Expected ${BaseClass.name} e.g. ${BaseClass.generate()}
Received ${a}`,
      )
    }
  }

  private constructor(a: string) {
    super(a)
  }
}

// @ts-ignore
// Str.create = (a: string) => new Str(a);

console.log(Str.create("a"))
```
