import { ANTIBIOTICS, CASES, MECHANISMS, ORGANISMS, SECTIONS } from "./catalog.js";
import { COVERAGE, COVERAGE_LEVELS, COVERAGE_TARGETS } from "./coverage.js";
import {
  CONTEXT_RULES,
  AUDITED_SCENARIOS,
  FOCUS_OPTIONS,
  GERM_GUIDANCE,
  GERM_OPTIONS,
  SCENARIO_RULES,
  SEVERITY_OPTIONS,
  getTopMatchingRules,
  isAuditedScenario,
  resolveScenario,
} from "./rules.js";
import { SOURCES } from "./sources.js";

export function validateData() {
  const errors = [];
  const sourceIds = new Set(Object.keys(SOURCES));
  const focusIds = new Set(FOCUS_OPTIONS.map(({ id }) => id));
  const germIds = new Set(GERM_OPTIONS.map(({ id }) => id));
  const severityIds = new Set(SEVERITY_OPTIONS.map(({ id }) => id));

  checkUniqueIds(errors, "secciones", SECTIONS);
  checkUniqueIds(errors, "organismos", ORGANISMS);
  checkUniqueIds(errors, "antibióticos", ANTIBIOTICS);
  checkUniqueIds(errors, "mecanismos", MECHANISMS);
  checkUniqueIds(errors, "casos", CASES);
  checkUniqueIds(errors, "focos", FOCUS_OPTIONS);
  checkUniqueIds(errors, "gérmenes", GERM_OPTIONS);
  checkUniqueIds(errors, "gravedades", SEVERITY_OPTIONS);
  checkUniqueIds(errors, "reglas", SCENARIO_RULES);
  checkUniqueIds(errors, "reglas contextuales", CONTEXT_RULES);
  checkUniqueIds(errors, "filas de cobertura", COVERAGE);
  checkUniqueIds(errors, "columnas de cobertura", COVERAGE_TARGETS);

  if (!AUDITED_SCENARIOS.length) {
    errors.push("No existe ninguna ruta clínica auditada para el selector.");
  }

  checkSourceReferences(errors, "organismo", ORGANISMS, sourceIds);
  checkSourceReferences(errors, "antibiótico", ANTIBIOTICS, sourceIds);
  checkSourceReferences(errors, "mecanismo", MECHANISMS, sourceIds);
  checkSourceReferences(errors, "caso", CASES, sourceIds);
  checkSourceReferences(errors, "cobertura", COVERAGE, sourceIds);
  checkSourceReferences(
    errors,
    "guía por germen",
    Object.entries(GERM_GUIDANCE).map(([id, value]) => ({ id, ...value })),
    sourceIds,
  );
  checkSourceReferences(
    errors,
    "regla",
    SCENARIO_RULES.map((item) => ({ id: item.id, sourceIds: item.result.sourceIds })),
    sourceIds,
  );
  checkSourceReferences(errors, "regla contextual", CONTEXT_RULES, sourceIds);

  const antibioticIds = new Set(ANTIBIOTICS.map(({ id }) => id));
  const targetIds = COVERAGE_TARGETS.map(({ id }) => id);
  const validLevels = new Set(COVERAGE_LEVELS);
  for (const row of COVERAGE) {
    if (!row.group) {
      errors.push(`Cobertura ${row.id}: falta el grupo terapéutico.`);
    }
    if (!antibioticIds.has(row.catalogId)) {
      errors.push(`Cobertura ${row.id}: catalogId inexistente (${row.catalogId}).`);
    }
    const rowTargets = Object.keys(row.values);
    for (const targetId of targetIds) {
      if (!(targetId in row.values)) {
        errors.push(`Cobertura ${row.id}: falta la columna ${targetId}.`);
      } else if (!validLevels.has(row.values[targetId])) {
        errors.push(`Cobertura ${row.id}/${targetId}: nivel inválido (${row.values[targetId]}).`);
      }
    }
    for (const targetId of rowTargets) {
      if (!targetIds.includes(targetId)) {
        errors.push(`Cobertura ${row.id}: columna desconocida ${targetId}.`);
      }
    }
  }

  for (const germId of germIds) {
    if (!GERM_GUIDANCE[germId]) {
      errors.push(`No existe orientación base para el germen ${germId}.`);
    }
  }
  for (const germId of Object.keys(GERM_GUIDANCE)) {
    if (!germIds.has(germId)) {
      errors.push(`La orientación base referencia un germen desconocido: ${germId}.`);
    }
  }

  for (const item of [...SCENARIO_RULES, ...CONTEXT_RULES]) {
    validateWhen(errors, item.id, item.when, { focus: focusIds, germ: germIds, severity: severityIds });
  }

  for (const rule of SCENARIO_RULES) {
    if (!Number.isInteger(rule.priority)) {
      errors.push(`Regla ${rule.id}: prioridad no entera.`);
    }
  }

  for (const focus of FOCUS_OPTIONS) {
    for (const germ of GERM_OPTIONS) {
      for (const severity of SEVERITY_OPTIONS) {
        const input = { focus: focus.id, germ: germ.id, severity: severity.id };
        const topRules = getTopMatchingRules(input);
        if (topRules.length > 1) {
          errors.push(
            `Empate de reglas para ${focus.id}/${germ.id}/${severity.id}: ${topRules.map(({ id }) => id).join(", ")}.`,
          );
        }
        if (!resolveScenario(input)) {
          errors.push(`Escenario sin salida: ${focus.id}/${germ.id}/${severity.id}.`);
        }
      }
    }
  }

  const reachableRuleIds = new Set(AUDITED_SCENARIOS.map((input) => resolveScenario(input)?.ruleId));
  for (const rule of SCENARIO_RULES) {
    if (!reachableRuleIds.has(rule.id)) {
      errors.push(`Regla ${rule.id}: no es alcanzable desde ninguna ruta auditada.`);
    }
  }
  for (const input of AUDITED_SCENARIOS) {
    if (!isAuditedScenario(input) || !resolveScenario(input)?.ruleId) {
      errors.push(`Ruta auditada inválida: ${input.germ}/${input.focus}/${input.severity}.`);
    }
  }

  for (const source of Object.values(SOURCES)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.registeredAt)) {
      errors.push(`Fuente ${source.id}: registeredAt no usa YYYY-MM-DD.`);
    }
    if (source.url && !source.url.startsWith("https://")) {
      errors.push(`Fuente ${source.id}: la URL no usa HTTPS.`);
    }
  }

  return errors;
}

export function assertDataIsValid() {
  const errors = validateData();
  if (errors.length) {
    throw new Error(`Datos PROADEX inválidos:\n- ${errors.join("\n- ")}`);
  }
}

function checkUniqueIds(errors, label, items) {
  const seen = new Set();
  for (const item of items) {
    if (!item.id) {
      errors.push(`${label}: elemento sin id.`);
    } else if (seen.has(item.id)) {
      errors.push(`${label}: id duplicado (${item.id}).`);
    }
    seen.add(item.id);
  }
}

function checkSourceReferences(errors, label, items, knownSources) {
  for (const item of items) {
    if (!item.sourceIds?.length) {
      errors.push(`${label} ${item.id}: sin fuentes.`);
      continue;
    }
    for (const sourceId of item.sourceIds) {
      if (!knownSources.has(sourceId)) {
        errors.push(`${label} ${item.id}: fuente inexistente (${sourceId}).`);
      }
    }
  }
}

function validateWhen(errors, ruleId, when, validValues) {
  for (const [dimension, expected] of Object.entries(when)) {
    if (!validValues[dimension]) {
      errors.push(`Regla ${ruleId}: dimensión desconocida (${dimension}).`);
      continue;
    }
    const values = Array.isArray(expected) ? expected : [expected];
    for (const value of values) {
      if (!validValues[dimension].has(value)) {
        errors.push(`Regla ${ruleId}: valor desconocido ${dimension}=${value}.`);
      }
    }
  }
}
