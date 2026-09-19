export const COVERAGE_LEVELS = Object.freeze(["yes", "maybe", "no", "unknown"]);

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
    id: "meropenem",
    catalogId: "mero-imi",
    label: "Meropenem",
    group: "Monobactámicos y carbapenémicos",
    sourceIds: ["local-proa-fjd", "aemps-meropenem"],
    notes: {
      efaecalis: "E. faecalis: actividad limitada; CIMA describe sensibilidad natural intermedia. Confirmar AST y pauta específica.",
      listeria: "Listeria: meropenem tiene actividad; el espectro no sustituye la elección de pauta para meningitis según protocolo.",
    },
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "yes",
      enterobacterales: "yes", blee: "yes", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
    },
  }),
  coverage({
    id: "imipenem",
    catalogId: "mero-imi",
    label: "Imipenem/cilastatina",
    group: "Monobactámicos y carbapenémicos",
    sourceIds: ["local-proa-fjd", "aemps-imipenem", "dailymed-imipenem"],
    notes: {
      listeria: "Listeria: actividad in vitro sin eficacia clínica establecida en la ficha estadounidense. Imipenem/cilastatina no se recomienda para meningitis (CIMA).",
    },
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "yes", listeria: "maybe",
      enterobacterales: "yes", blee: "yes", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
    },
  }),
  coverage({
    id: "ciprofloxacin",
    label: "Ciprofloxacino",
    group: "Fluoroquinolonas",
    sourceIds: ["aemps-ciprofloxacin", "idsa-amr-2026", "eucast-2026-quinolones"],
    notes: {
      strep: "Strep/neumococo: eficacia insuficiente; no elegir ciprofloxacino.",
      efaecalis: "E. faecalis: actividad limitada. EUCAST solo da puntos de corte para ITU no complicada; no extrapolar a otros focos.",
      blee: "BLEE: ciprofloxacino solo con sensibilidad confirmada y foco adecuado; resistencia asociada frecuente.",
      pseudomonas: "Pseudomonas: exigir AST y exposición adecuada, sin asumir cobertura empírica.",
      atypicals: "Atípicos: actividad frente a Legionella; no extrapolar a todo el grupo.",
    },
    values: {
      strep: "no", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "no",
      enterobacterales: "maybe", blee: "maybe", pseudomonas: "maybe", anaerobes: "no", atypicals: "maybe",
    },
  }),
  coverage({
    id: "levofloxacin",
    label: "Levofloxacino",
    group: "Fluoroquinolonas",
    sourceIds: ["aemps-levofloxacin", "idsa-amr-2026", "eucast-2026-quinolones"],
    notes: {
      efaecalis: "E. faecalis: EUCAST solo da puntos de corte para ITU no complicada; no extrapolar a otros focos.",
      listeria: "Listeria: sin cobertura clínica establecida en las fuentes revisadas; no asumir actividad terapéutica.",
      blee: "BLEE: levofloxacino solo con sensibilidad confirmada y foco adecuado; resistencia asociada frecuente.",
      pseudomonas: "Pseudomonas: exigir AST y exposición adecuada, sin asumir cobertura empírica.",
      anaerobes: "Anaerobios: actividad parcial que no ofrece cobertura fiable del grupo.",
    },
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "unknown",
      enterobacterales: "maybe", blee: "maybe", pseudomonas: "maybe", anaerobes: "no", atypicals: "yes",
    },
  }),
  coverage({
    id: "moxifloxacin",
    label: "Moxifloxacino",
    group: "Fluoroquinolonas",
    sourceIds: ["aemps-moxifloxacin", "eucast-2026-quinolones"],
    notes: {
      efaecalis: "E. faecalis: uso excepcional dirigido; EUCAST no permite informar sensible a moxifloxacino por ausencia de mecanismos de resistencia.",
      listeria: "Listeria: EUCAST señala evidencia insuficiente en meningitis; no asumir cobertura clínica.",
      enterobacterales: "Enterobacterales: sensibilidad variable; moxifloxacino no está indicado para ITU.",
      blee: "BLEE: frecuente resistencia asociada; no extrapolar las opciones urinarias de ciprofloxacino/levofloxacino.",
      anaerobes: "Anaerobios: algunos sensibles, pero B. fragilis puede ser resistente; no asumir cobertura universal.",
    },
    values: {
      strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "unknown",
      enterobacterales: "maybe", blee: "maybe", pseudomonas: "no", anaerobes: "maybe", atypicals: "yes",
    },
  }),
]);

function target(id, shortLabel, label) {
  return Object.freeze({ id, shortLabel, label });
}

function coverage({ id, label, group, values, catalogId = id, sourceIds = ["local-proa-fjd"], notes = {} }) {
  return Object.freeze({
    id,
    catalogId,
    label,
    group,
    sourceIds: Object.freeze(sourceIds),
    notes: Object.freeze({ ...notes }),
    values: Object.freeze({ ...values }),
  });
}

export function coverageSymbol(level) {
  if (level === "unknown") return "?";
  return level === "yes" ? "✓" : level === "maybe" ? "±" : "✗";
}
