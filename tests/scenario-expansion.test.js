import test from "node:test";
import assert from "node:assert/strict";
import { AUDITED_SCENARIOS, GERM_OPTIONS, isAuditedScenario, resolveScenario } from "../src/rules.js";

test("una cistitis baja no ofrece rutas invasivas o críticas por una regla demasiado amplia", () => {
  for (const { id: germ } of GERM_OPTIONS) {
    for (const severity of ["invasiva", "critico"]) {
      assert.equal(isAuditedScenario({ germ, focus: "cistitis", severity }), false);
    }
  }
  assert.equal(isAuditedScenario({ germ: "blee", focus: "endocarditis", severity: "critico" }), false);
});

test("el foco y la gravedad separan las decisiones de SARM en piel, pulmón y sangre", () => {
  const skin = resolveScenario({ germ: "sarm", focus: "piel", severity: "estable" });
  const invasiveSkin = resolveScenario({ germ: "sarm", focus: "piel", severity: "critico" });
  const lung = resolveScenario({ germ: "sarm", focus: "resp", severity: "estable" });
  const blood = resolveScenario({ germ: "sarm", focus: "bacteriemia", severity: "invasiva" });
  assert.equal(new Set([skin, invasiveSkin, lung, blood].map(({ ruleId }) => ruleId)).size, 4);
  assert.match(skin.doItems.join(" "), /Drenar/);
  assert.match(invasiveSkin.doItems.join(" "), /quirúrgica urgente/);
  assert.doesNotMatch(lung.avoidItems.join(" "), /absceso/);
  assert.match(blood.microItems.join(" "), /hemocultivos.*negativización/);
  assert.match(blood.microItems.join(" "), /ecocardiograma/);
});

test("Pseudomonas respiratoria con shock no hereda la recomendación de monoterapia del paciente estable", () => {
  const stable = resolveScenario({ germ: "pseudo", focus: "resp", severity: "estable" });
  const critical = resolveScenario({ germ: "pseudo", focus: "resp", severity: "critico" });
  assert.notEqual(stable.ruleId, critical.ruleId);
  assert.match(stable.doItems.join(" "), /un antibiótico activo suele bastar/);
  assert.doesNotMatch(critical.doItems.join(" "), /un antibiótico activo suele bastar/);
  assert.match(critical.doItems.join(" "), /combinación/);
});

test("Enterococcus y Listeria tienen rutas separadas y la sinergia no se presenta como cobertura propia", () => {
  assert.equal(isAuditedScenario({ germ: "enterococcus", focus: "snc", severity: "invasiva" }), false);
  assert.equal(isAuditedScenario({ germ: "listeria", focus: "endocarditis", severity: "invasiva" }), false);
  const endocarditis = resolveScenario({ germ: "enterococcus", focus: "endocarditis", severity: "invasiva" });
  assert.match(endocarditis.doItems.join(" "), /E\. faecalis sensible.*ampicilina con ceftriaxona/);
  assert.match(endocarditis.avoidItems.join(" "), /Ceftriaxona sola/);
  assert.match(endocarditis.avoidItems.join(" "), /E\. faecium/);
});

test("el seguimiento es específico y no convierte meningitis o bacteriemia estafilocócica en una ruta de paso oral automático", () => {
  for (const input of AUDITED_SCENARIOS) {
    const result = resolveScenario(input);
    assert.ok(result.followUpItems.length, JSON.stringify(input));
    assert.ok(Object.isFrozen(result.followUpItems));
  }
  const urinary = resolveScenario({ germ: "ampc", focus: "itu-complicada", severity: "estable" });
  const meningitis = resolveScenario({ germ: "listeria", focus: "snc", severity: "estable" });
  const blood = resolveScenario({ germ: "sasm", focus: "bacteriemia", severity: "invasiva" });
  assert.match(urinary.followUpItems.join(" "), /Valorar el paso a vía oral/);
  assert.doesNotMatch(meningitis.followUpItems.join(" "), /Valorar el paso a vía oral/);
  assert.match(blood.followUpItems.join(" "), /hemocultivos positivos/);
  assert.match(blood.followUpItems.join(" "), /no basta/);
});
