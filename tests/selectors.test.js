import test from "node:test";
import assert from "node:assert/strict";
import { ANTIBIOTICS, MECHANISMS, ORGANISMS } from "../src/catalog.js";
import { filterAntibiotics, filterMechanisms, filterOrganisms } from "../src/selectors.js";

test("los espacios exteriores no alteran los resultados en ninguno de los catálogos", () => {
  for (const [filter, items, query] of [
    [filterAntibiotics, ANTIBIOTICS, "ceftriaxona"],
    [filterOrganisms, ORGANISMS, "Listeria"],
    [filterMechanisms, MECHANISMS, "BLEE"],
  ]) {
    assert.ok(filter(items, query).length);
    assert.deepEqual(filter(items, ` \t${query} \n`), filter(items, query));
    assert.deepEqual(filter(items, "   "), items);
  }
});

test("una consulta vacía respeta el filtro de grupo del atlas", () => {
  assert.deepEqual(filterOrganisms(ORGANISMS, "   ", "positive"), ORGANISMS.filter(({ group }) => group === "positive"));
});
