import { product } from "./product";

export function getMeta(model) {
  const lib = { product };
  return lib[model] || null;
}
