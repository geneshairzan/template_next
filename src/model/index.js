import { product } from "./product";
import { project } from "./project";

const default_col = [
  { name: "name", label: "Name", w: 220 },
  { name: "desc", label: "Description", w: "auto" },
];

const default_datamap = (d) => {
  return {
    ...d,
  };
};

function getDefault(target) {
  switch (target) {
    case "datamap":
      return default_datamap;
    case "col":
      return default_col;
    case "includes":
      return {};
    default:
      return {};
  }
}

export function getInfo(model, target = "schema") {
  const lib = { product, project };
  return lib?.[model]?.[target] || getDefault(target);
}
