import test from "node:test";
import assert from "node:assert/strict";

import { COVERAGE, COVERAGE_TARGETS } from "../src/coverage.js";
import { buildMatrix } from "../src/selectors.js";

test("la matriz se deriva de la cobertura canónica", () => {
  const matrix = buildMatrix();
  assert.equal(matrix.columns.length, COVERAGE_TARGETS.length);
  assert.ok(matrix.rows.every((row) => row.cells.length === COVERAGE_TARGETS.length));

  const ertapenem = matrix.rows.find((row) => row.id === "ertapenem");
  const pseudomonasIndex = matrix.columns.findIndex((column) => column.id === "pseudomonas");
  assert.equal(ertapenem.cells[pseudomonasIndex].level, "no");
});

test("cada fila nombra explícitamente todos los objetivos de cobertura", () => {
  const targetIds = COVERAGE_TARGETS.map(({ id }) => id).sort();
  for (const row of COVERAGE) {
    assert.deepEqual(Object.keys(row.values).sort(), targetIds);
    assert.ok(row.group);
  }
  assert.ok(COVERAGE_TARGETS.every(({ label, shortLabel }) => label && shortLabel));
});

test("los carbapenémicos conservan sus diferencias documentadas por CIMA y DailyMed", () => {
  const matrix = buildMatrix();
  const cell = (drug, target) => matrix.rows.find(({ id }) => id === drug).cells.find(({ targetId }) => targetId === target);
  // Valores contrastados con CIMA 60640/71285 y DailyMed PRIMAXIN, no equivalencia de pautas.
  assert.equal(cell("meropenem", "efaecalis").level, "maybe");
  assert.equal(cell("meropenem", "listeria").level, "yes");
  assert.equal(cell("imipenem", "efaecalis").level, "yes");
  assert.equal(cell("imipenem", "listeria").level, "maybe");
  assert.match(cell("meropenem", "efaecalis").note, /intermedia/);
  assert.match(cell("imipenem", "listeria").note, /no se recomienda para meningitis/);
  assert.equal(cell("ertapenem", "efaecalis").level, "no");
});
