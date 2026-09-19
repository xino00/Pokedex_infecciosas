import assert from "node:assert/strict";
import { ANTIBIOTICS, MECHANISMS, ORGANISMS } from "../src/catalog.js";
import { AUDITED_SCENARIOS, resolveScenario } from "../src/rules.js";

// Recibe una Page de Playwright y una URL HTTP o file://; sin dependencias de producción.
export async function verifyBrowser(page, baseUrl) {
  const errors = [];
  const onError = (error) => errors.push(error.message);
  page.on("pageerror", onError);
  const navigate = async (hash = "") => {
    await page.goto(`${baseUrl.split("#")[0]}#${hash}`);
    // Fuerza también el arranque para navegación que solo cambia el fragmento.
    await page.reload();
  };
  const checkUnavailable = async () => {
    assert.equal(await page.locator("#scenario-headline").innerText(), "Ruta no disponible");
    assert.equal(await page.locator("#scenario-scope").innerText(), "Sin recomendación");
    assert.equal(await page.locator("#scenario-guidance").isVisible(), false);
    assert.equal(await page.locator("#scenario-do li").count(), 0);
    assert.equal(await page.locator("#scenario-follow-up li").count(), 0);
    assert.equal(await page.locator("#germ-select").isDisabled(), true);
  };
  try {
    await navigate();
    assert.equal(await page.locator(".pokedex-card").count(), ORGANISMS.length + ANTIBIOTICS.length + MECHANISMS.length);

    for (const type of ["toString", "constructor", "__proto__", "hasOwnProperty", "unknown"]) {
      await navigate(`detail=${type}:x`);
      assert.equal(await page.locator("#app.fatal-error").count(), 0, type);
      assert.equal(await page.locator("#detail-dialog").isVisible(), false, type);
    }

    for (const query of [
      "germ=kpc&focus=bacteriemia&severity=critico",
      "germ=blee&focus=cistitis&severity=invasiva",
      "germ=blee&focus=cistitis&severity=critico",
      "germ=blee&focus=endocarditis&severity=critico",
      "germ=blee&focus=snc",
      "germ=&focus=&severity=",
      "germ=blee&germ=kpc&focus=snc&severity=critico",
    ]) {
      await navigate(`view=wizard&${query}`);
      await checkUnavailable();
      await page.locator("#scanner-drug").selectOption("imipenem");
      await page.reload();
      await checkUnavailable();
      await page.locator("[aria-controls='atlas']").click();
      await page.locator("[aria-controls='wizard']").click();
      await checkUnavailable();
      await page.locator("#scenario-reset").click();
      assert.equal(await page.locator("#scenario-guidance").isVisible(), true);
      assert.equal(await page.locator("#scenario-scope").innerText(), "Orientación por foco");
      assert.equal(await page.evaluate(() => document.activeElement.id), "germ-select");
    }

    for (const input of AUDITED_SCENARIOS) {
      const query = Object.entries(input).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");
      await navigate(`view=wizard&${query}`);
      for (const [dimension, value] of Object.entries(input)) {
        assert.equal(await page.locator(`#${dimension}-select`).inputValue(), value);
      }
      assert.equal(await page.locator("#scenario-headline").innerText(), resolveScenario(input).headline);
      assert.deepEqual(await page.locator("#scenario-follow-up li").allTextContents(), [...resolveScenario(input).followUpItems]);
      assert.equal(await page.locator("#scenario-guidance").isVisible(), true);
    }

    await navigate("view=wizard&germ=enterolisteria&focus=snc&severity=invasiva");
    assert.equal(await page.locator("#germ-select").inputValue(), "listeria");
    assert.match(await page.locator("#scenario-headline").innerText(), /Listeria/);
    await page.locator("#severity-select").selectOption("critico");
    assert.match(page.url(), /germ=listeria/);

    await page.locator("#germ-select").selectOption("sarm");
    await page.locator("#focus-select").selectOption("piel");
    await page.locator("#severity-select").selectOption("estable");
    assert.match(await page.locator("#scenario-headline").innerText(), /SARM en piel/);
    await page.locator("#focus-select").selectOption("bacteriemia");
    assert.equal(await page.locator("#severity-select").inputValue(), "invasiva");
    assert.match(await page.locator("#scenario-micro").innerText(), /hemocultivos/);
    await page.locator("#germ-select").selectOption("listeria");
    assert.equal(await page.locator("#focus-select").inputValue(), "snc");

    await page.locator("[aria-controls='cases']").click();
    const bleeCase = page.locator("#case-grid .case-card").nth(4);
    assert.equal(await bleeCase.locator("h3").innerText(), "BLEE: el tratamiento depende del foco");
    assert.doesNotMatch(await bleeCase.innerText(), /Pielo\/cUTI|no es una sola rama/);
    await bleeCase.locator("summary").click();
    assert.equal(await bleeCase.locator("a[href*='amr-guidance']").count(), 1);
    await page.locator("[aria-controls='wizard']").click();

    // El mismo fallo debe quedar bloqueado sin recargar una salida válida anterior.
    await page.evaluate(() => { location.hash = "view=wizard&germ=kpc&focus=bacteriemia&severity=critico"; });
    await page.waitForFunction(() => document.querySelector("#scenario-scope").textContent === "Sin recomendación");
    await checkUnavailable();
    await page.locator("#scenario-reset").click();

    const beforeSkip = page.url();
    await page.locator(".skip-link").focus();
    await page.keyboard.press("Enter");
    assert.equal(page.url(), beforeSkip);
    assert.equal(await page.locator(".section.active").getAttribute("id"), "wizard");
    assert.equal(await page.evaluate(() => document.activeElement.id), "main-content");
    await page.locator("[aria-controls='antibiotics']").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute("aria-controls")), "antibiotics");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute("aria-controls")), "mechanisms");

    await page.locator("#global-search").fill("ceftriaxona");
    const searchResults = await page.locator("#antibiotic-grid").innerText();
    await page.locator("#global-search").fill(" ceftriaxona ");
    assert.equal(await page.locator("#antibiotic-grid").innerText(), searchResults);
    await page.locator("#global-search").fill("   ");
    assert.equal(await page.locator("#antibiotic-grid .pokedex-card").count(), ANTIBIOTICS.length);
    await page.locator("#global-search").fill("");

    let details = 0;
    for (const section of ["atlas", "antibiotics", "mechanisms"]) {
      await page.locator(`[aria-controls='${section}']`).click();
      const cards = page.locator(`#${section} .pokedex-card`);
      for (let index = 0; index < await cards.count(); index++) {
        await cards.nth(index).click();
        assert.ok(await page.locator("#detail-title").innerText());
        await page.keyboard.press("Escape");
        assert.equal(await page.locator("#detail-dialog").isVisible(), false);
        details++;
      }
    }

    await navigate("scanner=mero-imi&detail=antibiotic:mero-imi");
    assert.equal(await page.locator("#scanner-drug").inputValue(), "meropenem");
    assert.match(await page.locator("#detail-title").innerText(), /Meropenem.*imipenem/);
    await page.keyboard.press("Escape");
    await page.locator("#scanner-drug").selectOption("imipenem");
    assert.match(await page.locator("#scanner-summary").innerText(), /no se recomienda para meningitis/);
    assert.match(await page.locator("#scanner-strip .scanner-cell").nth(3).getAttribute("aria-label"), /Cubre/);
    await page.locator("#scanner-drug").selectOption("meropenem");
    assert.match(await page.locator("#scanner-strip .scanner-cell").nth(4).getAttribute("aria-label"), /Cubre/);
    assert.match(await page.locator("#scanner-summary").innerText(), /sensibilidad natural intermedia/);

    await page.locator("[aria-controls='antibiotics']").click();
    await page.locator("#global-search").fill("quinolonas");
    assert.equal(await page.locator("#antibiotic-grid .pokedex-card").count(), 3);
    await page.locator("#global-search").fill("");
    for (const [id, name] of [["ciprofloxacin", "Ciprofloxacino"], ["levofloxacin", "Levofloxacino"], ["moxifloxacin", "Moxifloxacino"]]) {
      await navigate(`view=matrix&scanner=${id}`);
      assert.equal(await page.locator("#scanner-drug").inputValue(), id);
      await page.locator("#matrix").getByRole("button", { name, exact: true }).click();
      assert.equal(await page.locator("#detail-title").innerText(), name);
      assert.match(await page.locator("#detail-content").innerText(), /Precauciones de la familia/i);
      assert.equal(await page.locator("#detail-content a[href*='cima.aemps.es']").count(), 1);
      await page.reload();
      assert.equal(await page.locator("#detail-title").innerText(), name);
      await page.keyboard.press("Escape");
      await page.locator("#scanner-open").click();
      assert.equal(await page.locator("#detail-title").innerText(), name);
      await page.keyboard.press("Escape");
      if (id !== "ciprofloxacin") {
        const listeria = page.locator("#scanner-strip .scanner-cell").nth(4);
        assert.equal(await listeria.locator(".cov").innerText(), "?");
        assert.match(await listeria.getAttribute("aria-label"), /Cobertura clínica no establecida/);
      }
    }
    assert.match(await page.locator("#scanner-summary").innerText(), /no está indicado para ITU/);
    assert.match(await page.locator("#scanner-strip .scanner-cell").nth(7).getAttribute("aria-label"), /No cubre/);
    assert.equal(await page.locator("#matrix-body .cov.unknown").count(), 2);
    assert.equal(await page.locator("#matrix .legend .cov.unknown").innerText(), "?");

    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const section of ["atlas", "antibiotics", "mechanisms", "matrix", "wizard", "cases", "deep"]) {
        await page.locator(`[aria-controls='${section}']`).click();
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${section} a ${width}px`);
      }
    }
    await page.locator("#theme-button").click();
    const theme = await page.locator("html").getAttribute("data-theme");
    await page.reload();
    assert.equal(await page.locator("html").getAttribute("data-theme"), theme);
    assert.deepEqual(errors, []);
    return { protocol: baseUrl.split(":")[0], routes: AUDITED_SCENARIOS.length, details, quinolones: 3, viewports: 4, errors };
  } finally {
    page.off("pageerror", onError);
  }
}
