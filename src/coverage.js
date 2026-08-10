export const COVERAGE_LEVELS = Object.freeze(["yes", "maybe", "no"]);

export const COVERAGE_TARGETS = Object.freeze([
  { id: "strep", label: "Strep" },
  { id: "sasm", label: "SASM" },
  { id: "sarm", label: "SARM" },
  { id: "efaecalis", label: "E. faecalis S" },
  { id: "listeria", label: "Listeria" },
  { id: "enterobacterales", label: "Enterobacterales no BLEE/AmpC" },
  { id: "blee", label: "BLEE" },
  { id: "pseudomonas", label: "P. aer." },
  { id: "anaerobes", label: "Anaerob." },
  { id: "atypicals", label: "Atíp." },
]);

export const COVERAGE = Object.freeze([
  coverage("amp-amox", "Ampicilina/amoxicilina", ["yes", "no", "no", "yes", "yes", "maybe", "no", "no", "maybe", "no"]),
  coverage("amoxclav", "Amox-clav", ["yes", "yes", "no", "yes", "maybe", "maybe", "no", "no", "yes", "no"]),
  coverage("cloxacilina", "Cloxacilina", ["maybe", "yes", "no", "no", "no", "no", "no", "no", "no", "no"], "cloxa-cefa"),
  coverage("piptazo", "Pip-tazo", ["yes", "yes", "no", "maybe", "no", "yes", "maybe", "yes", "yes", "no"]),
  coverage("cefazolina", "Cefazolina", ["yes", "yes", "no", "no", "no", "maybe", "no", "no", "no", "no"], "cloxa-cefa"),
  coverage("cefuroxime", "Cefuroxima", ["yes", "maybe", "no", "no", "no", "maybe", "no", "no", "no", "no"]),
  coverage("ceftriaxone", "Ceftriaxona/cefotaxima", ["yes", "maybe", "no", "no", "no", "yes", "no", "no", "no", "no"]),
  coverage("ceftazidime", "Ceftazidima", ["maybe", "no", "no", "no", "no", "yes", "no", "yes", "no", "no"]),
  coverage("cefepime", "Cefepime", ["yes", "maybe", "no", "no", "no", "yes", "no", "yes", "no", "no"]),
  coverage("aztreonam", "Aztreonam", ["no", "no", "no", "no", "no", "yes", "no", "yes", "no", "no"]),
  coverage("ertapenem", "Ertapenem", ["yes", "maybe", "no", "no", "no", "yes", "yes", "no", "yes", "no"]),
  coverage("mero-imi", "Meropenem/imipenem", ["yes", "maybe", "no", "no", "no", "yes", "yes", "yes", "yes", "no"]),
  coverage("anti-mrsa-ceph", "Ceftarolina", ["yes", "yes", "yes", "no", "no", "maybe", "no", "no", "no", "no"]),
]);

function coverage(id, label, values, catalogId = id) {
  return Object.freeze({
    id,
    catalogId,
    label,
    sourceIds: ["local-proa-fjd"],
    values: Object.freeze(
      Object.fromEntries(COVERAGE_TARGETS.map((target, index) => [target.id, values[index]])),
    ),
  });
}

export function coverageSymbol(level) {
  return level === "yes" ? "✓" : level === "maybe" ? "±" : "✗";
}
