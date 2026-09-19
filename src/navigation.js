import { ANTIBIOTICS, MECHANISMS, ORGANISMS } from "./catalog.js";
import { isAuditedScenario } from "./rules.js";

// Una ruta ausente permite la vista inicial; una ruta solicitada e inválida no.
export function readSharedScenario(params) {
  const dimensions = ["germ", "focus", "severity"];
  if (!dimensions.some((key) => params.has(key))) return { status: "absent", input: null };
  const input = Object.fromEntries(dimensions.map((key) => [key, params.get(key)]));
  const complete = dimensions.every((key) => params.getAll(key).length === 1);
  // La antigua ruta conjunta solo tenía una salida específica: Listeria en SNC.
  if (complete && input.germ === "enterolisteria" && input.focus === "snc") input.germ = "listeria";
  const query = new URLSearchParams([...params].filter(([key]) => dimensions.includes(key))).toString();
  return { status: complete && isAuditedScenario(input) ? "valid" : "unavailable", input, query };
}

export function findDetailItem(type, id) {
  const collections = { organism: ORGANISMS, antibiotic: ANTIBIOTICS, mechanism: MECHANISMS };
  if (!Object.hasOwn(collections, type)) return null;
  return collections[type].find((item) => item.id === id) ?? null;
}
