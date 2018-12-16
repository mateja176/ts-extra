const check = <A, B>(f: (a: A) => B) => (a: A) => {
  expect(f(a));
};

export default check;
