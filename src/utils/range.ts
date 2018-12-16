import { Int } from "../numbers";

const range = (from: Int) => (to: Int) =>
  Array.from(Array(<any>to - <any>from).keys()).map(item => item + <any>from);

export default range;
