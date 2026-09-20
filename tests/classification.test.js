import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { CLASSIFICATION, CLASSIFICATION_NOTES, filterClassification } from "../src/classification.js";
import { ORGANISMS, SECTIONS } from "../src/catalog.js";
import { SOURCES } from "../src/sources.js";

test("las ramas tienen identificadores únicos, fuentes y fichas relacionadas válidas", () => {
  const rows = CLASSIFICATION.flatMap((group) => group.rows);
  assert.equal(new Set(CLASSIFICATION.map(({ id }) => id)).size, CLASSIFICATION.length);
  assert.equal(new Set(rows.map(({ id }) => id)).size, rows.length);
  assert.ok(SECTIONS.some(({ id }) => id === "classification"));
  for (const row of rows) {
    assert.ok(row.setting && row.test && row.taxa.length, row.id);
    assert.ok(row.sourceIds.length, row.id);
    for (const id of row.organismIds) assert.ok(ORGANISMS.some((item) => item.id === id), `${row.id}: ${id}`);
  }
  for (const item of [...rows, ...CLASSIFICATION_NOTES]) {
    for (const id of item.sourceIds) assert.ok(Object.hasOwn(SOURCES, id), id);
  }
});

test("la búsqueda conserva el contexto y encuentra términos nuevos sin crear fichas clínicas", () => {
  const result = filterClassification("  VEILLONELLA  ");
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "negative-cocci");
  assert.equal(result[0].rows.length, 1);
  assert.equal(result[0].rows[0].setting, "Anaerobios");
  assert.deepEqual(result[0].rows[0].organismIds, []);
  assert.deepEqual(filterClassification("hemolisis"), filterClassification("hemólisis"));
  for (const name of ["Staphylococcus epidermidis", "Streptococcus agalactiae", "Enterococcus faecium"]) {
    assert.equal(filterClassification(name)[0]?.id, "positive-cocci", name);
  }
  assert.deepEqual(filterClassification("no-existe"), []);
  assert.deepEqual(filterClassification("   "), CLASSIFICATION);
});

test("la búsqueda combina el grupo elegido con nombres y pruebas sin mutar los datos", () => {
  const original = JSON.stringify(CLASSIFICATION);
  assert.deepEqual(filterClassification("Veillonella", "positive-rods"), []);
  const result = filterClassification("coagulasa", "positive-cocci");
  assert.equal(result.length, 1);
  assert.equal(result[0].rows.length, 2);
  assert.ok(result[0].rows.some((row) => row.taxa.includes("S. lugdunensis")));
  assert.equal(JSON.stringify(CLASSIFICATION), original);
});

test("la referencia original existe y puede abrirse sin conexión", async () => {
  const file = await readFile(new URL(`../${SOURCES["classification-image"].url}`, import.meta.url));
  assert.equal(file.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
});
