import test from "node:test";
import assert from "node:assert/strict";

import { validateData } from "../src/validate.js";

test("el catálogo, las fuentes, la matriz y las reglas son coherentes", () => {
  assert.deepEqual(validateData(), []);
});
