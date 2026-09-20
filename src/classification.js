import { normalize } from "./selectors.js";

// Esquema de identificación: no alimenta la matriz ni las reglas terapéuticas.
// La imagen aportada se conserva como referencia; los matices tienen fuentes propias.
const classificationData = [
  {
    id: "negative-rods", title: "Bacilos gramnegativos", short: "Bacilos Gram −",
    rows: [
      {
        id: "lactose-positive", setting: "Aerobios o facultativos", test: "Lactosa positiva habitual",
        taxa: ["Escherichia coli (E. coli)", "Klebsiella", "Enterobacter"],
        note: "La fermentación puede variar entre especies y cepas. Una prueba de lactosa negativa no equivale a ser un no fermentador de glucosa.",
        organismIds: ["ecoli-kleb-prot", "ampc-trio"], sourceIds: ["uk-smi-id16"],
      },
      {
        id: "oxidase-negative", setting: "Aerobios o facultativos", test: "Lactosa negativa o variable · Oxidasa negativa",
        taxa: ["Citrobacter", "Serratia", "Proteus", "Providencia", "Morganella", "Salmonella", "Shigella", "Yersinia", "Acinetobacter", "Stenotrophomonas"],
        note: "La fermentación de lactosa varía según la especie; Citrobacter puede ser positivo. Acinetobacter y Stenotrophomonas se incluyen entre los no fermentadores de glucosa.",
        organismIds: ["ecoli-kleb-prot", "ampc-trio", "acinetobacter", "steno"], sourceIds: ["uk-smi-id16", "uk-smi-id17"],
      },
      {
        id: "oxidase-positive", setting: "Aerobios o facultativos", test: "Lactosa habitualmente negativa · Oxidasa positiva",
        taxa: ["Pseudomonas", "Aeromonas", "Achromobacter", "Burkholderia", "Vibrio"],
        note: "Esquema orientativo: hay variabilidad por especie. P. aeruginosa es oxidasa positiva, pero no todas las Pseudomonas lo son. Vibrio incluye bacilos curvos.",
        organismIds: ["pseudomonas"], sourceIds: ["uk-smi-id1", "uk-smi-id17", "asm-achromobacter"],
      },
      {
        id: "negative-anaerobic-rods", setting: "Anaerobios", test: "Bacilos",
        taxa: ["Bacteroides", "Prevotella", "Fusobacterium", "Porphyromonas"],
        organismIds: ["bacteroides"], sourceIds: ["uk-smi-id1"],
      },
      {
        id: "negative-fastidious", setting: "Exigentes o con cultivo especial", test: "Bacilos / cocobacilos",
        taxa: ["Capnocytophaga", "Haemophilus", "Cardiobacterium", "Eikenella", "Kingella", "Legionella", "Pasteurella", "Campylobacter", "Helicobacter"],
        note: "«Exigente» describe necesidades de cultivo, no una categoría de oxígeno. Campylobacter y Helicobacter son curvos y habitualmente microaerófilos.",
        organismIds: ["haemo-morax", "atypicals"], sourceIds: ["uk-smi-id1", "uk-smi-id26"],
      },
    ],
  },
  {
    id: "negative-cocci", title: "Cocos gramnegativos", short: "Cocos Gram −",
    rows: [
      {
        id: "negative-aerobic-cocci", setting: "Aerobios", test: "Cocos / diplococos",
        taxa: ["Neisseria", "Moraxella"],
        note: "La morfología de diplococo corresponde especialmente a M. catarrhalis; otras Moraxella pueden ser cocobacilares.",
        organismIds: ["neisseria", "haemo-morax"], sourceIds: ["uk-smi-id1"],
      },
      {
        id: "negative-anaerobic-cocci", setting: "Anaerobios", test: "Cocos",
        taxa: ["Veillonella"], organismIds: [], sourceIds: ["uk-smi-id1"],
      },
    ],
  },
  {
    id: "positive-cocci", title: "Cocos grampositivos", short: "Cocos Gram +",
    rows: [
      {
        id: "coagulase-positive", setting: "Racimos · Aerobios o facultativos", test: "Coagulasa positiva",
        taxa: ["Staphylococcus aureus (S. aureus)"], organismIds: ["saureus"], sourceIds: ["uk-smi-id7"],
      },
      {
        id: "coagulase-negative", setting: "Racimos · Aerobios o facultativos", test: "Coagulasa negativa",
        genus: "Staphylococcus",
        taxa: ["S. epidermidis", "S. haemolyticus", "S. saprophyticus", "S. lugdunensis"],
        note: "S. saprophyticus: resistencia a novobiocina como pista de identificación. S. lugdunensis: coagulasa en tubo negativa, posible aglutinación positiva; no asumir sensibilidad a penicilina. Puede causar infección invasiva de alta virulencia.",
        organismIds: [], sourceIds: ["uk-smi-id7", "manual-12-microbiology"],
      },
      {
        id: "beta-haemolysis", setting: "Cadenas o parejas · Aerobios o facultativos", test: "Hemólisis completa (β) · Grupos de Lancefield",
        genus: "Streptococcus",
        taxa: ["S. pyogenes (grupo A)", "S. agalactiae (grupo B)", "S. dysgalactiae (grupos C o G)", "S. canis (grupo G)"],
        note: "S. dysgalactiae subsp. equisimilis puede pertenecer a C o G. Existen cepas con patrones de hemólisis atípicos.",
        organismIds: ["spyogenes"], sourceIds: ["uk-smi-id4"],
      },
      {
        id: "anginosus", setting: "Cadenas o parejas · Aerobios o facultativos", test: "Hemólisis variable (α, β o ausente)",
        genus: "Streptococcus",
        taxa: ["Grupo S. anginosus"],
        note: "Puede expresar antígenos A, C, F o G, o no ser agrupable. Se muestra aparte porque no es exclusivamente betahemolítico.",
        organismIds: [], sourceIds: ["uk-smi-id4"],
      },
      {
        id: "optochin-sensitive", setting: "Cadenas o parejas · Aerobios o facultativos", test: "Hemólisis parcial (α) · Optoquina sensible habitual",
        taxa: ["Streptococcus pneumoniae (S. pneumoniae)"],
        note: "La optoquina es una prueba de identificación; no informa sobre sensibilidad a los antibióticos de tratamiento.",
        organismIds: ["spneumo"], sourceIds: ["uk-smi-id4"],
      },
      {
        id: "optochin-resistant", setting: "Cadenas o parejas · Aerobios o facultativos", test: "Hemólisis α o ausente · Optoquina resistente habitual",
        genus: "Streptococcus",
        taxa: ["Estreptococos viridans (S. mitis, S. mutans, S. salivarius)", "Grupo S. bovis / S. gallolyticus", "Gemella", "Leuconostoc", "Pediococcus"],
        note: "Grupo S. bovis: bilis-esculina positiva y PYR negativa habituales. Leuconostoc y Pediococcus presentan resistencia esperada a vancomicina.",
        organismIds: [], sourceIds: ["uk-smi-id4", "eucast-expected-phenotypes"],
      },
      {
        id: "enterococci", setting: "Cadenas o parejas · Aerobios o facultativos", test: "Enterococcus · Bilis-esculina y PYR habitualmente positivas",
        genus: "Enterococcus",
        taxa: ["E. faecalis", "E. faecium", "E. gallinarum", "E. casseliflavus", "E. flavescens"],
        note: "La especie no garantiza sensibilidad a ampicilina o vancomicina: confirmar antibiograma. E. gallinarum y E. casseliflavus presentan resistencia esperada a vancomicina. E. flavescens se conserva como nombre de la imagen; confirmar la identificación del laboratorio.",
        organismIds: ["enterococcus"], sourceIds: ["uk-smi-id4", "eucast-expected-phenotypes"],
      },
      {
        id: "positive-anaerobic-cocci", setting: "Anaerobios", test: "Cocos",
        taxa: ["Peptococcus", "Peptostreptococcus"], organismIds: [], sourceIds: ["uk-smi-id1"],
      },
      {
        id: "positive-fastidious-cocci", setting: "Exigentes", test: "Necesidades nutricionales especiales",
        taxa: ["Abiotrophia", "Granulicatella"], organismIds: [], sourceIds: ["uk-smi-id4"],
      },
    ],
  },
  {
    id: "positive-rods", title: "Bacilos grampositivos", short: "Bacilos Gram +",
    rows: [
      {
        id: "positive-aerobic-rods", setting: "Aerobios o facultativos", test: "Bacilos / cocobacilos",
        taxa: ["Bacillus (esporulado)", "Corynebacterium", "Gardnerella (Gram variable)", "Erysipelothrix", "Listeria", "Nocardia (ramificado)", "Rhodococcus"],
        organismIds: ["listeria"], sourceIds: ["uk-smi-id1"],
      },
      {
        id: "positive-anaerobic-rods", setting: "Anaerobios", test: "Bacilos",
        taxa: ["Clostridium / Clostridioides (esporulados)", "Actinomyces", "Propionibacterium / Cutibacterium", "Bifidobacterium", "Eubacterium"],
        note: "Se conservan los nombres de la imagen y se añaden Clostridioides y Cutibacterium para reconocer nomenclatura de uso actual. La tolerancia al oxígeno varía según la especie.",
        organismIds: ["clostridium"], sourceIds: ["uk-smi-id1"],
      },
    ],
  },
];

export const CLASSIFICATION = Object.freeze(classificationData.map((group) => Object.freeze({
  ...group,
  rows: Object.freeze(group.rows.map((row) => Object.freeze({
    ...row,
    taxa: Object.freeze(row.taxa),
    organismIds: Object.freeze(row.organismIds),
    sourceIds: Object.freeze(row.sourceIds),
  }))),
})));

export const CLASSIFICATION_NOTES = Object.freeze([
  {
    title: "Cómo leer el esquema",
    text: "Las ramas orientan la identificación y no son exhaustivas. «Aerobio» incluye facultativos cuando se indica. S y R en la imagen significan sensible y resistente; optoquina y novobiocina se usan aquí como pruebas de identificación, no como opciones de tratamiento.",
    sourceIds: ["uk-smi-id1", "uk-smi-id4", "uk-smi-id7"],
  },
  {
    title: "AmpC: importa la especie",
    text: "E. cloacae complex, K. aerogenes y C. freundii son ejemplos frecuentes de riesgo moderado de AmpC inducible clínicamente relevante. IDSA 2026 también considera H. alvei, con evidencia clínica limitada. Serratia marcescens, Morganella morganii y Providencia tienen menor riesgo de sobreexpresión. C. koseri carece de ampC cromosómico; P. vulgaris generalmente también. La nota original «Proteus excepto P. mirabilis» no es una regla válida de AmpC.",
    sourceIds: ["idsa-ampc-identification"],
  },
  {
    title: "Matices respecto a la imagen",
    text: "Se separa el grupo S. anginosus por su hemólisis variable y se amplía S. dysgalactiae a C/G. Las etiquetas de sensibilidad antibiótica de S. lugdunensis y Enterococcus se sustituyen por la necesidad de confirmar el antibiograma. El porcentaje de E. coli fermentadores lentos (10–15 %) queda únicamente en la imagen original: no se ha corroborado esa cifra en las fuentes consultadas.",
    sourceIds: ["classification-image", "uk-smi-id4", "uk-smi-id16", "eucast-expected-phenotypes"],
  },
]);

export function filterClassification(query = "", groupId = "all") {
  const needle = normalize(query);
  return CLASSIFICATION
    .filter((group) => groupId === "all" || group.id === groupId)
    .map((group) => ({
      ...group,
      rows: group.rows.filter((row) => normalize([
        group.title, group.short, row.setting, row.test, ...row.taxa, row.note ?? "",
        ...(row.genus ? row.taxa.map((name) => name.replace(/\b[A-Z]\./g, row.genus)) : []),
      ].join(" ")).includes(needle)),
    }))
    .filter((group) => group.rows.length);
}
