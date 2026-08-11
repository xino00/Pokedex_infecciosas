export const FOCUS_OPTIONS = Object.freeze([
  { id: "cistitis", label: "Cistitis baja" },
  { id: "itu-complicada", label: "Pielonefritis / ITU complicada" },
  { id: "resp", label: "Neumonía / respiratorio" },
  { id: "abdomen", label: "Intraabdominal / biliar" },
  { id: "snc", label: "SNC / meningitis" },
  { id: "bacteriemia", label: "Bacteriemia / sepsis" },
  { id: "piel", label: "Piel y partes blandas" },
]);

export const GERM_OPTIONS = Object.freeze([
  { id: "blee", label: "Enterobacterales BLEE" },
  { id: "ampc", label: "AmpC alto riesgo" },
  { id: "pseudo", label: "Pseudomonas" },
  { id: "dtr", label: "Pseudomonas DTR" },
  { id: "kpc", label: "CRE-KPC" },
  { id: "oxa48", label: "CRE OXA-48-like" },
  { id: "mbl", label: "CRE-MBL" },
  { id: "crab", label: "CRAB" },
  { id: "steno", label: "Stenotrophomonas" },
  { id: "sarm", label: "SARM" },
  { id: "enterolisteria", label: "Enterococcus / Listeria" },
  { id: "anaerobios", label: "Anaerobios relevantes" },
]);

export const SEVERITY_OPTIONS = Object.freeze([
  { id: "estable", label: "Estable" },
  { id: "invasiva", label: "Invasiva / bacteriemia" },
  { id: "critico", label: "Shock / neutropenia / UCI" },
]);

export const SEVERITY_GUIDANCE = Object.freeze({
  estable: Object.freeze({
    alert: "Paciente estable: confirmar foco y sensibilidad antes de ampliar; estrechar cuando sea seguro.",
  }),
  invasiva: Object.freeze({
    alert: "Infección invasiva o bacteriemia: asegurar exposición adecuada, control de foco y reevaluación microbiológica.",
  }),
  critico: Object.freeze({
    alert: "Paciente crítico: cubrir activo pronto y avisar a PROA/Infecciosas.",
  }),
});

const AMR_SOURCES = ["local-proa-fjd", "idsa-amr-2024"];
const LOCAL_SOURCE = ["local-proa-fjd"];

export const GERM_GUIDANCE = Object.freeze({
  blee: guidance({
    headline: "BLEE: el foco y la gravedad cambian la estrategia",
    doItems: ["Confirmar foco, gravedad y opciones activas en el AST.", "Separar cistitis baja, cUTI y enfermedad extraurinaria."],
    avoidItems: ["Tratar todas las infecciones BLEE como si fueran el mismo escenario.", "Usar una opción urinaria baja en pielonefritis o bacteriemia."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  }),
  ampc: guidance({
    headline: "AmpC alto riesgo: cefepime o carbapenémico, no ceftriaxona invasiva",
    doItems: ["Cefepime si sensible y CMI favorable.", "Carbapenémico si gravedad, foco profundo, CMI alta o sospecha de BLEE coproducida.", "Revisar especie: Enterobacter cloacae complex, K. aerogenes, C. freundii."],
    avoidItems: ["Ceftriaxona/cefotaxima/ceftazidima en infección invasiva.", "Pip-tazo como solución automática para AmpC invasiva."],
    microItems: ["Pedir CMI de cefepime y revisar posibilidad de BLEE coproducida."],
    sourceIds: AMR_SOURCES,
  }),
  pseudo: guidance({
    headline: "Pseudomonas: solo antipseudomónicos reales",
    doItems: ["Pip-tazo, ceftazidima, cefepime, meropenem/imipenem o aztreonam si sensible.", "En infección grave, pensar en exposición optimizada/perfusión extendida según protocolo.", "Desescalar al beta-lactámico activo más estrecho cuando llegue AST."],
    avoidItems: ["Ceftriaxona, cefuroxima, amox-clav o ertapenem.", "Tratar Proteus como si fuera Pseudomonas."],
    microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
    sourceIds: AMR_SOURCES,
  }),
  dtr: guidance({
    headline: "Pseudomonas DTR: AST ampliado manda",
    doItems: ["Ceftolozano-tazobactam, ceftazidima-avibactam, imipenem-relebactam o cefiderocol según sensibilidad y foco.", "Si conserva beta-lactámico clásico no carbapenémico, puede preferirse dosis alta/perfusión extendida.", "Si sospecha MBL u opciones límite: valorar con AST ampliado, foco y PROA/Infecciosas."],
    avoidItems: ["Combinación de rutina si ya hay beta-lactámico activo confirmado.", "Fosfomicina oral para Pseudomonas DTR."],
    microItems: ["Solicitar AST de nuevos BL/BLI y cefiderocol."],
    sourceIds: AMR_SOURCES,
  }),
  kpc: guidance({
    headline: "CRE-KPC: inhibidores activos frente a KPC",
    doItems: ["Meropenem-vaborbactam, ceftazidima-avibactam o imipenem-relebactam si sensible.", "Elegir por foco, disponibilidad, CMI y toxicidad."],
    avoidItems: ["Polimixina/aminoglucósido/quinolona añadidos por reflejo si ya hay BL activo.", "Usar esquema de OXA-48/MBL sin confirmar mecanismo."],
    microItems: ["Confirmar KPC y AST de nuevos BL/BLI."],
    sourceIds: AMR_SOURCES,
  }),
  oxa48: guidance({
    headline: "CRE OXA-48-like: ceftazidima-avibactam",
    doItems: ["Ceftazidima-avibactam si sensible.", "Cefiderocol como alternativa según foco, sensibilidad y disponibilidad."],
    avoidItems: ["Meropenem-vaborbactam o imipenem-relebactam como si fueran KPC.", "Olvidar anaerobios/Gram+ si el foco lo exige."],
    microItems: ["Tipado de carbapenemasa y AST completo."],
    sourceIds: AMR_SOURCES,
  }),
  mbl: guidance({
    headline: "MBL: avibactam no inhibe MBL; necesitas aztreonam o cefiderocol",
    doItems: ["Ceftazidima-avibactam + aztreonam.", "Cefiderocol si sensible y foco encaja.", "Aztreonam-avibactam o cefepime-zidebactam si disponibles/protocolo."],
    avoidItems: ["CAZ-AVI en monoterapia.", "Vaborbactam/relebactam como si inhibieran MBL."],
    microItems: ["Pedir prueba/comentario de combinación CAZ-AVI + aztreonam si posible."],
    sourceIds: AMR_SOURCES,
  }),
  crab: guidance({
    headline: "CRAB: primero infección real, luego sulbactam",
    doItems: ["Confirmar clínica compatible y control de foco.", "Sulbactam-durlobactam + meropenem/imipenem si disponible.", "Si no disponible: ampicilina-sulbactam alta dosis + otro agente activo según sensibilidad."],
    avoidItems: ["Meropenem/imipenem solos.", "Tratar colonización respiratoria sin síndrome infeccioso.", "Cefiderocol en monoterapia de reflejo."],
    microItems: ["Consultar PROA/Infecciosas y confirmar sensibilidad."],
    sourceIds: AMR_SOURCES,
  }),
  steno: guidance({
    headline: "Stenotrophomonas: colonización frecuente",
    doItems: ["Tratar solo si infección real, bacteriemia o neumonía compatible.", "Confirmar AST y comentar con PROA antes de combinar automáticamente.", "Si moderada-grave: dos agentes entre cefiderocol, minociclina, TMP-SMX o levofloxacino; alternativa CAZ-AVI + aztreonam."],
    avoidItems: ["Carbapenémicos.", "Ceftazidima como tratamiento.", "Tratar cultivo respiratorio aislado en paciente estable."],
    microItems: ["Pedir sensibilidad a TMP-SMX, minociclina, levofloxacino y cefiderocol; discutir necesidad de combinación."],
    sourceIds: AMR_SOURCES,
  }),
  sarm: guidance({
    headline: "SARM: el foco decide vancomicina, daptomicina, linezolid o beta-lactámico anti-SARM",
    doItems: ["Vancomicina o daptomicina en bacteriemia/endocarditis según foco.", "Ceftarolina como beta-lactámico anti-SARM dirigido; no extrapolar a ceftobiprol sin protocolo.", "Control de foco: drenaje, retirada de catéter, eco si bacteriemia."],
    avoidItems: ["Beta-lactámicos habituales.", "Daptomicina en neumonía.", "Tratar absceso sin drenaje si es drenable."],
    microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
    sourceIds: LOCAL_SOURCE,
  }),
  enterolisteria: guidance({
    headline: "Enterococcus/Listeria: cefalosporinas no bastan",
    doItems: ["E. faecalis sensible: ampicilina/amoxicilina o penicilina G dirigida si sensible.", "En E. faecalis endocarditis, ceftriaxona solo como sinergia con ampicilina según protocolo.", "Si E. faecium/VRE, estrategia dirigida y PROA."],
    avoidItems: ["Ceftriaxona/cefepime/ceftazidima como cobertura de Enterococcus o Listeria.", "Olvidar Listeria en meningitis de anciano, embarazo, neonato o inmunodeprimido."],
    microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
    sourceIds: LOCAL_SOURCE,
  }),
  anaerobios: guidance({
    headline: "Anaerobios: foco y gravedad mandan",
    doItems: ["Amox-clav solo en cuadros comunitarios seleccionados y no graves.", "Pip-tazo o carbapenémico si foco grave/nosocomial/MDR y encaja con el resto del mapa.", "Ceftriaxona + metronidazol puede encajar en abdomen comunitario estable; no es regla universal."],
    avoidItems: ["Aztreonam solo.", "Ceftriaxona sola en foco abdominal con anaerobios.", "Ceftriaxona + metronidazol como respuesta automática en abdomen grave o nosocomial.", "Antibiótico como sustituto de drenaje."],
    microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
    sourceIds: LOCAL_SOURCE,
  }),
});

export const SCENARIO_RULES = Object.freeze([
  rule("blee-cistitis", 300, { germ: "blee", focus: "cistitis", severity: "estable" }, guidance({
    headline: "BLEE + cistitis baja: ahorrar carbapenémico si hay opción urinaria",
    doItems: ["Nitrofurantoína o TMP-SMX si sensible y encaja clínicamente.", "Quinolona si sensible y beneficio supera toxicidad.", "Fosfomicina solo si E. coli y cistitis baja encaja."],
    avoidItems: ["Carbapenémico si hay opción urinaria activa y paciente estable.", "Nitrofurantoína/fosfomicina si pielonefritis, prostatitis o bacteriemia."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  })),
  rule("blee-snc", 300, { germ: "blee", focus: "snc" }, guidance({
    headline: "BLEE + SNC: no ertapenem; revisar penetración meníngea",
    doItems: ["Meropenem si carbapenémico y el foco SNC exige cobertura BLEE.", "Añadir coberturas de meningitis según edad, inmunosupresión y protocolo.", "Avisar a Micro/PROA por foco crítico."],
    avoidItems: ["Ertapenem en SNC.", "Dar por cubierta Listeria con ceftriaxona o carbapenémico.", "Paso oral precoz sin estabilidad ni control microbiológico."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  })),
  rule("blee-critical", 250, { germ: "blee", severity: "critico" }, guidance({
    headline: "BLEE + shock/UCI: meropenem o imipenem, no ertapenem de entrada",
    doItems: ["Meropenem/imipenem si carbapenémico y paciente crítico.", "Optimizar exposición según protocolo, función renal y foco.", "Desescalar cuando AST, evolución y control de foco lo permitan."],
    avoidItems: ["Ertapenem en shock/UCI o hipoalbuminemia.", "Pip-tazo o cefepime como dirigido en BLEE grave aunque informe sensibilidad.", "Contar días de antibiótico inactivo como tratamiento efectivo."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  })),
  rule("blee-cuti", 200, { germ: "blee", focus: "itu-complicada" }, guidance({
    headline: "BLEE + pielonefritis/cUTI: no tratar como cistitis baja",
    doItems: ["TMP-SMX o quinolona si sensible, estable y con buena absorción.", "Carbapenémico si grave, sin opción oral activa o mala evolución.", "Ertapenem puede encajar si estable y sin riesgo Pseudomonas/SNC."],
    avoidItems: ["Nitrofurantoína o fosfomicina para pielonefritis, prostatitis o cUTI sistémica.", "Pip-tazo como opción preferida si hay alternativa más fiable.", "Mantener carbapenémico si hay paso oral activo y estabilidad real."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  })),
  rule("blee-respiratory", 200, { germ: "blee", focus: "resp" }, guidance({
    headline: "BLEE respiratoria/nosocomial: vigilar Pseudomonas antes de elegir ertapenem",
    doItems: ["Meropenem/imipenem si neumonía nosocomial, UCI o riesgo Pseudomonas.", "Ertapenem solo si BLEE estable y Pseudomonas no es un objetivo clínico.", "Ajustar a cultivo respiratorio fiable y evolución."],
    avoidItems: ["Ertapenem si hay riesgo Pseudomonas o neumonía nosocomial grave.", "Ceftriaxona, cefepime o pip-tazo como dirigidos en BLEE grave.", "Tratar colonización respiratoria como infección."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  })),
  rule("blee-extraurinary", 100, { germ: "blee", focus: ["bacteriemia", "abdomen", "piel"] }, guidance({
    headline: "BLEE invasiva/extraurinaria: carbapenémico como ancla",
    doItems: ["Ertapenem si estable, no crítico, sin SNC/neumonía nosocomial/riesgo Pseudomonas y albúmina razonable.", "Meropenem/imipenem si foco profundo, bacteriemia grave o dudas de exposición.", "Paso oral a TMP-SMX/quinolona solo si sensible, estable, buen control de foco y absorción fiable."],
    avoidItems: ["Pip-tazo o cefepime como dirigido en BLEE extraurinaria grave aunque informe sensibilidad.", "Ertapenem si shock/UCI, hipoalbuminemia, SNC o riesgo Pseudomonas.", "Contar días de antibiótico inactivo como tratamiento efectivo."],
    microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
    sourceIds: AMR_SOURCES,
  })),
  rule("sarm-respiratory", 200, { germ: "sarm", focus: "resp" }, guidance({
    headline: "SARM respiratorio: no daptomicina",
    doItems: ["Linezolid o vancomicina según gravedad, bacteriemia y protocolo.", "Ceftarolina si indicación dirigida; ceftobiprol solo si ficha/protocolo lo justifica."],
    avoidItems: ["Beta-lactámicos habituales.", "Daptomicina en neumonía.", "Tratar absceso sin drenaje si es drenable."],
    microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
    sourceIds: LOCAL_SOURCE,
  })),
  rule("listeria-snc", 200, { germ: "enterolisteria", focus: "snc" }, guidance({
    headline: "SNC con riesgo Listeria: añade aminopenicilina",
    doItems: ["Ampicilina IV o amoxicilina IV según protocolo para cubrir Listeria.", "Mantener ceftriaxona/cefotaxima para neumococo/meningococo si procede, pero no como anti-Listeria.", "Si aparece Enterococcus, separar E. faecalis sensible de E. faecium/VRE."],
    avoidItems: ["Ceftriaxona/cefepime/ceftazidima como cobertura de Enterococcus o Listeria.", "Olvidar Listeria en meningitis de anciano, embarazo, neonato o inmunodeprimido."],
    microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
    sourceIds: LOCAL_SOURCE,
  })),
]);

export const CONTEXT_RULES = Object.freeze([
  Object.freeze({
    id: "snc-penetration",
    when: { focus: "snc" },
    exceptGerms: ["enterolisteria", "sarm"],
    microItems: ["En SNC, revisar penetración meníngea y necesidad de cubrir Listeria según edad/inmunosupresión."],
    sourceIds: LOCAL_SOURCE,
  }),
  Object.freeze({
    id: "abdomen-anaerobes",
    when: { focus: "abdomen" },
    exceptGerms: ["anaerobios", "crab", "steno"],
    microItems: ["En foco abdominal, comprobar si tu pauta cubre anaerobios o añade metronidazol."],
    sourceIds: LOCAL_SOURCE,
  }),
]);

export function resolveScenario(input) {
  const base = GERM_GUIDANCE[input.germ];
  if (!base || !SEVERITY_GUIDANCE[input.severity]) {
    return null;
  }

  const matchingRules = SCENARIO_RULES.filter((candidate) => matchesWhen(candidate.when, input)).sort(
    (left, right) => right.priority - left.priority,
  );
  const selectedRule = matchingRules[0] ?? null;
  const selected = selectedRule?.result ?? base;
  const contextRules = CONTEXT_RULES.filter(
    (candidate) =>
      matchesWhen(candidate.when, input) && !candidate.exceptGerms?.includes(input.germ),
  );
  const sourceIds = new Set(selected.sourceIds);
  const microItems = [...selected.microItems];

  for (const contextRule of contextRules) {
    microItems.push(...contextRule.microItems);
    contextRule.sourceIds.forEach((sourceId) => sourceIds.add(sourceId));
  }

  const scope = selectedRule ? "specific" : contextRules.length ? "contextual" : "germ-only";
  const scopeNotice =
    scope === "germ-only"
      ? " Esta combinación concreta de foco y gravedad no dispone de una regla específica: la salida es orientación por germen/mecanismo."
      : "";

  return Object.freeze({
    input: Object.freeze({ ...input }),
    headline: selected.headline,
    doItems: Object.freeze([...selected.doItems]),
    avoidItems: Object.freeze([...selected.avoidItems]),
    microItems: Object.freeze(microItems),
    alert: `${SEVERITY_GUIDANCE[input.severity].alert}${scopeNotice}`,
    scope,
    ruleId: selectedRule?.id ?? null,
    contextRuleIds: Object.freeze(contextRules.map((candidate) => candidate.id)),
    sourceIds: Object.freeze([...sourceIds]),
  });
}

export function getTopMatchingRules(input) {
  const matches = SCENARIO_RULES.filter((candidate) => matchesWhen(candidate.when, input));
  if (!matches.length) return [];
  const highestPriority = Math.max(...matches.map((candidate) => candidate.priority));
  return matches.filter((candidate) => candidate.priority === highestPriority);
}

export function matchesWhen(when, input) {
  return Object.entries(when).every(([key, expected]) => {
    const accepted = Array.isArray(expected) ? expected : [expected];
    return accepted.includes(input[key]);
  });
}

function guidance({ headline, doItems, avoidItems, microItems, sourceIds }) {
  return Object.freeze({
    headline,
    doItems: Object.freeze(doItems),
    avoidItems: Object.freeze(avoidItems),
    microItems: Object.freeze(microItems),
    sourceIds: Object.freeze(sourceIds),
  });
}

function rule(id, priority, when, result) {
  return Object.freeze({ id, priority, when: Object.freeze(when), result });
}

export const AUDITED_SCENARIOS = Object.freeze(
  GERM_OPTIONS.flatMap((germ) =>
    FOCUS_OPTIONS.flatMap((focus) =>
      SEVERITY_OPTIONS.map((severity) =>
        Object.freeze({ germ: germ.id, focus: focus.id, severity: severity.id }),
      ),
    ),
  ).filter((input) => resolveScenario(input)?.ruleId),
);

export function isAuditedScenario(input) {
  return AUDITED_SCENARIOS.some(
    (candidate) =>
      candidate.germ === input.germ &&
      candidate.focus === input.focus &&
      candidate.severity === input.severity,
  );
}

export function getAuditedGermOptions() {
  const allowed = new Set(AUDITED_SCENARIOS.map(({ germ }) => germ));
  return GERM_OPTIONS.filter(({ id }) => allowed.has(id));
}

export function getAuditedFocusOptions(germ) {
  const allowed = new Set(
    AUDITED_SCENARIOS.filter((scenario) => scenario.germ === germ).map(({ focus }) => focus),
  );
  return FOCUS_OPTIONS.filter(({ id }) => allowed.has(id));
}

export function getAuditedSeverityOptions(germ, focus) {
  const allowed = new Set(
    AUDITED_SCENARIOS.filter(
      (scenario) => scenario.germ === germ && scenario.focus === focus,
    ).map(({ severity }) => severity),
  );
  return SEVERITY_OPTIONS.filter(({ id }) => allowed.has(id));
}
