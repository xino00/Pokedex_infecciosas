import { COVERAGE, COVERAGE_TARGETS, coverageSymbol } from "./coverage.js";

export function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterOrganisms(organisms, query, group = "all") {
  const needle = normalize(query);
  return organisms.filter((organism) => {
    const matchesGroup = group === "all" || organism.group === group;
    const haystack = [
      organism.name,
      organism.short,
      organism.type,
      organism.tags.join(" "),
      organism.syndromes,
      organism.cover,
      organism.gap,
      organism.trap,
      organism.search,
    ].join(" ");
    return matchesGroup && normalize(haystack).includes(needle);
  });
}

export function filterAntibiotics(antibiotics, query) {
  const needle = normalize(query);
  return antibiotics.filter((antibiotic) =>
    normalize(
      [
        antibiotic.name,
        antibiotic.family,
        antibiotic.type,
        antibiotic.covers.join(" "),
        antibiotic.misses.join(" "),
        antibiotic.trap,
        antibiotic.search,
      ].join(" "),
    ).includes(needle),
  );
}

export function filterMechanisms(mechanisms, query) {
  const needle = normalize(query);
  return mechanisms.filter((mechanism) =>
    normalize(
      [
        mechanism.name,
        mechanism.question,
        mechanism.use,
        mechanism.avoid,
        mechanism.micro,
        mechanism.search,
      ].join(" "),
    ).includes(needle),
  );
}

export function buildMatrix() {
  return Object.freeze({
    columns: COVERAGE_TARGETS,
    rows: Object.freeze(
      COVERAGE.map((entry) =>
        Object.freeze({
          id: entry.id,
          catalogId: entry.catalogId,
          label: entry.label,
          group: entry.group,
          cells: Object.freeze(
            COVERAGE_TARGETS.map((target) => {
              const level = entry.values[target.id];
              return Object.freeze({ targetId: target.id, level, symbol: coverageSymbol(level) });
            }),
          ),
        }),
      ),
    ),
  });
}

export function toneClass(group) {
  const semanticGroups = {
    positive: "accent-positive",
    negative: "accent-negative",
    anaerobe: "accent-anaerobe",
    atypical: "accent-atypical",
  };
  return semanticGroups[group] ?? `accent-${group}`;
}

export function optionLabel(options, id) {
  return options.find((option) => option.id === id)?.label ?? id;
}
