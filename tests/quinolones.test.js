import test from "node:test";
import assert from "node:assert/strict";
import { ANTIBIOTICS } from "../src/catalog.js";
import { COVERAGE } from "../src/coverage.js";
import { findDetailItem } from "../src/navigation.js";
import { resolveScenario } from "../src/rules.js";
import { buildMatrix, filterAntibiotics } from "../src/selectors.js";

const drugIds = ["ciprofloxacin", "levofloxacin", "moxifloxacin"];

test("la familia se encuentra en búsqueda y cada fármaco abre su propia ficha con fuentes", () => {
  assert.deepEqual(filterAntibiotics(ANTIBIOTICS, " quinolonas ").map(({ id }) => id), drugIds);
  for (const id of drugIds) {
    const item = findDetailItem("antibiotic", id);
    assert.ok(item.sourceIds.includes(`aemps-${id}`));
    assert.ok(item.sourceIds.includes("aemps-fluoroquinolonas"));
    assert.ok(item.precautions.some((text) => /indicaciones autorizadas/.test(text)));
    assert.ok(item.precautions.some((text) => /reacción grave previa/.test(text)));
    assert.equal(COVERAGE.find((row) => row.id === id).catalogId, id);
  }
});

test("las quinolonas conservan los huecos y los límites por foco de CIMA, IDSA y EUCAST", () => {
  const matrix = buildMatrix();
  const cell = (drug, target) => matrix.rows.find(({ id }) => id === drug).cells.find(({ targetId }) => targetId === target);
  // CIMA 67095: eficacia estreptocócica insuficiente. CIMA 74573: Pseudomonas resistente.
  assert.equal(cell("ciprofloxacin", "strep").level, "no");
  assert.equal(cell("moxifloxacin", "pseudomonas").level, "no");
  assert.equal(cell("levofloxacin", "atypicals").level, "yes");
  assert.equal(cell("moxifloxacin", "atypicals").level, "yes");
  assert.equal(cell("ciprofloxacin", "atypicals").level, "maybe");
  assert.equal(cell("moxifloxacin", "anaerobes").level, "maybe");
  for (const id of ["ciprofloxacin", "levofloxacin"]) {
    assert.match(cell(id, "pseudomonas").note, /AST.*exposición/);
    assert.equal(cell(id, "blee").level, "maybe");
    assert.match(cell(id, "blee").note, /sensibilidad confirmada/);
    assert.match(cell(id, "efaecalis").note, /ITU no complicada/);
  }
});

test("la falta de evidencia clínica no se transforma en cobertura ni resistencia", () => {
  const matrix = buildMatrix();
  for (const id of ["levofloxacin", "moxifloxacin"]) {
    const cell = matrix.rows.find((row) => row.id === id).cells.find(({ targetId }) => targetId === "listeria");
    assert.equal(cell.level, "unknown");
    assert.equal(cell.symbol, "?");
    assert.match(cell.note, /no asumir/);
  }
  assert.equal(COVERAGE.find(({ id }) => id === "ciprofloxacin").values.listeria, "no");
});

test("las rutas BLEE no convierten moxifloxacino en alternativa urinaria u oral por extensión de familia", () => {
  for (const focus of ["cistitis", "itu-complicada", "bacteriemia"]) {
    const scenario = resolveScenario({ germ: "blee", focus, severity: "estable" });
    const actions = scenario.doItems.join(" ");
    assert.match(actions, /ciprofloxacino/i);
    assert.match(actions, /levofloxacino/i);
    assert.doesNotMatch(actions, /moxifloxacino|quinolona/i);
    assert.match(actions, /sensible/);
    if (focus !== "bacteriemia") assert.match(scenario.avoidItems.join(" "), /Moxifloxacino/);
  }
  const cystitis = resolveScenario({ germ: "blee", focus: "cistitis", severity: "estable" });
  assert.match(cystitis.doItems.join(" "), /sin alternativa habitual utilizable/);
});
