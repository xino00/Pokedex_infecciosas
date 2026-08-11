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
