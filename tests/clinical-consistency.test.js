import test from "node:test";
import assert from "node:assert/strict";
import { ANTIBIOTICS, MECHANISMS, ORGANISMS } from "../src/catalog.js";
import { GERM_GUIDANCE } from "../src/rules.js";

test("Stenotrophomonas comparte revisión, fuentes y límite de evidencia en sus tres vistas", () => {
  const organism = ORGANISMS.find(({ id }) => id === "steno");
  const mechanism = MECHANISMS.find(({ id }) => id === "steno");
  const guidance = GERM_GUIDANCE.steno;
  assert.equal(organism.cover, guidance.doItems.join(" "));
  assert.equal(mechanism.use, organism.cover);
  assert.equal(mechanism.micro, organism.trap);
  assert.match(organism.trap, /evidencia clínica limitada/);
  for (const item of [organism, mechanism, guidance]) assert.ok(item.sourceIds.includes("idsa-amr-2026"));
});

test("MBL identifica Enterobacterales y no conserva opciones sin respaldo asignado", () => {
  const mechanism = MECHANISMS.find(({ id }) => id === "mbl");
  assert.match(mechanism.question, /Enterobacterales/);
  assert.equal(mechanism.use, GERM_GUIDANCE.mbl.doItems.join(" "));
  assert.doesNotMatch(JSON.stringify([ANTIBIOTICS, MECHANISMS, GERM_GUIDANCE]), /cefepime-zidebactam/i);
  assert.deepEqual(mechanism.sourceIds, ["idsa-amr-2024", "idsa-amr-2026"]);
});
