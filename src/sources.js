export const SOURCES = Object.freeze({
  "local-proa-fjd": Object.freeze({
    id: "local-proa-fjd",
    title: "Material local PROA FJD y vault MIR",
    version: "Documentos locales revisados para esta edición",
    registeredAt: "2026-08-10",
    scope:
      "PROA - Betalactámicos y Cefalosporinas; Sepsis - Antiinfecciosos y Soporte Vital; Meningitis y Encefalitis.",
    url: null,
  }),
  "idsa-amr-2024": Object.freeze({
    id: "idsa-amr-2024",
    title:
      "IDSA 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections",
    version: "4.0 (2024)",
    registeredAt: "2026-08-10",
    scope: "BLEE, AmpC, CRE, Pseudomonas DTR, CRAB y Stenotrophomonas.",
    url: "https://www.idsociety.org/globalassets/idsa/practice-guidelines/amr-guidance/4.0/amr-guidance-4.0.pdf",
  }),
  "cdc-gonorrhea-2021": Object.freeze({
    id: "cdc-gonorrhea-2021",
    title:
      "CDC STI Treatment Guidelines: Gonococcal Infections Among Adolescents and Adults",
    version: "2021",
    registeredAt: "2026-08-10",
    scope: "Gonococo, infección faríngea, test de curación y sospecha de fallo.",
    url: "https://www.cdc.gov/std/treatment-guidelines/gonorrhea-adults.htm",
  }),
});

export function getSources(sourceIds) {
  return sourceIds.map((sourceId) => SOURCES[sourceId]).filter(Boolean);
}
