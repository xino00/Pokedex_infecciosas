import test from "node:test";
import assert from "node:assert/strict";
import { ANTIBIOTICS, MECHANISMS, ORGANISMS } from "../src/catalog.js";
import { AUDITED_SCENARIOS } from "../src/rules.js";
import { findDetailItem, readSharedScenario } from "../src/navigation.js";

test("una ruta KPC crítica no se sustituye por la ruta BLEE inicial", () => {
  const requested = { germ: "kpc", focus: "bacteriemia", severity: "critico" };
  const result = readSharedScenario(new URLSearchParams(requested));
  assert.equal(result.status, "unavailable");
  assert.deepEqual(result.input, requested);
});

test("la ausencia de ruta se distingue de parámetros vacíos, parciales o duplicados", () => {
  assert.equal(readSharedScenario(new URLSearchParams("view=wizard")).status, "absent");
  for (const query of ["germ=", "focus=snc", "germ=blee&focus=snc&severity=", "germ=blee&germ=kpc&focus=snc&severity=critico"]) {
    assert.equal(readSharedScenario(new URLSearchParams(query)).status, "unavailable", query);
  }
});

test("todas las rutas disponibles conservan sus tres dimensiones al compartirse", () => {
  for (const input of AUDITED_SCENARIOS) {
    const result = readSharedScenario(new URLSearchParams(input));
    assert.equal(result.status, "valid");
    assert.deepEqual(result.input, input);
  }
});

test("el enlace antiguo Enterococcus/Listeria conserva su ruta de Listeria en SNC", () => {
  for (const severity of ["estable", "invasiva", "critico"]) {
    const result = readSharedScenario(new URLSearchParams({ germ: "enterolisteria", focus: "snc", severity }));
    assert.equal(result.status, "valid");
    assert.deepEqual(result.input, { germ: "listeria", focus: "snc", severity });
  }
  for (const query of [
    "germ=enterolisteria&focus=bacteriemia&severity=invasiva",
    "germ=enterolisteria&germ=listeria&focus=snc&severity=critico",
  ]) assert.equal(readSharedScenario(new URLSearchParams(query)).status, "unavailable");
});

test("una ruta ambigua sigue bloqueada al volver a serializar sus parámetros", () => {
  const requested = new URLSearchParams("germ=blee&germ=kpc&focus=snc&severity=critico");
  const first = readSharedScenario(requested);
  const restored = readSharedScenario(new URLSearchParams(first.query));
  assert.equal(restored.status, "unavailable");
  assert.equal(restored.query, requested.toString());
});

test("tipos de detalle desconocidos o heredados se ignoran sin bloquear el arranque", () => {
  for (const type of ["toString", "constructor", "__proto__", "hasOwnProperty", "unknown", "", null]) {
    assert.equal(findDetailItem(type, "x"), null);
  }
  assert.equal(findDetailItem("antibiotic", "inexistente"), null);
});

test("los enlaces de todas las fichas resuelven su elemento original", () => {
  for (const [type, collection] of [["organism", ORGANISMS], ["antibiotic", ANTIBIOTICS], ["mechanism", MECHANISMS]]) {
    for (const item of collection) assert.equal(findDetailItem(type, item.id), item);
  }
});
