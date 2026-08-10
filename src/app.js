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
  FOCUS_OPTIONS,
  GERM_OPTIONS,
  SEVERITY_OPTIONS,
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

const state = {
  activeSection: "atlas",
  theme: readStoredTheme(),
  query: "",
  organismFilter: "all",
  focus: "bacteriemia",
  germ: "blee",
  severity: "invasiva",
};

try {
  assertDataIsValid();
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
  renderMorphologyLanes();
  renderMatrix();
  renderCases();
  renderDeepContent();
  renderSourceList(document.querySelector("#source-list"), Object.keys(SOURCES), true);
  bindEvents();
  renderThemeButton();
  renderCatalogs();
  renderScenario();
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

  document.querySelector("#focus-select").addEventListener("change", (event) => {
    state.focus = event.target.value;
    renderScenario();
  });
  document.querySelector("#germ-select").addEventListener("change", (event) => {
    state.germ = event.target.value;
    renderScenario();
  });
  document.querySelector("#severity-select").addEventListener("change", (event) => {
    state.severity = event.target.value;
    renderScenario();
  });

  const dialog = document.querySelector("#detail-dialog");
  document.querySelector("#detail-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function renderNavigation() {
  const navigation = document.querySelector("#section-navigation");
  navigation.replaceChildren(
    ...SECTIONS.map((section) => {
      const button = element("button", {
        className: `nav-btn${section.id === state.activeSection ? " active" : ""}`,
        attrs: { type: "button", "aria-controls": section.id },
      });
      button.append(
        element("span", { className: "nav-ico", text: section.icon, attrs: { "aria-hidden": "true" } }),
        document.createTextNode(section.label),
      );
      button.addEventListener("click", () => activateSection(section.id));
      return button;
    }),
  );
}

function activateSection(sectionId) {
  state.activeSection = sectionId;
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
  document.querySelectorAll(".nav-btn").forEach((button, index) => {
    const isActive = SECTIONS[index].id === sectionId;
    button.classList.toggle("active", isActive);
    if (isActive) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  document.querySelector("#detail-dialog").close();
  document.querySelector("main").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSelectorOptions() {
  fillSelect(document.querySelector("#focus-select"), FOCUS_OPTIONS, state.focus);
  fillSelect(document.querySelector("#germ-select"), GERM_OPTIONS, state.germ);
  fillSelect(document.querySelector("#severity-select"), SEVERITY_OPTIONS, state.severity);
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
    ? `${organisms.length} bacterias · ${antibiotics.length} antibióticos · ${mechanisms.length} mecanismos`
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
    renderCardTop(item, item.type),
    element("h3", { text: item.short || item.name }),
    element("p", { text: isOrganism ? item.syndromes : item.family }),
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
    renderCardTop({ ...mechanism, dex: mechanism.id.toUpperCase() }, "Mecanismo"),
    element("h3", { text: mechanism.name }),
    element("p", { text: mechanism.question }),
    renderMiniList([
      ["Usar", mechanism.use],
      ["Evitar", mechanism.avoid],
      ["Micro", mechanism.micro],
    ]),
  );
  card.addEventListener("click", () => openDetail(mechanism, "mechanism"));
  return card;
}

function renderCardTop(item, badge) {
  const metadata = element("div");
  metadata.append(
    element("div", { className: "dex-id", text: `#${item.dex}` }),
    element("span", { className: "type-badge", text: badge }),
  );
  const top = element("div", { className: "pokedex-top" });
  top.append(metadata, element("div", { className: "pokedex-icon", text: item.icon, attrs: { "aria-hidden": "true" } }));
  return top;
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

function openDetail(item, type) {
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
    element("div", { className: "pokedex-icon", text: item.icon, attrs: { "aria-hidden": "true" } }),
    element("h2", { id: "detail-title", className: "drawer-title", text: item.name }),
    metadata,
    ...blocks,
    sourcesBlock,
  );

  const dialog = document.querySelector("#detail-dialog");
  if (!dialog.open) dialog.showModal();
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
  const matrix = buildMatrix();
  const headingRow = element("tr");
  headingRow.append(
    element("th", { text: "Fármaco", attrs: { scope: "col" } }),
    ...matrix.columns.map((column) => element("th", { text: column.label, attrs: { scope: "col" } })),
  );
  document.querySelector("#matrix-head").replaceChildren(headingRow);
  document.querySelector("#matrix-body").replaceChildren(
    ...matrix.rows.map((row) => {
      const tableRow = element("tr");
      tableRow.append(
        element("td", { text: row.label }),
        ...row.cells.map((cell) => {
          const tableCell = element("td");
          tableCell.append(
            element("span", {
              className: `cov ${cell.level}`,
              text: cell.symbol,
              attrs: { title: coverageTitle(cell.level), "aria-label": coverageTitle(cell.level) },
            }),
          );
          return tableCell;
        }),
      );
      return tableRow;
    }),
  );
}

function coverageTitle(level) {
  return level === "yes" ? "Cubre" : level === "maybe" ? "Variable o no de elección" : "No cubre";
}

function renderScenario() {
  const scenario = resolveScenario({ focus: state.focus, germ: state.germ, severity: state.severity });
  if (!scenario) throw new Error("No se pudo resolver el escenario seleccionado.");

  setText("scenario-headline", scenario.headline);
  setText("severity-pill", optionLabel(SEVERITY_OPTIONS, state.severity));
  setText("scenario-alert", scenario.alert);
  renderTextList("scenario-do", scenario.doItems);
  renderTextList("scenario-avoid", scenario.avoidItems);
  renderTextList("scenario-micro", scenario.microItems);
  renderSourceList(document.querySelector("#scenario-sources"), scenario.sourceIds);

  const scope = document.querySelector("#scenario-scope");
  scope.className = `pill scenario-scope ${scenario.scope}`;
  scope.textContent = {
    specific: "Regla específica",
    contextual: "Regla de contexto",
    "germ-only": "Orientación por germen",
  }[scenario.scope];
}

function renderCases() {
  document.querySelector("#case-grid").replaceChildren(
    ...CASES.map((clinicalCase) => {
      const card = element("article", { className: "case-card" });
      const result = element("div", { className: "case-result" });
      result.append(element("strong", { text: "Lectura:" }), document.createTextNode(` ${clinicalCase.answer}`));
      card.append(
        element("span", { className: "pill", text: "Caso" }),
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
  setText("theme-button", state.theme === "light" ? "Modo oscuro" : "Modo claro");
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
    return localStorage.getItem("proadex-theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("proadex-theme", theme);
  } catch {
    // La preferencia no es esencial si el navegador bloquea almacenamiento local.
  }
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
