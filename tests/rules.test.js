import test from "node:test";
import assert from "node:assert/strict";

import {
  AUDITED_SCENARIOS,
  FOCUS_OPTIONS,
  GERM_OPTIONS,
  SEVERITY_OPTIONS,
  getAuditedFocusOptions,
  getAuditedGermOptions,
  getAuditedSeverityOptions,
  isAuditedScenario,
  resolveScenario,
} from "../src/rules.js";

test("todas las combinaciones del selector producen una salida explícita", () => {
  let combinations = 0;
  for (const focus of FOCUS_OPTIONS) {
    for (const germ of GERM_OPTIONS) {
      for (const severity of SEVERITY_OPTIONS) {
        const result = resolveScenario({ focus: focus.id, germ: germ.id, severity: severity.id });
        assert.ok(result);
        assert.equal(result.input.focus, focus.id);
        assert.equal(result.input.germ, germ.id);
        assert.equal(result.input.severity, severity.id);
        combinations += 1;
      }
    }
  }
  assert.equal(combinations, 252);
});

test("la gravedad modifica de forma visible el resultado", () => {
  const base = { focus: "bacteriemia", germ: "ampc" };
  const alerts = SEVERITY_OPTIONS.map(({ id }) => resolveScenario({ ...base, severity: id }).alert);
  assert.equal(new Set(alerts).size, 3);
});

test("BLEE distingue cistitis estable, cUTI y enfermedad extraurinaria", () => {
  const results = [
    resolveScenario({ germ: "blee", focus: "cistitis", severity: "estable" }),
    resolveScenario({ germ: "blee", focus: "itu-complicada", severity: "invasiva" }),
    resolveScenario({ germ: "blee", focus: "bacteriemia", severity: "invasiva" }),
  ];
  assert.deepEqual(
    results.map(({ ruleId }) => ruleId),
    ["blee-cistitis", "blee-cuti", "blee-extraurinary"],
  );
  assert.equal(new Set(results.map(({ headline }) => headline)).size, 3);
});

test("cistitis BLEE invasiva no reutiliza la regla de infección baja estable", () => {
  const result = resolveScenario({ germ: "blee", focus: "cistitis", severity: "invasiva" });
  assert.equal(result.ruleId, null);
  assert.equal(result.scope, "germ-only");
});

test("el selector declara cuándo solo existe orientación por germen", () => {
  const result = resolveScenario({ focus: "piel", germ: "kpc", severity: "estable" });
  assert.equal(result.scope, "germ-only");
  assert.match(result.alert, /no dispone de una regla específica/i);
});

test("la interfaz solo ofrece rutas con regla clínica específica", () => {
  assert.ok(AUDITED_SCENARIOS.length > 0);
  assert.ok(AUDITED_SCENARIOS.length < 252);
  assert.ok(AUDITED_SCENARIOS.every((input) => isAuditedScenario(input)));
  assert.ok(AUDITED_SCENARIOS.every((input) => resolveScenario(input)?.scope === "specific"));
  assert.equal(
    isAuditedScenario({ germ: "blee", focus: "cistitis", severity: "invasiva" }),
    false,
  );
});

test("los desplegables auditados se derivan en cascada", () => {
  assert.deepEqual(getAuditedGermOptions().map(({ id }) => id), ["blee", "sarm", "enterolisteria"]);
  assert.deepEqual(getAuditedFocusOptions("sarm").map(({ id }) => id), ["resp"]);
  assert.deepEqual(
    getAuditedSeverityOptions("enterolisteria", "snc").map(({ id }) => id),
    ["estable", "invasiva", "critico"],
  );
});

test("SARM respiratorio selecciona la excepción de foco", () => {
  const result = resolveScenario({ focus: "resp", germ: "sarm", severity: "invasiva" });
  assert.equal(result.ruleId, "sarm-respiratory");
  assert.match(result.headline, /no daptomicina/i);
});
