export const COVERAGE_LEVELS = Object.freeze(["yes", "maybe", "no"]);

export const COVERAGE_TARGETS = Object.freeze([
  target("strep", "Strep", "Streptococcus spp."),
  target("sasm", "SASM", "Staphylococcus aureus sensible a meticilina"),
  target("sarm", "SARM", "Staphylococcus aureus resistente a meticilina"),
  target("efaecalis", "E. faecalis S", "Enterococcus faecalis sensible"),
  target("listeria", "Listeria", "Listeria monocytogenes"),
  target("enterobacterales", "Enterobact.", "Enterobacterales sin BLEE ni AmpC"),
  target("blee", "BLEE", "Enterobacterales productores de BLEE"),
  target("pseudomonas", "P. aer.", "Pseudomonas aeruginosa"),
  target("anaerobes", "Anaerob.", "Anaerobios"),
  target("atypicals", "Atíp.", "Patógenos atípicos"),
]);

export const COVERAGE = Object.freeze([
  coverage({
    id: "amp-amox",
    label: "Ampicilina/amoxicilina",
    group: "Penicilinas",
    values: {
      strep: "yes", sasm: "no", sarm: "no", efaecalis: "yes", listeria: "yes",
      enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "maybe", atypicals: "no",
    },
  }),
  coverage({
    id: "amoxclav",
    label: "Amox-clav",
    group: "Penicilinas",
    values: {
      strep: "yes", sasm: "yes", sarm: "no", efaecalis: "yes", listeria: "maybe",
      enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "yes", atypicals: "no",
    },
  }),
  coverage({
    id: "cloxacilina",
    catalogId: "cloxa-cefa",
    label: "Cloxacilina",
    group: "Penicilinas",
    values: {
      strep: "maybe", sasm: "yes", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "no", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "piptazo",
    label: "Pip-tazo",
    group: "Penicilinas",
    values: {
      strep: "yes", sasm: "yes", sarm: "no", efaecalis: "maybe", listeria: "no",
      enterobacterales: "yes", blee: "maybe", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
    },
  }),
  coverage({
    id: "cefazolina",
    catalogId: "cloxa-cefa",
    label: "Cefazolina",
    group: "Cefalosporinas",
    values: {
      strep: "yes", sasm: "yes", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "cefuroxime",
    label: "Cefuroxima",
    group: "Cefalosporinas",
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "ceftriaxone",
    label: "Ceftriaxona/cefotaxima",
    group: "Cefalosporinas",
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "yes", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "ceftazidime",
    label: "Ceftazidima",
    group: "Cefalosporinas",
    values: {
      strep: "maybe", sasm: "no", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "yes", blee: "no", pseudomonas: "yes", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "cefepime",
    label: "Cefepime",
    group: "Cefalosporinas",
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "yes", blee: "no", pseudomonas: "yes", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "anti-mrsa-ceph",
    label: "Ceftarolina",
    group: "Cefalosporinas",
    values: {
      strep: "yes", sasm: "yes", sarm: "yes", efaecalis: "no", listeria: "no",
      enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "aztreonam",
    label: "Aztreonam",
    group: "Monobactámicos y carbapenémicos",
    values: {
      strep: "no", sasm: "no", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "yes", blee: "no", pseudomonas: "yes", anaerobes: "no", atypicals: "no",
    },
  }),
  coverage({
    id: "ertapenem",
    label: "Ertapenem",
    group: "Monobactámicos y carbapenémicos",
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "yes", blee: "yes", pseudomonas: "no", anaerobes: "yes", atypicals: "no",
    },
  }),
  coverage({
    id: "mero-imi",
    label: "Meropenem/imipenem",
    group: "Monobactámicos y carbapenémicos",
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
      enterobacterales: "yes", blee: "yes", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
    },
  }),
]);

function target(id, shortLabel, label) {
  return Object.freeze({ id, shortLabel, label });
}

function coverage({ id, label, group, values, catalogId = id }) {
  return Object.freeze({
    id,
    catalogId,
    label,
    group,
    sourceIds: Object.freeze(["local-proa-fjd"]),
    values: Object.freeze({ ...values }),
  });
}

export function coverageSymbol(level) {
  return level === "yes" ? "✓" : level === "maybe" ? "±" : "✗";
}
