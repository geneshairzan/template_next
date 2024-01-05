import { product } from "./product";
import { project } from "./project";
import { projectfeedback } from "./projectfeedback";
import { projectreference } from "./projectreference";
import { subcategory } from "./subcategory";
import { projecttask } from "./projecttask";
import { status } from "./status";
import { family } from "./family";
import { device } from "./device";
import { room } from "./room";

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
      return null;
  }
}

export function getInfo(model, target) {
  const lib = {
    product,
    project,
    projectreference,
    subcategory,
    projectfeedback,
    projecttask,
    status,
    family,
    device,
    room,
  };

  return target ? lib?.[model]?.[target] || getDefault(target) : lib?.[model];
}
