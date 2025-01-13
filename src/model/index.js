import { user } from "./user";
import { status } from "./status";

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
    case "idType":
      return "int";
    default:
      return null;
  }
}

export function getInfo(model, target) {
  const lib = {
    status,
    user,
  };

  return target ? lib?.[model]?.[target] || getDefault(target) : lib?.[model];
}
