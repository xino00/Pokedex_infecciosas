import {
  ANTIBIOTICS,
  CASES,
  COMBINATION_GAPS,
  DEEP_SECTIONS,
  MECHANISMS,
  ORGANISMS,
  SECTIONS,
} from "./catalog.js";
import {
  SEVERITY_OPTIONS,
  getAuditedFocusOptions,
  getAuditedGermOptions,
  getAuditedSeverityOptions,
  isAuditedScenario,
  resolveScenario,
} from "./rules.js";
import {
  buildMatrix,
  filterAntibiotics,
  filterMechanisms,
  filterOrganisms,
  optionLabel,
  toneClass,
} from "./selectors.js";
import { SOURCES, getSources } from "./sources.js";
import { assertDataIsValid } from "./validate.js";

const MATRIX = buildMatrix();
const DEFAULT_SCENARIO = Object.freeze({ germ: "blee", focus: "bacteriemia", severity: "invasiva" });
const DEFAULT_SCANNER = "ceftriaxone";

const state = {
  activeSection: "atlas",
  theme: readStoredTheme(),
  query: "",
  organismFilter: "all",
  scannerDrug: DEFAULT_SCANNER,
  ...DEFAULT_SCENARIO,
  detail: null,
};

try {
  assertDataIsValid();
  hydrateStateFromHash();
  start();
} catch (error) {
  renderFatalError(error);
}

function start() {
  document.documentElement.dataset.theme = state.theme;
  setText("organism-count", ORGANISMS.length);
  setText("antibiotic-count", ANTIBIOTICS.length);
  setText("mechanism-count", MECHANISMS.length);

  renderNavigation();
  renderSelectorOptions();
  renderScanner();
  renderMorphologyLanes();
  renderMatrix();
  renderCases();
  renderDeepContent();
  renderSourceList(document.querySelector("#source-list"), Object.keys(SOURCES), true);
  bindEvents();
  renderThemeButton();
  renderCatalogs();
  renderScenario();
  applyActiveSection();
  openDetailFromState();
}

function bindEvents() {
  document.querySelector("#global-search").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCatalogs();
  });

  document.querySelector("#organism-filters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    state.organismFilter = button.dataset.filter;
    document
      .querySelectorAll("#organism-filters button")
      .forEach((candidate) => candidate.classList.toggle("active", candidate === button));
    renderCatalogs();
  });

  document.querySelector("#theme-button").addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = state.theme;
    storeTheme(state.theme);
    renderThemeButton();
  });

  document.querySelectorAll("[data-go-section]").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.goSection));
  });

  document.querySelector("#germ-select").addEventListener("change", (event) => {
    state.germ = event.target.value;
    renderSelectorOptions();
    renderScenario();
    syncUrl();
  });
  document.querySelector("#focus-select").addEventListener("change", (event) => {
    state.focus = event.target.value;
    renderSelectorOptions();
    renderScenario();
    syncUrl();
  });
  document.querySelector("#severity-select").addEventListener("change", (event) => {
    state.severity = event.target.value;
    renderScenario();
    syncUrl();
  });

  document.querySelector("#scanner-drug").addEventListener("change", (event) => {
    state.scannerDrug = event.target.value;
    renderScanner();
    syncUrl();
  });
  document.querySelector("#scanner-open").addEventListener("click", () => {
    const row = MATRIX.rows.find(({ id }) => id === state.scannerDrug);
    const antibiotic = ANTIBIOTICS.find(({ id }) => id === row?.catalogId);
    if (antibiotic) openDetail(antibiotic, "antibiotic");
  });

  const dialog = document.querySelector("#detail-dialog");
  document.querySelector("#detail-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (!state.detail) return;
    state.detail = null;
    syncUrl();
  });

  window.addEventListener("hashchange", () => {
    resetShareableState();
    hydrateStateFromHash();
    renderNavigation();
    renderSelectorOptions();
    renderScanner();
    renderScenario();
    applyActiveSection();
    openDetailFromState();
  });
}

function renderNavigation() {
  const navigation = document.querySelector("#section-navigation");
  navigation.replaceChildren(
    ...SECTIONS.map((section, index) => {
      const button = element("button", {
        className: `nav-btn${section.id === state.activeSection ? " active" : ""}`,
        attrs: { type: "button", "aria-controls": section.id },
      });
      button.append(
        element("span", {
          className: "nav-index",
          text: String(index + 1).padStart(2, "0"),
          attrs: { "aria-hidden": "true" },
        }),
        element("span", { text: section.label }),
      );
      if (section.id === state.activeSection) button.setAttribute("aria-current", "page");
      button.addEventListener("click", () => activateSection(section.id));
      return button;
    }),
  );
  centerActiveNavigationItem(navigation);
}

function centerActiveNavigationItem(navigation) {
  if (!window.matchMedia("(max-width: 900px)").matches) return;
  const activeButton = navigation.querySelector(".nav-btn.active");
  if (!activeButton) return;
  window.requestAnimationFrame(() => {
    navigation.scrollTo({
      left: activeButton.offsetLeft - navigation.clientWidth / 2 + activeButton.clientWidth / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  });
}

function activateSection(sectionId, { scroll = true } = {}) {
  if (!SECTIONS.some(({ id }) => id === sectionId)) return;
  state.activeSection = sectionId;
  state.detail = null;
  const dialog = document.querySelector("#detail-dialog");
  if (dialog.open) dialog.close();
  applyActiveSection();
  renderNavigation();
  syncUrl();
  if (scroll) {
    document.querySelector(`#${sectionId}`).scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }
}

function applyActiveSection() {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("active", section.id === state.activeSection);
  });
}

function ensureSelectorState() {
  const germs = getAuditedGermOptions();
  if (!germs.some(({ id }) => id === state.germ)) state.germ = germs[0].id;

  const focuses = getAuditedFocusOptions(state.germ);
  if (!focuses.some(({ id }) => id === state.focus)) state.focus = focuses[0].id;

  const severities = getAuditedSeverityOptions(state.germ, state.focus);
  if (!severities.some(({ id }) => id === state.severity)) state.severity = severities[0].id;

  return { germs, focuses, severities };
}

function renderSelectorOptions() {
  const { germs, focuses, severities } = ensureSelectorState();
  fillSelect(document.querySelector("#germ-select"), germs, state.germ);
  fillSelect(document.querySelector("#focus-select"), focuses, state.focus);
  fillSelect(document.querySelector("#severity-select"), severities, state.severity);
}

function fillSelect(select, options, selectedId) {
  select.replaceChildren(
    ...options.map((option) => {
      const optionElement = element("option", { text: option.label, attrs: { value: option.id } });
      optionElement.selected = option.id === selectedId;
      return optionElement;
    }),
  );
}

function renderScanner() {
  const select = document.querySelector("#scanner-drug");
  fillSelect(select, MATRIX.rows.map(({ id, label }) => ({ id, label })), state.scannerDrug);

  const row = MATRIX.rows.find(({ id }) => id === state.scannerDrug) ?? MATRIX.rows[0];
  state.scannerDrug = row.id;
  select.value = row.id;

  document.querySelector("#scanner-strip").replaceChildren(
    ...row.cells.map((cell, index) => {
      const target = MATRIX.columns[index];
      const item = element("div", {
        className: `scanner-cell is-${cell.level}`,
        attrs: {
          role: "listitem",
          title: `${target.label}: ${coverageTitle(cell.level)}`,
          "aria-label": `${target.label}: ${coverageTitle(cell.level)}`,
        },
      });
      item.append(
        element("span", { className: "scanner-target", text: target.shortLabel }),
        element("strong", { className: `cov ${cell.level}`, text: cell.symbol, attrs: { "aria-hidden": "true" } }),
      );
      return item;
    }),
  );

  const antibiotic = ANTIBIOTICS.find(({ id }) => id === row.catalogId);
  const summary = document.querySelector("#scanner-summary");
  summary.replaceChildren(
    element("strong", { text: "Trampa: " }),
    document.createTextNode(antibiotic?.trap ?? "Revisar la ficha y el protocolo local."),
  );
  document.querySelector("#scanner-open").disabled = !antibiotic;
}

function renderMorphologyLanes() {
  renderLane("positive-lane", ORGANISMS.filter(({ group }) => group === "positive"));
  renderLane("negative-lane", ORGANISMS.filter(({ group }) => group === "negative"));
}

function renderLane(containerId, organisms) {
  const container = document.querySelector(`#${containerId}`);
  container.replaceChildren(
    ...organisms.map((organism) => {
      const button = element("button", {
        className: "lane-chip",
        text: organism.short,
        attrs: { type: "button" },
      });
      button.addEventListener("click", () => openDetail(organism, "organism"));
      return button;
    }),
  );
}

function renderCatalogs() {
  const organisms = filterOrganisms(ORGANISMS, state.query, state.organismFilter);
  const antibiotics = filterAntibiotics(ANTIBIOTICS, state.query);
  const mechanisms = filterMechanisms(MECHANISMS, state.query);

  replaceGrid("organism-grid", organisms.map((item) => renderCatalogCard(item, "organism")));
  replaceGrid("antibiotic-grid", antibiotics.map((item) => renderCatalogCard(item, "antibiotic")));
  replaceGrid("mechanism-grid", mechanisms.map(renderMechanismCard));
  toggleEmpty("organism-empty", organisms.length);
  toggleEmpty("antibiotic-empty", antibiotics.length);
  toggleEmpty("mechanism-empty", mechanisms.length);

  const status = document.querySelector("#search-status");
  status.textContent = state.query.trim()
    ? `${organisms.length} patógenos · ${antibiotics.length} fármacos · ${mechanisms.length} mecanismos`
    : "";
}

function replaceGrid(id, children) {
  document.querySelector(`#${id}`).replaceChildren(...children);
}

function toggleEmpty(id, resultCount) {
  document.querySelector(`#${id}`).hidden = resultCount > 0;
}

function renderCatalogCard(item, type) {
  const isOrganism = type === "organism";
  const card = element("button", {
    className: `pokedex-card ${toneClass(item.group)}`,
    attrs: { type: "button", "aria-label": `Abrir detalle de ${item.name}` },
  });
  card.append(
    renderCardTop(item, item.type, type),
    element("h3", { text: item.short || item.name }),
    element("p", { className: "card-subtitle", text: isOrganism ? item.syndromes : item.family }),
    renderMiniList([
      ["Cubre", isOrganism ? item.cover : item.covers.slice(0, 3).join(" · ")],
      ["Hueco", isOrganism ? item.gap : item.misses.slice(0, 3).join(" · ")],
      ["Trampa", item.trap],
    ]),
  );
  card.addEventListener("click", () => openDetail(item, type));
  return card;
}

function renderMechanismCard(mechanism) {
  const card = element("button", {
    className: `pokedex-card ${toneClass(mechanism.group)}`,
    attrs: { type: "button", "aria-label": `Abrir detalle de ${mechanism.name}` },
  });
  card.append(
    renderCardTop({ ...mechanism, dex: mechanism.id.toUpperCase() }, "Mecanismo", "mechanism"),
    element("h3", { text: mechanism.name }),
    element("p", { className: "card-subtitle", text: mechanism.question }),
    renderMiniList([
      ["Usar", mechanism.use],
      ["Evitar", mechanism.avoid],
      ["Micro", mechanism.micro],
    ]),
  );
  card.addEventListener("click", () => openDetail(mechanism, "mechanism"));
  return card;
}

function renderCardTop(item, badge, visualType) {
  const metadata = element("div", { className: "card-metadata" });
  metadata.append(
    element("div", { className: "dex-id", text: `#${item.dex}` }),
    element("span", { className: "type-badge", text: badge }),
  );
  const top = element("div", { className: "pokedex-top" });
  top.append(metadata, renderClinicalGlyph(visualType, item));
  return top;
}

function renderClinicalGlyph(type, item) {
  const glyph = element("span", {
    className: `clinical-glyph glyph-${type} ${glyphShape(item)}`,
    attrs: { "aria-hidden": "true" },
  });
  glyph.append(element("span"), element("span"), element("span"));
  return glyph;
}

function glyphShape(item) {
  const description = `${item.type ?? ""} ${item.name ?? ""}`.toLowerCase();
  if (description.includes("coco") || description.includes("staph") || description.includes("strep")) return "shape-cocci";
  if (description.includes("bacil") || description.includes("entero") || description.includes("pseudomonas")) return "shape-rods";
  return "shape-mixed";
}

function renderMiniList(rows) {
  const list = element("div", { className: "mini-list" });
  list.append(
    ...rows.map(([label, value]) => {
      const row = element("div", { className: "mini-row" });
      row.append(element("b", { text: label }), element("span", { text: value }));
      return row;
    }),
  );
  return list;
}

function openDetail(item, type, { updateUrl = true } = {}) {
  const content = document.querySelector("#detail-content");
  const isOrganism = type === "organism";
  const isMechanism = type === "mechanism";
  const metadata = element("div", { className: "drawer-meta" });
  metadata.append(
    element("span", { className: "pill", text: `#${item.dex || item.id}` }),
    element("span", {
      className: "pill",
      text: isOrganism ? item.type : isMechanism ? "Mecanismo" : item.family,
    }),
    ...(item.tags ?? []).map((tag) => element("span", { className: "pill", text: tag })),
  );

  const blocks = [];
  if (isOrganism) {
    blocks.push(
      infoBlock("Síndromes", item.syndromes),
      infoBlock("Sensible / estrategia", item.cover),
      infoBlock("Hueco intrínseco", item.gap),
      infoBlock("Trampa de guardia", item.trap),
    );
  } else if (isMechanism) {
    blocks.push(
      infoBlock("Pregunta que cambia todo", item.question),
      infoBlock("Usar / preferir", item.use),
      infoBlock("Evitar", item.avoid),
      infoBlock("Qué pedir a Micro", item.micro),
    );
  } else {
    blocks.push(
      infoListBlock("Cubre", item.covers),
      infoListBlock("No cubre / no elegir", item.misses),
      infoBlock("Trampa", item.trap),
    );
  }

  const sourcesBlock = element("div", { className: "info-block" });
  sourcesBlock.append(element("h4", { text: "Fuentes" }));
  const sourcesList = element("ul", { className: "source-list" });
  renderSourceList(sourcesList, item.sourceIds);
  sourcesBlock.append(sourcesList);

  content.replaceChildren(
    renderClinicalGlyph(type, item),
    element("h2", { id: "detail-title", className: "drawer-title", text: item.name }),
    metadata,
    ...blocks,
    sourcesBlock,
  );

  state.detail = { type, id: item.id };
  if (updateUrl) syncUrl();
  const dialog = document.querySelector("#detail-dialog");
  if (!dialog.open) dialog.showModal();
}

function openDetailFromState() {
  const dialog = document.querySelector("#detail-dialog");
  if (!state.detail) {
    if (dialog.open) dialog.close();
    return;
  }
  const item = findDetailItem(state.detail.type, state.detail.id);
  if (!item) {
    state.detail = null;
    syncUrl();
    return;
  }
  openDetail(item, state.detail.type, { updateUrl: false });
}

function findDetailItem(type, id) {
  const collections = { organism: ORGANISMS, antibiotic: ANTIBIOTICS, mechanism: MECHANISMS };
  return collections[type]?.find((item) => item.id === id) ?? null;
}

function infoBlock(title, text) {
  const block = element("div", { className: "info-block" });
  block.append(element("h4", { text: title }), element("p", { text }));
  return block;
}

function infoListBlock(title, items) {
  const block = element("div", { className: "info-block" });
  const list = element("ul");
  list.append(...items.map((item) => element("li", { text: item })));
  block.append(element("h4", { text: title }), list);
  return block;
}

function renderMatrix() {
  const headingRow = element("tr");
  headingRow.append(element("th", { text: "Fármaco", attrs: { scope: "col" } }));
  for (const column of MATRIX.columns) {
    const heading = element("th", { attrs: { scope: "col", title: column.label } });
    heading.append(element("abbr", { text: column.shortLabel, attrs: { title: column.label } }));
    headingRow.append(heading);
  }
  document.querySelector("#matrix-head").replaceChildren(headingRow);

  let previousGroup = null;
  const bodyRows = [];
  for (const row of MATRIX.rows) {
    if (row.group !== previousGroup) {
      const groupRow = element("tr", { className: "matrix-group" });
      groupRow.append(
        element("th", {
          text: row.group,
          attrs: { scope: "rowgroup" },
        }),
        element("td", { attrs: { colspan: MATRIX.columns.length, "aria-hidden": "true" } }),
      );
      bodyRows.push(groupRow);
      previousGroup = row.group;
    }

    const tableRow = element("tr");
    const rowHeading = element("th", { attrs: { scope: "row" } });
    const antibiotic = ANTIBIOTICS.find(({ id }) => id === row.catalogId);
    const rowButton = element("button", { className: "matrix-drug", text: row.label, attrs: { type: "button" } });
    if (antibiotic) rowButton.addEventListener("click", () => openDetail(antibiotic, "antibiotic"));
    else rowButton.disabled = true;
    rowHeading.append(rowButton);
    tableRow.append(rowHeading);
    for (const cell of row.cells) {
      const tableCell = element("td");
      tableCell.append(
        element("span", {
          className: `cov ${cell.level}`,
          text: cell.symbol,
          attrs: { title: coverageTitle(cell.level), "aria-label": coverageTitle(cell.level) },
        }),
      );
      tableRow.append(tableCell);
    }
    bodyRows.push(tableRow);
  }
  document.querySelector("#matrix-body").replaceChildren(...bodyRows);
}

function coverageTitle(level) {
  return level === "yes" ? "Cubre" : level === "maybe" ? "Variable o no de elección" : "No cubre";
}

function renderScenario() {
  const input = { focus: state.focus, germ: state.germ, severity: state.severity };
  if (!isAuditedScenario(input)) throw new Error("El selector intentó mostrar una ruta no auditada.");
  const scenario = resolveScenario(input);
  if (!scenario?.ruleId || scenario.scope !== "specific") {
    throw new Error("No se pudo resolver la regla específica seleccionada.");
  }

  setText("scenario-headline", scenario.headline);
  setText("severity-pill", optionLabel(SEVERITY_OPTIONS, state.severity));
  setText("scenario-alert", scenario.alert);
  setText("scenario-scope", "Ruta auditada");
  setText("route-summary", `Regla ${scenario.ruleId} · ${optionLabel(getAuditedFocusOptions(state.germ), state.focus)}.`);
  renderTextList("scenario-do", scenario.doItems);
  renderTextList("scenario-avoid", scenario.avoidItems);
  renderTextList("scenario-micro", scenario.microItems);
  renderSourceList(document.querySelector("#scenario-sources"), scenario.sourceIds);
}

function renderCases() {
  document.querySelector("#case-grid").replaceChildren(
    ...CASES.map((clinicalCase, index) => {
      const card = element("article", { className: "case-card" });
      const result = element("div", { className: "case-result" });
      result.append(element("strong", { text: "Lectura:" }), document.createTextNode(` ${clinicalCase.answer}`));
      card.append(
        element("span", { className: "case-index", text: String(index + 1).padStart(2, "0") }),
        element("h3", { text: clinicalCase.title }),
        element("p", { text: clinicalCase.setup }),
        result,
      );
      return card;
    }),
  );
}

function renderDeepContent() {
  const container = document.querySelector("#deep-sections");
  container.replaceChildren(
    ...DEEP_SECTIONS.map((section) => {
      const details = element("details", { className: "source-details" });
      const list = element("ul");
      list.append(...section.body.map((item) => element("li", { text: item })));
      details.append(element("summary", { text: section.title }), list);
      return details;
    }),
  );
  renderTextList("combination-gaps", COMBINATION_GAPS);
}

function renderSourceList(container, sourceIds, showScope = false) {
  const sources = getSources(sourceIds);
  container.replaceChildren(
    ...sources.map((source) => {
      const item = element("li");
      const label = `${source.title} · ${source.version}`;
      item.append(
        source.url
          ? element("a", { text: label, attrs: { href: source.url, target: "_blank", rel: "noreferrer" } })
          : element("span", { text: label }),
      );
      if (showScope) {
        item.append(
          element("div", {
            className: "source-note",
            text: `${source.scope} Fuente registrada: ${source.registeredAt}.`,
          }),
        );
      }
      return item;
    }),
  );
}

function renderTextList(id, items) {
  document.querySelector(`#${id}`).replaceChildren(...items.map((item) => element("li", { text: item })));
}

function renderThemeButton() {
  setText("theme-label", state.theme === "light" ? "Oscuro" : "Claro");
  setText("theme-symbol", state.theme === "light" ? "◐" : "☼");
  document.querySelector("#theme-button").setAttribute(
    "aria-label",
    state.theme === "light" ? "Activar tema oscuro" : "Activar tema claro",
  );
  document.querySelector('meta[name="theme-color"]').content = state.theme === "light" ? "#f2f5f7" : "#0a111c";
}

function hydrateStateFromHash() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const view = params.get("view");
  if (SECTIONS.some(({ id }) => id === view)) state.activeSection = view;

  const scannerDrug = params.get("scanner");
  if (MATRIX.rows.some(({ id }) => id === scannerDrug)) state.scannerDrug = scannerDrug;

  const scenario = {
    germ: params.get("germ"),
    focus: params.get("focus"),
    severity: params.get("severity"),
  };
  if (isAuditedScenario(scenario)) Object.assign(state, scenario);

  const detailValue = params.get("detail");
  if (detailValue) {
    const [type, id] = detailValue.split(":");
    if (findDetailItem(type, id)) state.detail = { type, id };
  }
}

function resetShareableState() {
  state.activeSection = "atlas";
  state.scannerDrug = DEFAULT_SCANNER;
  Object.assign(state, DEFAULT_SCENARIO);
  state.detail = null;
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.activeSection !== "atlas") params.set("view", state.activeSection);
  if (state.scannerDrug !== DEFAULT_SCANNER) params.set("scanner", state.scannerDrug);
  if (state.activeSection === "wizard") {
    params.set("germ", state.germ);
    params.set("focus", state.focus);
    params.set("severity", state.severity);
  }
  if (state.detail) params.set("detail", `${state.detail.type}:${state.detail.id}`);
  const hash = params.toString();
  window.history.replaceState(null, "", hash ? `#${hash}` : `${window.location.pathname}${window.location.search}`);
}

function setText(id, value) {
  document.querySelector(`#${id}`).textContent = String(value);
}

function element(tagName, options = {}) {
  const node = document.createElement(tagName);
  if (options.id) node.id = options.id;
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = String(options.text);
  for (const [name, value] of Object.entries(options.attrs ?? {})) {
    node.setAttribute(name, String(value));
  }
  return node;
}

function readStoredTheme() {
  try {
    const stored = localStorage.getItem("proadex-theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // La preferencia del sistema sigue disponible sin almacenamiento local.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function storeTheme(theme) {
  try {
    localStorage.setItem("proadex-theme", theme);
  } catch {
    // La preferencia no es esencial si el navegador bloquea almacenamiento local.
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function renderFatalError(error) {
  const app = document.querySelector("#app");
  app.className = "fatal-error";
  app.replaceChildren(
    element("strong", { text: "PROADEX no se ha iniciado porque sus datos no pasan la validación." }),
    element("p", { text: error instanceof Error ? error.message : String(error) }),
  );
  console.error(error);
}
