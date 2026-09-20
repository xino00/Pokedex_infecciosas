/* Este archivo se genera con `npm run build`. No editar directamente. */
(() => {
  "use strict";
  const __modules = Object.create(null);

  // src/clinical-guidance.js
  __modules["clinical-guidance"] = (() => {
    // Texto compartido para que ficha, mecanismo y motor mantengan la misma revisión.
    const QUINOLONE_PRECAUTIONS = Object.freeze([
      "Utilizar únicamente para indicaciones autorizadas y tras valorar beneficio-riesgo. En infecciones leves/moderadas, reservar si no pueden usarse las alternativas habituales. No usar en infecciones autolimitadas o no bacterianas.",
      "Evitar si hubo una reacción grave previa a quinolonas. Ante síntomas tendinosos o neurológicos, suspender y reevaluar: algunos daños pueden ser prolongados o irreversibles.",
      "Valorar el riesgo de tendinitis y rotura de tendones, especialmente con corticoides, edad avanzada, insuficiencia renal o trasplante. Comprobar QT, interacciones y separación de antiácidos/hierro/zinc según ficha.",
    ]);

    const STENO_GUIDANCE = Object.freeze({
      headline: "Stenotrophomonas: infección invasiva o colonización",
      doItems: Object.freeze([
        "Confirmar infección real, AST y protocolo local con PROA/Infecciosas.",
        "IDSA 2026: cefiderocol en monoterapia es la opción preferida para infección invasiva.",
        "Alternativa: aztreonam-avibactam, preferiblemente combinado con otro agente; si no está disponible, CAZ-AVI + aztreonam.",
        "Levofloxacino, minociclina o TMP-SMX son alternativas como parte de una combinación.",
      ]),
      avoidItems: Object.freeze(["Carbapenémicos.", "Ceftazidima como tratamiento.", "Tratar colonización respiratoria aislada."]),
      microItems: Object.freeze([
        "Solicitar AST. La preferencia por cefiderocol se apoya principalmente en modelos animales, con evidencia clínica limitada; adaptar a disponibilidad y protocolo local.",
      ]),
      sourceIds: Object.freeze(["idsa-amr-2026"]),
    });

    const MBL_GUIDANCE = Object.freeze({
      headline: "Enterobacterales MBL: mecanismo y AST antes de elegir",
      doItems: Object.freeze([
        "NDM: IDSA 2026 prefiere aztreonam-avibactam o cefiderocol; si el primero no está disponible, CAZ-AVI + aztreonam.",
        "Otras MBL (VIM/IMP): CAZ-AVI + aztreonam o cefiderocol según AST, foco y PROA (IDSA 2024).",
      ]),
      avoidItems: Object.freeze(["CAZ-AVI en monoterapia.", "Vaborbactam/relebactam como si inhibieran MBL."]),
      microItems: Object.freeze(["Confirmar mecanismo, sensibilidad y disponibilidad; pedir estudio de CAZ-AVI + aztreonam si se plantea la combinación."]),
      sourceIds: Object.freeze(["idsa-amr-2024", "idsa-amr-2026"]),
    });

    return Object.freeze({ QUINOLONE_PRECAUTIONS, STENO_GUIDANCE, MBL_GUIDANCE });
  })();

  // src/catalog.js
  __modules["catalog"] = (() => {
    const { MBL_GUIDANCE, QUINOLONE_PRECAUTIONS, STENO_GUIDANCE } = __modules["clinical-guidance"];
    const LOCAL_SOURCE = ["local-proa-fjd"];
    const AMR_SOURCES = ["local-proa-fjd", "idsa-amr-2024"];
    const QUINOLONE_SOURCES = ["aemps-fluoroquinolonas", "eucast-2026-quinolones"];

    const SECTIONS = Object.freeze([
      { id: "atlas", label: "Atlas bacteriano", icon: "🧫" },
      { id: "classification", label: "Clasificación" },
      { id: "antibiotics", label: "Pokédex antibióticos", icon: "💊" },
      { id: "mechanisms", label: "Mecanismos MDR", icon: "🧬" },
      { id: "matrix", label: "Heatmap cobertura", icon: "▦" },
      { id: "wizard", label: "Selector clínico", icon: "🎯" },
      { id: "cases", label: "Trampas de guardia", icon: "⚠️" },
      { id: "deep", label: "Lectura escondida", icon: "📚" },
    ]);

    const organismData = [
      {
        id: "saureus",
        dex: "G+001",
        group: "positive",
        name: "Staphylococcus aureus",
        short: "S. aureus",
        icon: "🟣",
        type: "coco en racimos",
        tags: ["SASM", "SARM"],
        syndromes: "IPPB, abscesos, bacteriemia, endocarditis, neumonía, osteomielitis.",
        cover:
          "SASM: cloxacilina/cefazolina. SARM: vancomicina, daptomicina según foco, linezolid en neumonía, ceftarolina si dirigida; ceftobiprol solo si ficha/protocolo lo justifica.",
        gap: "SARM no queda cubierto por beta-lactámicos habituales. Daptomicina no neumonía.",
        trap:
          "Si el objetivo principal es SASM, no uses pip-tazo o ceftriaxona como “suficiente” si puedes usar cloxacilina/cefazolina.",
        search:
          "staphylococcus aureus s aureus sasm sarm mrsa mssa cloxacilina cefazolina ceftarolina ceftobiprol daptomicina vancomicina",
      },
      {
        id: "spyogenes",
        dex: "G+002",
        group: "positive",
        name: "Streptococcus pyogenes",
        short: "S. pyogenes",
        icon: "🟣",
        type: "coco en cadenas",
        tags: ["Sensible", "Toxina"],
        syndromes: "Faringoamigdalitis, erisipela/celulitis, fascitis necrotizante, shock tóxico.",
        cover: "Penicilina o amoxicilina. En cuadro toxinogénico, añadir clindamicina según protocolo.",
        gap: "El antibiótico no sustituye cirugía si hay necrosis.",
        trap: "En fascitis necrotizante, pensar en control quirúrgico y antitoxina; no solo “cubre Strep”.",
        search: "streptococcus pyogenes grupo a penicilina amoxicilina clindamicina fascitis",
      },
      {
        id: "spneumo",
        dex: "G+003",
        group: "positive",
        name: "Streptococcus pneumoniae",
        short: "Neumococo",
        icon: "🟣",
        type: "diplococo",
        tags: ["NAC", "SNC"],
        syndromes: "NAC, otitis, sinusitis, meningitis, bacteriemia.",
        cover: "Amoxicilina en respiratorio no grave; ceftriaxona/cefotaxima en hospital o meningitis según CMI.",
        gap: "El punto de corte cambia según foco: meningitis exige margen mucho más estricto.",
        trap: "No extrapoles sensibilidad respiratoria a meningitis.",
        search: "neumococo streptococcus pneumoniae meningitis nac ceftriaxona amoxicilina",
      },
      {
        id: "enterococcus",
        dex: "G+004",
        group: "positive",
        name: "Enterococcus faecalis sensible / E. faecium-VRE",
        short: "Enterococcus",
        icon: "🟣",
        type: "coco",
        tags: ["LAME", "VRE"],
        syndromes: "ITU, bacteriemia, endocarditis, intraabdominal nosocomial.",
        cover:
          "E. faecalis sensible: ampicilina/amoxicilina o penicilina G dirigida. E. faecium/VRE: tratamiento dirigido con AST y PROA.",
        gap:
          "Cefalosporinas no cubren Enterococcus como cobertura propia. E. faecium suele ser resistente a ampicilina y puede ser VRE.",
        trap:
          "Ceftriaxona + ampicilina es sinergia en endocarditis por E. faecalis; ceftriaxona sola no cubre Enterococcus.",
        search: "enterococcus faecalis sensible faecium ampicilina cefalosporinas vre endocarditis ceftriaxona sinergia",
      },
      {
        id: "listeria",
        dex: "G+005",
        group: "positive",
        name: "Listeria monocytogenes",
        short: "Listeria",
        icon: "🟣",
        type: "bacilo",
        tags: ["SNC", "LAME"],
        syndromes: "Meningitis/meningoencefalitis en anciano, embarazo, neonato o inmunodeprimido; bacteriemia.",
        cover:
          "En SNC: ampicilina IV o amoxicilina IV según protocolo. Penicilina G dirigida si sensibilidad y foco encajan.",
        gap: "Cefalosporinas no cubren Listeria. No leer amoxicilina oral como pauta de meningitis.",
        trap: "Anciano con meningitis + ceftriaxona sola = hueco crítico.",
        search: "listeria meningitis anciano embarazo ampicilina iv amoxicilina iv ceftriaxona",
      },
      {
        id: "clostridium",
        dex: "A001",
        group: "anaerobe",
        name: "Clostridium / Clostridioides",
        short: "Clostridium",
        icon: "🟤",
        type: "anaerobio Gram +",
        tags: ["Anaerobio", "CDI"],
        syndromes: "C. difficile, mionecrosis, infecciones polimicrobianas profundas.",
        cover: "Depende del síndrome. Polimicrobiana: pip-tazo/carbapenémico o beta-lactámico + metronidazol.",
        gap: "Aztreonam y aminoglucósidos no cubren anaerobios.",
        trap: "Vancomicina IV no trata CDI luminal; fidaxomicina/vancomicina oral actúan en colon.",
        search: "clostridium clostridioides difficile metronidazol fidaxomicina vancomicina oral anaerobios",
      },
      {
        id: "neisseria",
        dex: "G-001",
        group: "negative",
        name: "Neisseria meningitidis / gonorrhoeae",
        short: "Neisseria",
        icon: "🔵",
        type: "diplococo GN",
        tags: ["ITS", "SNC"],
        syndromes: "Meningitis/meningococemia; uretritis/cervicitis, EIP y artritis gonocócica.",
        cover:
          "Gonococo: ceftriaxona es referencia; cefixima solo si ceftriaxona no está disponible/no es factible. Meningitis: ajustar a protocolo.",
        gap: "Resistencia adquirida en gonococo obliga a guía actualizada; faringe es más difícil de erradicar.",
        trap: "Gonococo faríngeo requiere test de curación; si fallo, cultivo/AST y experto.",
        search: "neisseria meningitidis gonorrhoeae ceftriaxona cefixima faringea test curacion meningitis gonococo",
        sourceIds: ["local-proa-fjd", "cdc-gonorrhea-2021"],
      },
      {
        id: "haemo-morax",
        dex: "G-002",
        group: "negative",
        name: "Haemophilus influenzae / Moraxella",
        short: "H. influenzae/Moraxella",
        icon: "🔵",
        type: "cocobacilos",
        tags: ["Respiratorio", "β-lactamasa"],
        syndromes: "EPOC reagudizado, otitis, sinusitis, NAC seleccionada.",
        cover: "Amox-clav, cefuroxima o ceftriaxona según gravedad y foco.",
        gap: "Frecuente producción de beta-lactamasa: amoxicilina sola puede fallar.",
        trap: "Si fracaso a amoxicilina en EPOC/ORL, piensa en beta-lactamasa.",
        search: "haemophilus influenzae moraxella epoc amoxicilina clavulanico cefuroxima",
      },
      {
        id: "ecoli-kleb-prot",
        dex: "G-003",
        group: "negative",
        name: "E. coli / Klebsiella / Proteus",
        short: "Enterobacterales comunes",
        icon: "🔵",
        type: "bacilos GN",
        tags: ["ITU", "Abdomen"],
        syndromes: "ITU, pielonefritis, bacteriemia, intraabdominal, colangitis, prostatitis.",
        cover: "Ceftriaxona si no BLEE ni AmpC de alto riesgo y foco adecuado. Carbapenémico si BLEE grave/invasiva.",
        gap: "Klebsiella es resistente a ampicilina/amoxicilina. Proteus no es Pseudomonas.",
        trap: "No escales a antipseudomónico solo porque el cultivo dice “Proteus”.",
        search: "escherichia coli klebsiella proteus enterobacterales ceftriaxona no blee no ampc itu pielonefritis",
      },
      {
        id: "ampc-trio",
        dex: "G-004",
        group: "negative",
        name: "Enterobacter cloacae / K. aerogenes / C. freundii",
        short: "AmpC alto riesgo",
        icon: "🔵",
        type: "Enterobacterales AmpC",
        tags: ["AmpC", "Trampa"],
        syndromes: "Bacteriemia, ITU complicada, nosocomial, intraabdominal, dispositivos.",
        cover: "Cefepime si sensible y CMI favorable. Carbapenémico si grave/profunda, BLEE coproducida o CMI problemática.",
        gap: "Evitar ceftriaxona/cefotaxima en infección invasiva aunque parezca sensible.",
        trap: "La sensibilidad inicial a ceftriaxona puede inducir resistencia durante tratamiento.",
        search: "enterobacter cloacae klebsiella aerogenes citrobacter freundii ampc cefepime ceftriaxona",
        sourceIds: AMR_SOURCES,
      },
      {
        id: "pseudomonas",
        dex: "NF001",
        group: "negative",
        name: "Pseudomonas aeruginosa",
        short: "Pseudomonas",
        icon: "🟢",
        type: "no fermentador",
        tags: ["Pseudomonas", "DTR"],
        syndromes: "Nosocomial, bronquiectasias/FQ, neutropenia, UCI, ITU sondada, quemaduras, ectima gangrenoso.",
        cover:
          "Pip-tazo, ceftazidima, cefepime, aztreonam si sensible; meropenem/imipenem si indicación. DTR: nuevos BL/BLI o cefiderocol según AST.",
        gap: "No la cubren ceftriaxona, cefuroxima, amox-clav ni ertapenem.",
        trap: "Ertapenem no cubre Pseudomonas: APE.",
        search: "pseudomonas aeruginosa cefepime ceftazidima piperacilina tazobactam ertapenem dtr",
        sourceIds: AMR_SOURCES,
      },
      {
        id: "acinetobacter",
        dex: "NF002",
        group: "negative",
        name: "Acinetobacter baumannii / CRAB",
        short: "CRAB",
        icon: "🟢",
        type: "cocobacilo/no fermentador",
        tags: ["UCI", "CRAB"],
        syndromes: "UCI, neumonía asociada a ventilación, heridas, bacteriemia, brotes.",
        cover:
          "Si infección real: sulbactam-durlobactam + meropenem/imipenem si disponible; si no, alta dosis de ampicilina-sulbactam + otro agente.",
        gap: "No asumir que meropenem amplio cubre CRAB.",
        trap: "Vía aérea con CRAB puede ser colonización: confirma síndrome infeccioso antes de combinar.",
        search: "acinetobacter baumannii crab sulbactam durlobactam colistina cefiderocol uci",
        sourceIds: AMR_SOURCES,
      },
      {
        id: "steno",
        dex: "NF003",
        group: "negative",
        name: "Stenotrophomonas maltophilia",
        short: "Stenotrophomonas",
        icon: "🟢",
        type: "no fermentador",
        tags: ["Colonización", "L1/L2"],
        syndromes:
          "Colonización respiratoria frecuente; infección real en críticos, inmunodeprimidos, catéter o neumonía compatible.",
        cover: STENO_GUIDANCE.doItems.join(" "),
        gap: "Carbapenémicos inútiles por L1; muchas cefalosporinas fallan por L2.",
        trap: STENO_GUIDANCE.microItems.join(" "),
        search: "stenotrophomonas maltophilia infeccion real ast proa tmp smx minociclina levofloxacino cefiderocol ceftazidima",
        sourceIds: STENO_GUIDANCE.sourceIds,
      },
      {
        id: "bacteroides",
        dex: "A002",
        group: "anaerobe",
        name: "Bacteroides fragilis y anaerobios GN",
        short: "Bacteroides/anaerobios",
        icon: "🟤",
        type: "anaerobio GN",
        tags: ["Abdomen", "Metronidazol"],
        syndromes: "Intraabdominal, abscesos, pelvis, pie diabético, mordeduras mixtas.",
        cover:
          "Pip-tazo, carbapenémicos, amox-clav en cuadros comunitarios seleccionados, o metronidazol asociado a cefalosporina.",
        gap: "Ceftriaxona, cefepime y ceftazidima solas no bastan. Aztreonam no cubre anaerobios.",
        trap: "Ceftriaxona para abdomen suele necesitar metronidazol.",
        search: "bacteroides fragilis anaerobios metronidazol piperacilina tazobactam carbapenemico",
      },
      {
        id: "atypicals",
        dex: "AT001",
        group: "atypical",
        name: "Mycoplasma / Chlamydia / Legionella",
        short: "Atípicos",
        icon: "🟡",
        type: "intracelulares/sin pared",
        tags: ["No beta", "NAC"],
        syndromes: "Neumonía atípica, brotes, exposición a aerosoles/agua en Legionella.",
        cover: "Macrólidos, doxiciclina o fluoroquinolonas respiratorias según síndrome y gravedad.",
        gap: "Los beta-lactámicos no cubren atípicos.",
        trap: "Beta-lactámico perfecto + Legionella = fallo si no añades cobertura intracelular.",
        search: "mycoplasma chlamydia legionella atipicos macrolidos doxiciclina beta lactamicos",
      },
    ];

    const ORGANISMS = Object.freeze(
      organismData.map((item) => Object.freeze({ ...item, sourceIds: item.sourceIds ?? LOCAL_SOURCE })),
    );

    const antibioticData = [
      { id: "pen-g", dex: "B001", group: "blue", name: "Penicilina G", family: "Penicilina natural", icon: "💊", type: "Gram + estrecho", covers: ["S. pyogenes", "Treponema", "Listeria", "E. faecalis sensible"], misses: ["SASM productor de penicilinasa", "Enterobacterales", "Pseudomonas"], trap: "Enterococcus: actividad inhibitoria; si buscas bactericidia, precisa estrategia sinérgica.", search: "penicilina g treponema listeria enterococcus streptococcus" },
      { id: "amp-amox", dex: "B002", group: "green", name: "Ampicilina / amoxicilina", family: "Aminopenicilina", icon: "💊", type: "Listeria/Enterococcus", covers: ["Streptococcus", "E. faecalis sensible", "Listeria"], misses: ["Pseudomonas", "SARM", "S. aureus habitual", "β-lactamasas sin inhibidor"], trap: "En meningitis de anciano/inmunodeprimido, es el hueco que añade cobertura anti-Listeria.", search: "ampicilina amoxicilina enterococcus listeria meningitis" },
      { id: "amoxclav", dex: "B003", group: "green", name: "Amoxicilina-clavulánico", family: "Aminopenicilina + inhibidor", icon: "💊", type: "Polimicrobiano comunitario", covers: ["ORL/respiratorio con β-lactamasa", "Mordeduras", "Odontógeno", "Anaerobios comunitarios", "E. faecalis sensible"], misses: ["Pseudomonas", "SARM", "BLEE grave", "AmpC relevante", "pauta de meningitis por Listeria"], trap: "Si hay actividad frente a Listeria, la aporta amoxicilina; no es pauta de meningitis.", search: "amoxicilina clavulanico amoxclav anaerobios mordeduras enterococcus listeria no meningitis" },
      { id: "cloxa-cefa", dex: "B004", group: "blue", name: "Cloxacilina / cefazolina", family: "Anti-SASM", icon: "💊", type: "SASM dirigido", covers: ["SASM", "Streptococcus"], misses: ["SARM", "Enterococcus", "Listeria", "Pseudomonas", "Anaerobios profundos"], trap: "Para SASM dirigido, son preferentes frente a ceftriaxona o pip-tazo.", search: "cloxacilina cefazolina sasm mssa staphylococcus" },
      { id: "cefuroxime", dex: "C002", group: "blue", name: "Cefuroxima", family: "Cefalosporina 2ª", icon: "💊", type: "Respiratorio/ITU seleccionado", covers: ["Streptococcus", "SASM variable", "H. influenzae/Moraxella", "algunos GN comunitarios"], misses: ["Pseudomonas", "Enterococcus", "Listeria", "BLEE/CRE", "Anaerobios profundos"], trap: "No la conviertas en antipseudomónico ni en tratamiento de foco profundo anaerobio.", search: "cefuroxima segunda respiratorio moraxella haemophilus" },
      { id: "ceftriaxone", dex: "C003", group: "blue", name: "Ceftriaxona / cefotaxima", family: "Cefalosporina 3ª no pseudomónica", icon: "💊", type: "Enterobacterales comunitarias", covers: ["E. coli/Klebsiella/Proteus no BLEE", "Neumococo", "Meningococo", "Gonococo"], misses: ["Pseudomonas", "Enterococcus", "Listeria", "SARM", "Anaerobios"], trap: "La gran trampa de guardia: cómoda, pero deja huecos críticos.", search: "ceftriaxona cefotaxima enterobacterales meningitis pseudomonas enterococcus listeria anaerobios" },
      { id: "ceftazidime", dex: "C004", group: "green", name: "Ceftazidima", family: "Cefalosporina 3ª pseudomónica", icon: "💊", type: "Pseudomonas", covers: ["Pseudomonas si sensible", "BGN aerobios"], misses: ["Anaerobios", "Enterococcus", "Listeria", "SARM", "Gram+ potente"], trap: "No es “ceftriaxona plus”: pierde mucho Gram+ y no cubre anaerobios.", search: "ceftazidima pseudomonas anaerobios grampositivos" },
      { id: "cefepime", dex: "C005", group: "amber", name: "Cefepime", family: "Cefalosporina 4ª", icon: "💊", type: "AmpC/Pseudomonas", covers: ["AmpC si CMI favorable", "Pseudomonas si sensible", "Enterobacterales no BLEE"], misses: ["BLEE dirigida", "Anaerobios", "Enterococcus", "Listeria", "SARM"], trap: "Ajuste renal obligatorio: neurotoxicidad si se olvida.", search: "cefepime ampc pseudomonas blee neurotoxicidad" },
      { id: "piptazo", dex: "P001", group: "green", name: "Piperacilina-tazobactam", family: "Penicilina antipseudomónica + inhibidor", icon: "💊", type: "Amplio con anaerobios", covers: ["Pseudomonas si sensible", "Anaerobios", "Enterobacterales no BLEE", "SASM", "E. faecalis sensible"], misses: ["SARM", "E. faecium resistente", "Carbapenemasas", "BLEE grave fiable"], trap: "En BLEE extraurinaria grave, no usar como dirigida aunque parezca sensible.", search: "piperacilina tazobactam pip tazo pseudomonas anaerobios blee" },
      { id: "ertapenem", dex: "K001", group: "blue", name: "Ertapenem", family: "Carbapenémico grupo 1", icon: "💊", type: "BLEE estable", covers: ["Enterobacterales BLEE", "Anaerobios", "muchos Gram+ comunitarios"], misses: ["Acinetobacter", "Pseudomonas", "Enterococcus"], trap: "APE: Acinetobacter, Pseudomonas, Enterococcus quedan fuera.", search: "ertapenem blee ape acinetobacter pseudomonas enterococcus" },
      { id: "mero-imi", dex: "K002", group: "red", name: "Meropenem / imipenem: diferencias", family: "Carbapenémicos antipseudomónicos", icon: "💊", type: "Espectro y foco", covers: ["BLEE y AmpC según AST", "Anaerobios", "Pseudomonas si sensible", "Meropenem: actividad frente a Listeria; E. faecalis con sensibilidad natural intermedia", "Imipenem: E. faecalis sensible; actividad in vitro frente a Listeria sin eficacia clínica establecida"], misses: ["SARM", "E. faecium resistente", "Stenotrophomonas", "Atípicos"], trap: "Imipenem/cilastatina no se recomienda para meningitis. La actividad microbiológica no convierte un fármaco en pauta de elección; revisar foco, AST y protocolo.", search: "meropenem imipenem carbapenemico blee ampc listeria enterococcus faecalis meningitis", sourceIds: ["local-proa-fjd", "aemps-meropenem", "aemps-imipenem", "dailymed-imipenem"] },
      { id: "aztreonam", dex: "M001", group: "amber", name: "Aztreonam", family: "Monobactámico", icon: "💊", type: "Solo GN aerobios", covers: ["Enterobacterales si sensible", "Pseudomonas si sensible"], misses: ["Gram positivos", "Anaerobios"], trap: "Comparte cadena lateral con ceftazidima: cuidado si alergia confirmada a ceftazidima.", search: "aztreonam monobactam alergia ceftazidima pseudomonas anaerobios" },
      { id: "anti-mrsa-ceph", dex: "C006", group: "blue", name: "Ceftarolina (ceftobiprol no intercambiable)", family: "Cefalosporina anti-SARM", icon: "💊", type: "Anti-SARM beta-lactámico", covers: ["SARM", "SASM", "Streptococcus", "neumococo resistente"], misses: ["Pseudomonas en ceftarolina", "BLEE/CRE/AmpC", "Enterococcus fiable"], trap: "Anti-SARM dirigido, no comodín MDR. No extrapolar ceftarolina y ceftobiprol como equivalentes.", search: "ceftarolina ceftobiprol no intercambiable sarm mrsa neumococo blee cre ampc" },
      { id: "caz-avi", dex: "N001", group: "red", name: "Ceftazidima-avibactam", family: "Nuevo BL/BLI", icon: "🧬", type: "KPC/OXA-48-like", covers: ["KPC", "OXA-48-like", "algunas Pseudomonas DTR si sensible"], misses: ["MBL en monoterapia", "Gram+ y anaerobios relevantes"], trap: "MBL: combinar con aztreonam o elegir otra estrategia según disponibilidad/AST.", search: "ceftazidima avibactam caz avi kpc oxa48 mbl aztreonam", sourceIds: AMR_SOURCES },
      { id: "ceftolo-tazo", dex: "N002", group: "green", name: "Ceftolozano-tazobactam", family: "Nuevo BL/BLI", icon: "🧬", type: "Pseudomonas DTR", covers: ["Pseudomonas MDR/DTR si sensible", "algunas BLEE pero no como referencia"], misses: ["KPC", "OXA-48", "MBL", "Anaerobios sin metronidazol"], trap: "Especialista en Pseudomonas; no lo uses como carbapenemasa-killer.", search: "ceftolozano tazobactam pseudomonas dtr blee kpc", sourceIds: AMR_SOURCES },
      { id: "mvb-imi-rel", dex: "N003", group: "red", name: "Meropenem-vaborbactam / imipenem-relebactam", family: "Nuevo BL/BLI", icon: "🧬", type: "KPC", covers: ["KPC", "algunas Pseudomonas DTR si sensible en IMI-REL"], misses: ["MBL", "OXA-48-like en MVB/IMI-REL"], trap: "Si es OXA-48 o MBL, cambiar de mapa.", search: "meropenem vaborbactam imipenem relebactam kpc oxa48 mbl", sourceIds: AMR_SOURCES },
      { id: "cefiderocol", dex: "N004", group: "red", name: "Cefiderocol", family: "Cefalosporina sideróforo", icon: "🧬", type: "MDR/XDR", covers: ["MBL como opción", "algunos no fermentadores MDR", "CRE según AST", "Stenotrophomonas invasiva: preferido por IDSA 2026"], misses: ["Gram+", "Anaerobios"], trap: "Su papel depende del patógeno. En Stenotrophomonas invasiva, la preferencia IDSA 2026 tiene evidencia clínica limitada; confirmar AST, foco y PROA.", search: "cefiderocol sideroforo mbl crab pseudomonas dtr", sourceIds: [...AMR_SOURCES, "idsa-amr-2026"] },
      { id: "vanco", dex: "O001", group: "amber", name: "Vancomicina", family: "Glucopéptido", icon: "🛡️", type: "Gram+ resistentes", covers: ["SARM", "E. faecium sensible", "Gram+ resistentes"], misses: ["Gram negativos", "CDI luminal por vía IV"], trap: "IV no trata luz colónica; para CDI, vía oral/fidaxomicina según caso.", search: "vancomicina sarm c difficile oral iv niveles" },
      { id: "dapto", dex: "O002", group: "blue", name: "Daptomicina", family: "Lipopeptido", icon: "🛡️", type: "SARM/ERV no pulmonar", covers: ["Bacteriemia por Gram+", "endocarditis derecha", "osteoarticular", "IPPB"], misses: ["Neumonía"], trap: "Surfactante pulmonar la inactiva. CK y estatinas.", search: "daptomicina neumonia surfactante ck sarm erv" },
      { id: "tmp-smx", dex: "O003", group: "amber", name: "Cotrimoxazol", family: "TMP-SMX", icon: "🧪", type: "Oral útil / Steno", covers: ["Stenotrophomonas si sensible", "algunas ITU", "Pneumocystis"], misses: ["Pseudomonas", "anaerobios"], trap: "Vigilar potasio, función renal y hemograma.", search: "cotrimoxazol tmp smx stenotrophomonas potasio hemograma" },
      { id: "metro", dex: "O004", group: "blue", name: "Metronidazol", family: "Nitroimidazol", icon: "🧪", type: "Anaerobios", covers: ["Anaerobios", "protozoos seleccionados"], misses: ["Aerobios", "Gram+ y GN no anaerobios"], trap: "Ceftriaxona + metronidazol es una lógica; metronidazol solo rara vez lo es en foco polimicrobiano.", search: "metronidazol anaerobios abdomen ceftriaxona" },
      {
        id: "ciprofloxacin", dex: "Q001", group: "green", name: "Ciprofloxacino",
        family: "Fluoroquinolona", icon: "💊", type: "Gram negativos / AST",
        covers: ["Pseudomonas si AST activo y exposición adecuada", "Enterobacterales si sensibles", "Legionella"],
        misses: ["Neumococo: eficacia insuficiente", "SARM: cobertura no fiable", "Anaerobios relevantes", "Listeria"],
        trap: "No es una quinolona respiratoria para neumococo. En ITU, confirmar AST y foco; ajustar a función renal. Contraindicado con tizanidina.",
        precautions: QUINOLONE_PRECAUTIONS,
        search: "ciprofloxacino cipro ciprofloxacin quinolona quinolonas fluoroquinolonas pseudomonas itu prostatitis blee tizanidina",
        sourceIds: ["aemps-ciprofloxacin", "idsa-amr-2026", ...QUINOLONE_SOURCES],
      },
      {
        id: "levofloxacin", dex: "Q002", group: "amber", name: "Levofloxacino",
        family: "Fluoroquinolona respiratoria", icon: "💊", type: "Respiratorio / urinario",
        covers: ["Neumococo", "Atípicos respiratorios", "Enterobacterales si sensibles", "Pseudomonas solo con AST activo y exposición adecuada"],
        misses: ["SARM: cobertura no fiable", "Anaerobios fiables", "Listeria: cobertura clínica no establecida"],
        trap: "La etiqueta respiratoria no garantiza actividad frente a Pseudomonas. En NAC, reservar si las alternativas habituales no son apropiadas. Ajustar a función renal.",
        precautions: QUINOLONE_PRECAUTIONS,
        search: "levofloxacino levo levofloxacin quinolona quinolonas fluoroquinolonas neumococo atipicos legionella itu prostatitis blee",
        sourceIds: ["aemps-levofloxacin", "idsa-amr-2026", ...QUINOLONE_SOURCES],
      },
      {
        id: "moxifloxacin", dex: "Q003", group: "amber", name: "Moxifloxacino",
        family: "Fluoroquinolona respiratoria", icon: "💊", type: "Respiratorio / sin Pseudomonas",
        covers: ["Neumococo", "Atípicos respiratorios", "Algunos anaerobios; B. fragilis variable"],
        misses: ["Pseudomonas", "ITU: no es una opción indicada", "SARM: cobertura no fiable", "Listeria: evidencia clínica insuficiente"],
        trap: "En NAC, reservar si las alternativas habituales no son apropiadas o han fallado. Revisar QT; no combinar con fármacos que lo prolonguen. No requiere ajuste renal.",
        precautions: QUINOLONE_PRECAUTIONS,
        search: "moxifloxacino moxi moxifloxacin quinolona quinolonas fluoroquinolonas neumococo atipicos legionella anaerobios qt no itu",
        sourceIds: ["aemps-moxifloxacin", ...QUINOLONE_SOURCES],
      },
    ];

    const ANTIBIOTICS = Object.freeze(
      antibioticData.map((item) => Object.freeze({ ...item, sourceIds: item.sourceIds ?? LOCAL_SOURCE })),
    );

    const mechanismData = [
      { id: "blee", name: "BLEE", icon: "🧬", group: "green", question: "¿Cistitis, pielonefritis/cUTI o infección invasiva?", use: "Cistitis baja: opción urinaria activa. Pielonefritis/cUTI: TMP-SMX, ciprofloxacino o levofloxacino si sensible; carbapenémico según gravedad. Extraurinaria grave: carbapenémico.", avoid: "Pip-tazo o cefepime como dirigidos en BLEE extraurinaria grave; nitrofurantoína/fosfomicina si pielonefritis.", micro: "AST completo, foco y posibilidad real de paso oral.", search: "blee esbl carbapenemico cistitis pielonefritis cuti cefepime piperacilina" },
      { id: "ampc", name: "AmpC inducible", icon: "🧬", group: "amber", question: "¿E. cloacae complex, K. aerogenes o C. freundii?", use: "Cefepime si sensible y CMI favorable. Carbapenémico si grave, foco profundo, CMI problemática o sospecha de BLEE coproducida.", avoid: "Ceftriaxona/cefotaxima/ceftazidima en infección invasiva por especies de riesgo.", micro: "Identificar especie y CMI de cefepime; valorar BLEE coproducida.", search: "ampc enterobacter cloacae complex klebsiella aerogenes citrobacter freundii cefepime ceftriaxona" },
      { id: "kpc", name: "CRE-KPC", icon: "🧬", group: "red", question: "¿Carbapenemasa KPC confirmada?", use: "Meropenem-vaborbactam, ceftazidima-avibactam o imipenem-relebactam si sensible.", avoid: "Combinaciones antiguas con aminoglucósido/polimixina si ya hay beta-lactámico activo.", micro: "Tipado de carbapenemasa + AST de nuevos BL/BLI.", search: "kpc cre meropenem vaborbactam ceftazidima avibactam imipenem relebactam" },
      { id: "oxa48", name: "CRE OXA-48-like", icon: "🧬", group: "red", question: "¿OXA-48-like?", use: "Ceftazidima-avibactam como referencia si sensible. Cefiderocol como alternativa según caso.", avoid: "Meropenem-vaborbactam o imipenem-relebactam como si fueran KPC.", micro: "Tipado de carbapenemasa; confirmar actividad de CAZ-AVI.", search: "oxa48 oxa 48 ceftazidima avibactam cefiderocol" },
      { id: "mbl", name: "MBL", icon: "🧬", group: "red", question: "¿Enterobacterales con NDM u otra MBL?", use: MBL_GUIDANCE.doItems.join(" "), avoid: MBL_GUIDANCE.avoidItems.join(" "), micro: MBL_GUIDANCE.microItems.join(" "), sourceIds: MBL_GUIDANCE.sourceIds, search: "mbl ndm vim imp aztreonam avibactam cefiderocol" },
      { id: "dtr-pa", germId: "dtr", name: "Pseudomonas DTR", icon: "🧬", group: "green", question: "¿Conserva algún beta-lactámico clásico?", use: "Si conserva BL clásico no carbapenémico, usarlo a dosis altas/perfusión extendida. Si DTR: ceftolo-tazo, CAZ-AVI, IMI-REL o cefiderocol según AST.", avoid: "Combinación de rutina si ya hay beta-lactámico activo confirmado.", micro: "AST para nuevos BL/BLI y cefiderocol.", search: "pseudomonas dtr ceftolozano tazobactam cefiderocol" },
      { id: "crab", name: "CRAB", icon: "🧬", group: "red", question: "¿Infección real o colonización?", use: "Sulbactam-durlobactam + meropenem/imipenem si disponible. Si no, ampicilina-sulbactam alta dosis + otro agente.", avoid: "Meropenem/imipenem solos. Tratar colonización respiratoria sin síndrome.", micro: "Confirmar sensibilidad y discutir combinación con PROA.", search: "crab acinetobacter sulbactam durlobactam colistina cefiderocol" },
      { id: "steno", name: "Stenotrophomonas", icon: "🧬", group: "amber", question: "¿Colonización o infección invasiva?", use: STENO_GUIDANCE.doItems.join(" "), avoid: STENO_GUIDANCE.avoidItems.join(" "), micro: STENO_GUIDANCE.microItems.join(" "), sourceIds: STENO_GUIDANCE.sourceIds, search: "stenotrophomonas infeccion real ast proa tmp smx minociclina levofloxacino cefiderocol" },
    ];

    const MECHANISMS = Object.freeze(
      mechanismData.map((item) => Object.freeze({ ...item, sourceIds: item.sourceIds ?? ["idsa-amr-2024"] })),
    );

    const caseData = [
      { id: "listeria-meningitis", title: "Anciano con meningitis", setup: "Ceftriaxona cubre neumococo y meningococo, pero el paciente tiene riesgo de Listeria.", answer: "Añade ampicilina IV o amoxicilina IV según protocolo. Ceftriaxona sola deja hueco LAME: Listeria." },
      { id: "ampc-ceftriaxone", title: "Enterobacter cloacae bacteriémico “S” a ceftriaxona", setup: "El informe inicial puede parecer cómodo, pero es una especie de riesgo AmpC.", answer: "Evita ceftriaxona en infección invasiva. Cefepime si CMI favorable o carbapenémico si gravedad/CMI/BLEE.", sourceIds: AMR_SOURCES },
      { id: "ertapenem-pseudomonas", title: "Ertapenem para neumonía nosocomial con riesgo de Pseudomonas", setup: "Ertapenem cubre BLEE y anaerobios, pero tiene hueco APE.", answer: "Error: no cubre Pseudomonas. Usa antipseudomónico real si el riesgo es clínicamente relevante." },
      { id: "steno-colonization", title: "Stenotrophomonas en esputo de EPOC estable", setup: "No fermentador en vía aérea crónica sin fiebre, sin infiltrado nuevo, sin deterioro claro.", answer: "Probable colonización. No escalar por cultivo aislado; tratar solo si síndrome infeccioso real.", sourceIds: AMR_SOURCES },
      { id: "blee-branches", title: "BLEE: el tratamiento depende del foco", setup: "La elección del antibiótico depende del foco de la infección, de la gravedad y del antibiograma.", answer: "En la cistitis, elegir un antibiótico activo y adecuado para la infección urinaria baja. En la pielonefritis o la infección urinaria complicada, valorar cotrimoxazol, ciprofloxacino o levofloxacino si la bacteria es sensible; un carbapenémico puede ser necesario si esas opciones no son adecuadas o el paciente está grave. En la bacteriemia y otras infecciones fuera del aparato urinario, se prefieren los carbapenémicos; en pacientes críticos, meropenem o imipenem-cilastatina.", sourceIds: ["local-proa-fjd", "idsa-amr-2026"] },
      { id: "gonococcus-pharynx", title: "Gonococo faríngeo tratado con cefixima", setup: "Cefixima puede aparecer como alternativa oral, pero faringe es un sitio de erradicación difícil.", answer: "Ceftriaxona si es posible. Si hubo cefixima o sospecha de fallo: test de curación 7-14 días; cultivo/AST y experto si persiste.", sourceIds: ["cdc-gonorrhea-2021"] },
      { id: "daptomycin-pneumonia", title: "Daptomicina para neumonía por SARM", setup: "Daptomicina es potente anti-SARM, pero no en pulmón.", answer: "Error de foco: se inactiva por surfactante. Considera linezolid/vancomicina según contexto y protocolo." },
      { id: "ciprofloxacin-pneumococcus", title: "Ciprofloxacino para una NAC neumocócica", setup: "Que una quinolona tenga actividad frente a Pseudomonas no la convierte en una opción para neumococo.", answer: "Ciprofloxacino tiene eficacia insuficiente frente a estreptococos. Elegir el tratamiento por foco, patógeno y protocolo; no intercambiar quinolonas por pertenecer a la misma familia.", sourceIds: ["aemps-ciprofloxacin"] },
      { id: "moxifloxacin-uti", title: "Moxifloxacino como sustituto en una ITU", setup: "Se intenta cambiar ciprofloxacino o levofloxacino por otra quinolona disponible.", answer: "Moxifloxacino no está indicado para ITU ni cubre Pseudomonas. Elegir una opción urinaria con sensibilidad confirmada; en cistitis no complicada, reservar fluoroquinolonas si no pueden usarse las alternativas habituales.", sourceIds: ["aemps-moxifloxacin", "aemps-fluoroquinolonas", "idsa-amr-2026"] },
    ];

    const CASES = Object.freeze(
      caseData.map((item) => Object.freeze({ ...item, sourceIds: item.sourceIds ?? LOCAL_SOURCE })),
    );

    const DEEP_SECTIONS = Object.freeze([
      { title: "Cinco filtros antes de prescribir", body: ["Foco: respiratorio, urinario, abdominal, piel, catéter, SNC o foco incierto.", "Patógeno que no puedes fallar: Pseudomonas, Enterococcus/Listeria, SASM/SARM, anaerobios, BLEE/AmpC o no fermentadores.", "Mecanismo probable: BLEE, AmpC, CRE/KPC/OXA-48/MBL, Pseudomonas DTR, CRAB o Stenotrophomonas.", "Exposición real: sepsis, shock, neutropenia, foco profundo o CMI alta cambian la pauta.", "Salida escrita: cultivos, control de foco, desescalada, paso oral y duración."] },
      { title: "Reglas LAME y APE", body: ["LAME resume huecos comunes de cefalosporinas: Listeria, Atípicos, MRSA/SARM y Enterococo. Ceftarolina es excepción anti-SARM, no solución universal; ceftobiprol no se debe intercambiar sin ficha/protocolo.", "APE resume los huecos de ertapenem: Acinetobacter, Pseudomonas y Enterococcus. Muy útil en BLEE estable si esos tres no importan."] },
      { title: "Cómo pensar un gramnegativo resistente", body: ["No trates un antibiograma sin síndrome clínico compatible.", "Separa cistitis baja de pielonefritis, bacteriemia, neumonía, abdomen o shock.", "CRE exige tipado de carbapenemasa: KPC, OXA-48-like, MBL o no carbapenemasa llevan a opciones distintas.", "CRAB y Stenotrophomonas se colonizan con facilidad: confirmar infección real antes de combinar."] },
      { title: "Otros antimicrobianos: foco-veto", body: ["Aminoglucósidos y vancomicina/teicoplanina exigen plan de niveles o vigilancia cuando el curso no es puntual.", "Daptomicina no trata neumonía por inactivación por surfactante.", "Tigeciclina no debe ser columna vertebral de bacteriemia por niveles séricos bajos.", "Fosfomicina IV aporta carga sódica relevante.", "Colistina es rescate, tóxica y no debería usarse como monoterapia de reflejo."] },
    ]);

    const COMBINATION_GAPS = Object.freeze([
      "Abdomen comunitario estable: ceftriaxona + metronidazol puede encajar si no necesitas Enterococcus, Pseudomonas ni cobertura MDR.",
      "Abdomen grave, nosocomial o con exposición sanitaria: no convertir ceftriaxona + metronidazol en regla; valorar pip-tazo/carbapenémico/nuevos BL-BLI según foco, AST y PROA.",
      "Cefepime/ceftazidima + intraabdominal: no cubren anaerobios ni Enterococcus; añadir lo que falte si el foco lo exige.",
      "Aztreonam en alergia grave: añadir cobertura grampositiva y anaerobia si el foco lo exige; evitarlo si alergia confirmada a ceftazidima.",
      "Pseudomonas MDR, CRE, MBL, CRAB o Stenotrophomonas: manejo dirigido por AST y consulta.",
    ]);

    return Object.freeze({ SECTIONS, ORGANISMS, ANTIBIOTICS, MECHANISMS, CASES, DEEP_SECTIONS, COMBINATION_GAPS });
  })();

  // src/coverage.js
  __modules["coverage"] = (() => {
    const COVERAGE_LEVELS = Object.freeze(["yes", "maybe", "no", "unknown"]);

    const COVERAGE_TARGETS = Object.freeze([
      target("strep", "Strep", "Streptococcus spp."),
      target("sasm", "SASM", "Staphylococcus aureus sensible a meticilina"),
      target("sarm", "SARM", "Staphylococcus aureus resistente a meticilina"),
      target("efaecalis", "E. faecalis S", "Enterococcus faecalis sensible"),
      target("listeria", "Listeria", "Listeria monocytogenes"),
      target("enterobacterales", "Enterobact.", "Enterobacterales sin BLEE ni AmpC"),
      target("blee", "BLEE", "Enterobacterales productores de BLEE"),
      target("pseudomonas", "P. aer.", "Pseudomonas aeruginosa"),
      target("anaerobes", "Anaerob.", "Anaerobios"),
      target("atypicals", "Atíp.", "Patógenos atípicos"),
    ]);

    const COVERAGE = Object.freeze([
      coverage({
        id: "amp-amox",
        label: "Ampicilina/amoxicilina",
        group: "Penicilinas",
        values: {
          strep: "yes", sasm: "no", sarm: "no", efaecalis: "yes", listeria: "yes",
          enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "maybe", atypicals: "no",
        },
      }),
      coverage({
        id: "amoxclav",
        label: "Amox-clav",
        group: "Penicilinas",
        values: {
          strep: "yes", sasm: "yes", sarm: "no", efaecalis: "yes", listeria: "maybe",
          enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "yes", atypicals: "no",
        },
      }),
      coverage({
        id: "cloxacilina",
        catalogId: "cloxa-cefa",
        label: "Cloxacilina",
        group: "Penicilinas",
        values: {
          strep: "maybe", sasm: "yes", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "no", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "piptazo",
        label: "Pip-tazo",
        group: "Penicilinas",
        values: {
          strep: "yes", sasm: "yes", sarm: "no", efaecalis: "maybe", listeria: "no",
          enterobacterales: "yes", blee: "maybe", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
        },
      }),
      coverage({
        id: "cefazolina",
        catalogId: "cloxa-cefa",
        label: "Cefazolina",
        group: "Cefalosporinas",
        values: {
          strep: "yes", sasm: "yes", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "cefuroxime",
        label: "Cefuroxima",
        group: "Cefalosporinas",
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "ceftriaxone",
        label: "Ceftriaxona/cefotaxima",
        group: "Cefalosporinas",
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "yes", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "ceftazidime",
        label: "Ceftazidima",
        group: "Cefalosporinas",
        values: {
          strep: "maybe", sasm: "no", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "yes", blee: "no", pseudomonas: "yes", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "cefepime",
        label: "Cefepime",
        group: "Cefalosporinas",
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "yes", blee: "no", pseudomonas: "yes", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "anti-mrsa-ceph",
        label: "Ceftarolina",
        group: "Cefalosporinas",
        values: {
          strep: "yes", sasm: "yes", sarm: "yes", efaecalis: "no", listeria: "no",
          enterobacterales: "maybe", blee: "no", pseudomonas: "no", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "aztreonam",
        label: "Aztreonam",
        group: "Monobactámicos y carbapenémicos",
        values: {
          strep: "no", sasm: "no", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "yes", blee: "no", pseudomonas: "yes", anaerobes: "no", atypicals: "no",
        },
      }),
      coverage({
        id: "ertapenem",
        label: "Ertapenem",
        group: "Monobactámicos y carbapenémicos",
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "yes", blee: "yes", pseudomonas: "no", anaerobes: "yes", atypicals: "no",
        },
      }),
      coverage({
        id: "meropenem",
        catalogId: "mero-imi",
        label: "Meropenem",
        group: "Monobactámicos y carbapenémicos",
        sourceIds: ["local-proa-fjd", "aemps-meropenem"],
        notes: {
          efaecalis: "E. faecalis: actividad limitada; CIMA describe sensibilidad natural intermedia. Confirmar AST y pauta específica.",
          listeria: "Listeria: meropenem tiene actividad; el espectro no sustituye la elección de pauta para meningitis según protocolo.",
        },
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "yes",
          enterobacterales: "yes", blee: "yes", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
        },
      }),
      coverage({
        id: "imipenem",
        catalogId: "mero-imi",
        label: "Imipenem/cilastatina",
        group: "Monobactámicos y carbapenémicos",
        sourceIds: ["local-proa-fjd", "aemps-imipenem", "dailymed-imipenem"],
        notes: {
          listeria: "Listeria: actividad in vitro sin eficacia clínica establecida en la ficha estadounidense. Imipenem/cilastatina no se recomienda para meningitis (CIMA).",
        },
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "yes", listeria: "maybe",
          enterobacterales: "yes", blee: "yes", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
        },
      }),
      coverage({
        id: "ciprofloxacin",
        label: "Ciprofloxacino",
        group: "Fluoroquinolonas",
        sourceIds: ["aemps-ciprofloxacin", "idsa-amr-2026", "eucast-2026-quinolones"],
        notes: {
          strep: "Strep/neumococo: eficacia insuficiente; no elegir ciprofloxacino.",
          efaecalis: "E. faecalis: actividad limitada. EUCAST solo da puntos de corte para ITU no complicada; no extrapolar a otros focos.",
          blee: "BLEE: ciprofloxacino solo con sensibilidad confirmada y foco adecuado; resistencia asociada frecuente.",
          pseudomonas: "Pseudomonas: exigir AST y exposición adecuada, sin asumir cobertura empírica.",
          atypicals: "Atípicos: actividad frente a Legionella; no extrapolar a todo el grupo.",
        },
        values: {
          strep: "no", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "no",
          enterobacterales: "maybe", blee: "maybe", pseudomonas: "maybe", anaerobes: "no", atypicals: "maybe",
        },
      }),
      coverage({
        id: "levofloxacin",
        label: "Levofloxacino",
        group: "Fluoroquinolonas",
        sourceIds: ["aemps-levofloxacin", "idsa-amr-2026", "eucast-2026-quinolones"],
        notes: {
          efaecalis: "E. faecalis: EUCAST solo da puntos de corte para ITU no complicada; no extrapolar a otros focos.",
          listeria: "Listeria: sin cobertura clínica establecida en las fuentes revisadas; no asumir actividad terapéutica.",
          blee: "BLEE: levofloxacino solo con sensibilidad confirmada y foco adecuado; resistencia asociada frecuente.",
          pseudomonas: "Pseudomonas: exigir AST y exposición adecuada, sin asumir cobertura empírica.",
          anaerobes: "Anaerobios: actividad parcial que no ofrece cobertura fiable del grupo.",
        },
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "unknown",
          enterobacterales: "maybe", blee: "maybe", pseudomonas: "maybe", anaerobes: "no", atypicals: "yes",
        },
      }),
      coverage({
        id: "moxifloxacin",
        label: "Moxifloxacino",
        group: "Fluoroquinolonas",
        sourceIds: ["aemps-moxifloxacin", "eucast-2026-quinolones"],
        notes: {
          efaecalis: "E. faecalis: uso excepcional dirigido; EUCAST no permite informar sensible a moxifloxacino por ausencia de mecanismos de resistencia.",
          listeria: "Listeria: EUCAST señala evidencia insuficiente en meningitis; no asumir cobertura clínica.",
          enterobacterales: "Enterobacterales: sensibilidad variable; moxifloxacino no está indicado para ITU.",
          blee: "BLEE: frecuente resistencia asociada; no extrapolar las opciones urinarias de ciprofloxacino/levofloxacino.",
          anaerobes: "Anaerobios: algunos sensibles, pero B. fragilis puede ser resistente; no asumir cobertura universal.",
        },
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "maybe", listeria: "unknown",
          enterobacterales: "maybe", blee: "maybe", pseudomonas: "no", anaerobes: "maybe", atypicals: "yes",
        },
      }),
    ]);

    function target(id, shortLabel, label) {
      return Object.freeze({ id, shortLabel, label });
    }

    function coverage({ id, label, group, values, catalogId = id, sourceIds = ["local-proa-fjd"], notes = {} }) {
      return Object.freeze({
        id,
        catalogId,
        label,
        group,
        sourceIds: Object.freeze(sourceIds),
        notes: Object.freeze({ ...notes }),
        values: Object.freeze({ ...values }),
      });
    }

    function coverageSymbol(level) {
      if (level === "unknown") return "?";
      return level === "yes" ? "✓" : level === "maybe" ? "±" : "✗";
    }

    return Object.freeze({ COVERAGE_LEVELS, COVERAGE_TARGETS, COVERAGE, coverageSymbol });
  })();

  // src/rules.js
  __modules["rules"] = (() => {
    const { MBL_GUIDANCE, STENO_GUIDANCE } = __modules["clinical-guidance"];
    const FOCUS_OPTIONS = Object.freeze([
      { id: "cistitis", label: "Cistitis baja" },
      { id: "itu-complicada", label: "Pielonefritis / ITU complicada" },
      { id: "resp", label: "Neumonía / respiratorio" },
      { id: "abdomen", label: "Intraabdominal / biliar" },
      { id: "snc", label: "SNC / meningitis" },
      { id: "bacteriemia", label: "Bacteriemia / sepsis" },
      { id: "endocarditis", label: "Endocarditis" },
      { id: "piel", label: "Piel y partes blandas" },
    ]);

    const GERM_OPTIONS = Object.freeze([
      { id: "blee", label: "Enterobacterales BLEE" },
      { id: "ampc", label: "AmpC alto riesgo" },
      { id: "pseudo", label: "Pseudomonas" },
      { id: "dtr", label: "Pseudomonas DTR" },
      { id: "kpc", label: "CRE-KPC" },
      { id: "oxa48", label: "CRE OXA-48-like" },
      { id: "mbl", label: "CRE-MBL" },
      { id: "crab", label: "CRAB" },
      { id: "steno", label: "Stenotrophomonas" },
      { id: "sarm", label: "SARM" },
      { id: "sasm", label: "SASM" },
      { id: "enterococcus", label: "Enterococcus" },
      { id: "listeria", label: "Listeria" },
      { id: "anaerobios", label: "Anaerobios relevantes" },
    ]);

    const SEVERITY_OPTIONS = Object.freeze([
      { id: "estable", label: "Estable" },
      { id: "invasiva", label: "Invasiva / bacteriemia" },
      { id: "critico", label: "Shock / paciente crítico" },
    ]);

    const SEVERITY_GUIDANCE = Object.freeze({
      estable: Object.freeze({
        alert: "Paciente estable: confirmar foco y sensibilidad antes de ampliar; estrechar cuando sea seguro.",
      }),
      invasiva: Object.freeze({
        alert: "Infección invasiva o bacteriemia: asegurar exposición adecuada, control de foco y reevaluación microbiológica.",
      }),
      critico: Object.freeze({
        alert: "Paciente crítico: cubrir activo pronto y avisar a PROA/Infecciosas.",
      }),
    });

    const AMR_SOURCES = ["local-proa-fjd", "idsa-amr-2024"];
    const LOCAL_SOURCE = ["local-proa-fjd"];
    const BLEE_QUINOLONE_SOURCES = [...AMR_SOURCES, "idsa-amr-2026", "aemps-fluoroquinolonas", "aemps-moxifloxacin"];
    const CURRENT_AMR_SOURCES = ["local-proa-fjd", "idsa-amr-2026"];
    const STAPH_SOURCES = ["local-proa-fjd", "esc-endocarditis-2023", "idsa-sab-2026"];
    const SKIN_SOURCES = ["local-proa-fjd", "idsa-ssti-2014"];
    const RESPIRATORY_SOURCES = ["local-proa-fjd", "idsa-hap-vap-2016"];

    const BACTEREMIA_MICRO = Object.freeze([
      "Repetir hemocultivos hasta documentar su negativización.",
      "Realizar ecocardiograma transtorácico; valorar transesofágico según riesgo y resultados.",
      "Buscar el origen y focos secundarios; revisar catéteres y material implantado con Infecciosas.",
    ]);
    const BACTEREMIA_FOLLOW_UP = Object.freeze([
      "Si persisten los hemocultivos positivos, reevaluar el control del foco y buscar complicaciones.",
      "Individualizar la duración según la negativización de los cultivos y los focos identificados.",
      "La mejoría inicial no basta para decidir el alta o el cambio a tratamiento oral.",
    ]);
    const FOCUS_FOLLOW_UP = Object.freeze({
      cistitis: ["Revisar la respuesta y el urocultivo; ajustar al antibiótico activo más adecuado.", "Si aparecen fiebre, dolor lumbar o deterioro, reevaluar el foco y la gravedad."],
      "itu-complicada": ["Revisar cultivos y evolución; buscar obstrucción o una colección si la respuesta no es adecuada.", "Valorar el paso a vía oral cuando haya estabilidad, sensibilidad confirmada y buena absorción."],
      resp: ["Revisar la calidad de la muestra, los cultivos y la evolución respiratoria.", "Si no mejora, buscar complicaciones y reconsiderar el diagnóstico; ajustar tratamiento y duración."],
      abdomen: ["Comprobar que el foco abdominal está controlado.", "Ajustar el tratamiento a cultivos, evolución y complicaciones; el antibiótico no sustituye un drenaje necesario."],
      snc: ["Vigilar la evolución neurológica y las complicaciones.", "Ajustar el tratamiento y su duración con Infecciosas según el microorganismo y la evolución; no aplicar un cambio automático a vía oral."],
      bacteriemia: ["Revisar el origen, el control del foco y los resultados microbiológicos.", "Individualizar la duración y la desescalada según el microorganismo, el foco y la evolución."],
      endocarditis: ["Coordinar el seguimiento con el equipo de endocarditis y reevaluar posibles complicaciones.", "El tratamiento ambulatorio o por vía oral requiere selección y supervisión específicas; no depende solo de estar afebril."],
      piel: ["Revisar la extensión de la lesión y la respuesta al tratamiento.", "Comprobar el drenaje de las colecciones y reevaluar si hay progresión o signos sistémicos."],
    });

    const GERM_GUIDANCE = Object.freeze({
      blee: guidance({
        headline: "BLEE: el foco y la gravedad cambian la estrategia",
        doItems: ["Confirmar foco, gravedad y opciones activas en el AST.", "Separar cistitis baja, cUTI y enfermedad extraurinaria."],
        avoidItems: ["Tratar todas las infecciones BLEE como si fueran el mismo escenario.", "Usar una opción urinaria baja en pielonefritis o bacteriemia."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      }),
      ampc: guidance({
        headline: "AmpC alto riesgo: cefepime o carbapenémico, no ceftriaxona invasiva",
        doItems: ["Cefepime si sensible y CMI favorable.", "Carbapenémico si gravedad, foco profundo, CMI alta o sospecha de BLEE coproducida.", "Revisar especie: Enterobacter cloacae complex, K. aerogenes, C. freundii."],
        avoidItems: ["Ceftriaxona/cefotaxima/ceftazidima en infección invasiva.", "Pip-tazo como solución automática para AmpC invasiva."],
        microItems: ["Pedir CMI de cefepime y revisar posibilidad de BLEE coproducida."],
        sourceIds: AMR_SOURCES,
      }),
      pseudo: guidance({
        headline: "Pseudomonas: solo antipseudomónicos reales",
        doItems: ["Pip-tazo, ceftazidima, cefepime, meropenem/imipenem o aztreonam si sensible.", "En infección grave, pensar en exposición optimizada/perfusión extendida según protocolo.", "Desescalar al beta-lactámico activo más estrecho cuando llegue AST."],
        avoidItems: ["Ceftriaxona, cefuroxima, amox-clav o ertapenem.", "Tratar Proteus como si fuera Pseudomonas."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: AMR_SOURCES,
      }),
      dtr: guidance({
        headline: "Pseudomonas DTR: AST ampliado manda",
        doItems: ["Ceftolozano-tazobactam, ceftazidima-avibactam, imipenem-relebactam o cefiderocol según sensibilidad y foco.", "Si conserva beta-lactámico clásico no carbapenémico, puede preferirse dosis alta/perfusión extendida.", "Si sospecha MBL u opciones límite: valorar con AST ampliado, foco y PROA/Infecciosas."],
        avoidItems: ["Combinación de rutina si ya hay beta-lactámico activo confirmado.", "Fosfomicina oral para Pseudomonas DTR."],
        microItems: ["Solicitar AST de nuevos BL/BLI y cefiderocol."],
        sourceIds: AMR_SOURCES,
      }),
      kpc: guidance({
        headline: "CRE-KPC: inhibidores activos frente a KPC",
        doItems: ["Meropenem-vaborbactam, ceftazidima-avibactam o imipenem-relebactam si sensible.", "Elegir por foco, disponibilidad, CMI y toxicidad."],
        avoidItems: ["Polimixina/aminoglucósido/quinolona añadidos por reflejo si ya hay BL activo.", "Usar esquema de OXA-48/MBL sin confirmar mecanismo."],
        microItems: ["Confirmar KPC y AST de nuevos BL/BLI."],
        sourceIds: AMR_SOURCES,
      }),
      oxa48: guidance({
        headline: "CRE OXA-48-like: ceftazidima-avibactam",
        doItems: ["Ceftazidima-avibactam si sensible.", "Cefiderocol como alternativa según foco, sensibilidad y disponibilidad."],
        avoidItems: ["Meropenem-vaborbactam o imipenem-relebactam como si fueran KPC.", "Olvidar anaerobios/Gram+ si el foco lo exige."],
        microItems: ["Tipado de carbapenemasa y AST completo."],
        sourceIds: AMR_SOURCES,
      }),
      mbl: guidance(MBL_GUIDANCE),
      crab: guidance({
        headline: "CRAB: primero infección real, luego sulbactam",
        doItems: ["Confirmar clínica compatible y control de foco.", "Sulbactam-durlobactam + meropenem/imipenem si disponible.", "Si no disponible: ampicilina-sulbactam alta dosis + otro agente activo según sensibilidad."],
        avoidItems: ["Meropenem/imipenem solos.", "Tratar colonización respiratoria sin síndrome infeccioso.", "Cefiderocol en monoterapia de reflejo."],
        microItems: ["Consultar PROA/Infecciosas y confirmar sensibilidad."],
        sourceIds: AMR_SOURCES,
      }),
      steno: guidance(STENO_GUIDANCE),
      sarm: guidance({
        headline: "SARM: el foco decide vancomicina, daptomicina, linezolid o beta-lactámico anti-SARM",
        doItems: ["Vancomicina o daptomicina en bacteriemia/endocarditis según foco.", "Ceftarolina como beta-lactámico anti-SARM dirigido; no extrapolar a ceftobiprol sin protocolo.", "Control de foco: drenaje, retirada de catéter, eco si bacteriemia."],
        avoidItems: ["Beta-lactámicos habituales.", "Daptomicina en neumonía.", "Tratar absceso sin drenaje si es drenable."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: LOCAL_SOURCE,
      }),
      sasm: guidance({
        headline: "SASM: elegir un betalactámico dirigido cuando sea posible",
        doItems: ["Cloxacilina o cefazolina según foco, sensibilidad y alergias.", "Revisar el control del foco y descartar infección profunda si hay bacteriemia."],
        avoidItems: ["Mantener cobertura anti-SARM sin indicación tras confirmar SASM."],
        microItems: ["Confirmar la sensibilidad a meticilina y ajustar el tratamiento al foco."],
        sourceIds: STAPH_SOURCES,
      }),
      enterococcus: guidance({
        headline: "Enterococcus: identificar la especie y la sensibilidad",
        doItems: ["E. faecalis sensible: ampicilina/amoxicilina o penicilina G dirigida si sensible.", "En E. faecalis endocarditis, ceftriaxona solo como sinergia con ampicilina según protocolo.", "Si E. faecium/VRE, estrategia dirigida y PROA."],
        avoidItems: ["Cefalosporinas en monoterapia para Enterococcus.", "Extrapolar una pauta para E. faecalis a E. faecium."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: LOCAL_SOURCE,
      }),
      listeria: guidance({
        headline: "Listeria: las cefalosporinas no proporcionan cobertura",
        doItems: ["En meningitis, ampicilina IV o amoxicilina IV según protocolo.", "Revisar la necesidad de otras coberturas mientras se confirma la etiología."],
        avoidItems: ["Ceftriaxona, cefotaxima o cefepime como tratamiento de Listeria.", "Confundir amoxicilina oral con una pauta de meningitis."],
        microItems: ["Obtener hemocultivos y estudiar el líquido cefalorraquídeo cuando sea seguro."],
        sourceIds: LOCAL_SOURCE,
      }),
      anaerobios: guidance({
        headline: "Anaerobios: foco y gravedad mandan",
        doItems: ["Amox-clav solo en cuadros comunitarios seleccionados y no graves.", "Pip-tazo o carbapenémico si foco grave/nosocomial/MDR y encaja con el resto del mapa.", "Ceftriaxona + metronidazol puede encajar en abdomen comunitario estable; no es regla universal."],
        avoidItems: ["Aztreonam solo.", "Ceftriaxona sola en foco abdominal con anaerobios.", "Ceftriaxona + metronidazol como respuesta automática en abdomen grave o nosocomial.", "Antibiótico como sustituto de drenaje."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: LOCAL_SOURCE,
      }),
    });

    const SCENARIO_RULES = Object.freeze([
      rule("blee-cistitis", 300, { germ: "blee", focus: "cistitis", severity: "estable" }, guidance({
        headline: "BLEE + cistitis baja: ahorrar carbapenémico si hay opción urinaria",
        doItems: ["Nitrofurantoína o TMP-SMX si sensible y encaja clínicamente.", "Ciprofloxacino o levofloxacino solo si sensible, sin alternativa habitual utilizable y tras valorar beneficio-riesgo.", "Fosfomicina solo si E. coli y cistitis baja encaja."],
        avoidItems: ["Carbapenémico si hay opción urinaria activa y paciente estable.", "Nitrofurantoína/fosfomicina si pielonefritis, prostatitis o bacteriemia.", "Moxifloxacino como opción urinaria."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: BLEE_QUINOLONE_SOURCES,
      })),
      rule("blee-snc", 300, { germ: "blee", focus: "snc" }, guidance({
        headline: "BLEE + SNC: no ertapenem; revisar penetración meníngea",
        doItems: ["Meropenem si carbapenémico y el foco SNC exige cobertura BLEE.", "Añadir coberturas de meningitis según edad, inmunosupresión y protocolo.", "Avisar a Micro/PROA por foco crítico."],
        avoidItems: ["Ertapenem o imipenem como pauta de meningitis.", "Dar por cubierta Listeria con ceftriaxona; meropenem tiene actividad, pero revisar la pauta específica según protocolo.", "Paso oral precoz sin estabilidad ni control microbiológico."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: [...AMR_SOURCES, "aemps-meropenem", "aemps-imipenem"],
      })),
      rule("blee-critical", 250, { germ: "blee", focus: ["itu-complicada", "resp", "abdomen", "bacteriemia", "piel"], severity: "critico" }, guidance({
        headline: "BLEE + shock/UCI: meropenem o imipenem, no ertapenem de entrada",
        doItems: ["Meropenem/imipenem si carbapenémico y paciente crítico.", "Optimizar exposición según protocolo, función renal y foco.", "Desescalar cuando AST, evolución y control de foco lo permitan."],
        avoidItems: ["Ertapenem en shock/UCI o hipoalbuminemia.", "Pip-tazo o cefepime como dirigido en BLEE grave aunque informe sensibilidad.", "Contar días de antibiótico inactivo como tratamiento efectivo."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      })),
      rule("blee-cuti", 200, { germ: "blee", focus: "itu-complicada" }, guidance({
        headline: "BLEE + pielonefritis/cUTI: no tratar como cistitis baja",
        doItems: ["TMP-SMX, ciprofloxacino o levofloxacino si sensible, estable y con buena absorción.", "Carbapenémico si grave, sin opción oral activa o mala evolución.", "Ertapenem puede encajar si estable y sin riesgo Pseudomonas/SNC."],
        avoidItems: ["Nitrofurantoína o fosfomicina para pielonefritis, prostatitis o cUTI sistémica.", "Pip-tazo como opción preferida si hay alternativa más fiable.", "Mantener carbapenémico si hay paso oral activo y estabilidad real.", "Moxifloxacino como opción urinaria."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: BLEE_QUINOLONE_SOURCES,
      })),
      rule("blee-respiratory", 200, { germ: "blee", focus: "resp" }, guidance({
        headline: "BLEE respiratoria/nosocomial: vigilar Pseudomonas antes de elegir ertapenem",
        doItems: ["Meropenem/imipenem si neumonía nosocomial, UCI o riesgo Pseudomonas.", "Ertapenem solo si BLEE estable y Pseudomonas no es un objetivo clínico.", "Ajustar a cultivo respiratorio fiable y evolución."],
        avoidItems: ["Ertapenem si hay riesgo Pseudomonas o neumonía nosocomial grave.", "Ceftriaxona, cefepime o pip-tazo como dirigidos en BLEE grave.", "Tratar colonización respiratoria como infección."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      })),
      rule("blee-extraurinary", 100, { germ: "blee", focus: ["bacteriemia", "abdomen", "piel"] }, guidance({
        headline: "BLEE invasiva/extraurinaria: carbapenémico como ancla",
        doItems: ["Ertapenem si estable, no crítico, sin SNC/neumonía nosocomial/riesgo Pseudomonas y albúmina razonable.", "Meropenem/imipenem si foco profundo, bacteriemia grave o dudas de exposición.", "Paso oral a TMP-SMX, ciprofloxacino o levofloxacino solo si sensible, estable, buen control de foco y absorción fiable."],
        avoidItems: ["Pip-tazo o cefepime como dirigido en BLEE extraurinaria grave aunque informe sensibilidad.", "Ertapenem si shock/UCI, hipoalbuminemia, SNC o riesgo Pseudomonas.", "Contar días de antibiótico inactivo como tratamiento efectivo."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: BLEE_QUINOLONE_SOURCES,
      })),
      rule("sarm-respiratory", 200, { germ: "sarm", focus: "resp" }, guidance({
        headline: "SARM respiratorio: no daptomicina",
        doItems: ["Linezolid o vancomicina según sensibilidad, función renal, hemograma, interacciones y protocolo.", "Si hay bacteriemia, revisar también su manejo específico con Infecciosas.", "Buscar complicaciones pleurales si la evolución no es adecuada."],
        avoidItems: ["Daptomicina para tratar la neumonía.", "Betalactámicos habituales como cobertura de SARM.", "Interpretar cualquier aislamiento respiratorio como infección."],
        microItems: ["Obtener una muestra respiratoria adecuada y hemocultivos cuando estén indicados.", "Revisar el antibiograma y la necesidad de mantener cobertura anti-SARM."],
        sourceIds: [...RESPIRATORY_SOURCES, "aemps-linezolid", "idsa-sab-2026"],
      })),
      rule("listeria-snc", 200, { germ: "listeria", focus: "snc" }, guidance({
        headline: "SNC con riesgo Listeria: añade aminopenicilina",
        doItems: ["Ampicilina IV o amoxicilina IV según protocolo para cubrir Listeria.", "Mantener las otras coberturas de meningitis mientras sean necesarias; ceftriaxona o cefotaxima no cubren Listeria."],
        avoidItems: ["Cefalosporinas como tratamiento de Listeria.", "Retrasar un tratamiento indicado por esperar pruebas diagnósticas.", "Interpretar amoxicilina oral como pauta de meningitis."],
        microItems: ["Obtener hemocultivos y estudiar el líquido cefalorraquídeo cuando sea seguro.", "Confirmar el microorganismo y revisar el tratamiento con Infecciosas."],
        sourceIds: LOCAL_SOURCE,
      })),
      rule("sarm-bacteremia", 200, { germ: "sarm", focus: "bacteriemia", severity: ["invasiva", "critico"] }, guidance({
        headline: "SARM en sangre: tratar y buscar el foco",
        doItems: ["Vancomicina IV o daptomicina según foco, sensibilidad y protocolo.", "Si hay neumonía concomitante, daptomicina no cubre el foco pulmonar.", "Controlar el foco y valorar la retirada de material infectado."],
        avoidItems: ["Considerar un hemocultivo positivo para S. aureus como contaminación sin estudiarlo.", "Elegir el tratamiento solo por la mejoría de la fiebre."],
        microItems: BACTEREMIA_MICRO,
        followUpItems: BACTEREMIA_FOLLOW_UP,
        sourceIds: STAPH_SOURCES,
      })),
      rule("sarm-skin-stable", 200, { germ: "sarm", focus: "piel", severity: "estable" }, guidance({
        headline: "SARM en piel: distinguir absceso e infección difusa",
        doItems: ["Drenar el absceso cuando corresponda y valorar si necesita además antibiótico.", "Si se indica tratamiento oral, cotrimoxazol, doxiciclina o clindamicina según sensibilidad y protocolo."],
        avoidItems: ["Dar por cubiertos los estreptococos con cotrimoxazol o doxiciclina.", "Tratar una colección drenable solo con antibióticos."],
        microItems: ["Cultivar el pus cuando proceda y revisar el antibiograma."],
        sourceIds: SKIN_SOURCES,
      })),
      rule("sarm-skin-invasive", 200, { germ: "sarm", focus: "piel", severity: ["invasiva", "critico"] }, guidance({
        headline: "SARM en piel con infección grave: tratamiento IV y control del foco",
        doItems: ["Vancomicina IV; valorar alternativas según foco y sensibilidad.", "Si se sospecha infección necrosante, valoración quirúrgica urgente y cobertura adicional según protocolo."],
        avoidItems: ["Retrasar la cirugía si se sospecha necrosis.", "Suponer que cubrir SARM basta ante una infección polimicrobiana."],
        microItems: ["Obtener cultivos profundos y hemocultivos cuando estén indicados.", "Si se confirma bacteriemia por S. aureus, seguir su ruta específica."],
        sourceIds: [...SKIN_SOURCES, "idsa-sab-2026"],
      })),
      rule("sarm-endocarditis", 200, { germ: "sarm", focus: "endocarditis", severity: ["invasiva", "critico"] }, guidance({
        headline: "Endocarditis por SARM: tratamiento coordinado por un equipo especializado",
        doItems: ["Vancomicina o una pauta combinada con daptomicina según sensibilidad y protocolo especializado.", "Distinguir válvula nativa, prótesis y dispositivo intracardiaco; valorar indicación quirúrgica."],
        avoidItems: ["Extrapolar la pauta de válvula nativa a una prótesis.", "Añadir gentamicina de rutina en endocarditis estafilocócica sobre válvula nativa."],
        microItems: ["Hemocultivos de control, ecocardiografía y evaluación de complicaciones.", "Optimizar exposición y vigilar toxicidad con Infecciosas y Farmacia."],
        sourceIds: STAPH_SOURCES,
      })),
      rule("sasm-bacteremia", 200, { germ: "sasm", focus: "bacteriemia", severity: ["invasiva", "critico"] }, guidance({
        headline: "SASM en sangre: cloxacilina o cefazolina como tratamiento dirigido",
        doItems: ["Elegir cloxacilina o cefazolina IV cuando sean adecuadas para el paciente.", "Buscar el origen y controlar el foco; consultar con Infecciosas."],
        avoidItems: ["Mantener vancomicina por comodidad si puede utilizarse un betalactámico dirigido.", "Confundir desaparición de la fiebre con resolución de la bacteriemia."],
        microItems: BACTEREMIA_MICRO,
        followUpItems: BACTEREMIA_FOLLOW_UP,
        sourceIds: STAPH_SOURCES,
      })),
      rule("sasm-endocarditis", 200, { germ: "sasm", focus: "endocarditis", severity: ["invasiva", "critico"] }, guidance({
        headline: "Endocarditis por SASM: betalactámico dirigido y evaluación de complicaciones",
        doItems: ["Cloxacilina o cefazolina IV según alergias y protocolo.", "Si hay prótesis, adaptar la pauta con el equipo de endocarditis."],
        avoidItems: ["Añadir gentamicina de rutina en válvula nativa.", "Aplicar una pauta corta sin confirmar que el escenario la permite."],
        microItems: ["Hemocultivos de control y ecocardiografía.", "Revisar complicaciones, material infectado e indicación quirúrgica."],
        sourceIds: STAPH_SOURCES,
      })),
      rule("sasm-skin", 200, { germ: "sasm", focus: "piel" }, guidance({
        headline: "SASM en piel: tratamiento dirigido y drenaje cuando corresponda",
        doItems: ["Elegir un betalactámico antiestafilocócico según extensión y gravedad; cloxacilina o cefazolina si se necesita tratamiento IV.", "Drenar las colecciones y reevaluar si hay signos de infección profunda."],
        avoidItems: ["Ampliar a SARM sin indicación tras confirmar SASM."],
        microItems: ["Ajustar a cultivos; si hay bacteriemia, seguir la ruta correspondiente."],
        sourceIds: SKIN_SOURCES,
      })),
      rule("ampc-cistitis", 200, { germ: "ampc", focus: "cistitis", severity: "estable" }, guidance({
        headline: "AmpC y cistitis: elegir según sensibilidad",
        doItems: ["Nitrofurantoína o cotrimoxazol si la bacteria es sensible y el foco es exclusivamente vesical."],
        avoidItems: ["Extrapolar una opción de cistitis a pielonefritis o bacteriemia."],
        microItems: ["Confirmar especie y antibiograma; revisar opciones orales activas."],
        sourceIds: CURRENT_AMR_SOURCES,
      })),
      rule("ampc-cuti", 200, { germ: "ampc", focus: "itu-complicada" }, guidance({
        headline: "AmpC e infección urinaria alta: elegir un antibiótico adecuado para el foco",
        doItems: ["Cotrimoxazol, ciprofloxacino o levofloxacino si la bacteria es sensible y el estado clínico lo permite.", "Si se precisa un betalactámico IV, valorar cefepime según sensibilidad; carbapenémico si está justificado."],
        avoidItems: ["Nitrofurantoína para pielonefritis.", "Ceftriaxona como tratamiento dirigido de una infección invasiva por AmpC de riesgo."],
        microItems: ["Revisar urocultivo, función renal y posible obstrucción."],
        sourceIds: [...CURRENT_AMR_SOURCES, "aemps-fluoroquinolonas"],
      })),
      rule("ampc-extraurinary", 200, { germ: "ampc", focus: ["resp", "abdomen", "piel"] }, guidance({
        headline: "AmpC fuera de la vía urinaria: cefepime si es adecuado",
        doItems: ["Valorar cefepime según antibiograma, exposición y función renal.", "Considerar carbapenémico si hay BLEE asociada o cefepime no resulta adecuado."],
        avoidItems: ["Ceftriaxona, cefotaxima o ceftazidima como tratamiento dirigido de infección invasiva.", "Piperacilina-tazobactam como elección automática."],
        microItems: ["Confirmar especie y sensibilidad; comprobar el control del foco."],
        sourceIds: CURRENT_AMR_SOURCES,
      })),
      rule("ampc-bacteremia", 200, { germ: "ampc", focus: "bacteriemia", severity: ["invasiva", "critico"] }, guidance({
        headline: "AmpC en sangre: no mantener ceftriaxona por una sensibilidad inicial",
        doItems: ["Cefepime si resulta adecuado; valorar carbapenémico según sensibilidad y posible BLEE asociada."],
        avoidItems: ["Ceftriaxona como tratamiento dirigido de bacteriemia por AmpC de riesgo."],
        microItems: ["Confirmar la especie, el antibiograma y el origen de la bacteriemia."],
        sourceIds: CURRENT_AMR_SOURCES,
      })),
      rule("pseudo-cuti", 200, { germ: "pseudo", focus: "itu-complicada" }, guidance({
        headline: "Pseudomonas en infección urinaria: antibiograma y control de la obstrucción",
        doItems: ["Elegir un antipseudomónico activo según antibiograma y gravedad.", "Preferir un betalactámico no carbapenémico activo cuando sea adecuado."],
        avoidItems: ["Ceftriaxona o ertapenem como cobertura de Pseudomonas.", "Tratar una bacteriuria sin síntomas como una infección urinaria."],
        microItems: ["Revisar urocultivo, sondaje y obstrucción; consultar con Urología si precisa drenaje."],
        sourceIds: CURRENT_AMR_SOURCES,
      })),
      rule("pseudo-respiratory", 200, { germ: "pseudo", focus: "resp", severity: ["estable", "invasiva"] }, guidance({
        headline: "Pseudomonas respiratoria: confirmar infección y dirigir el tratamiento",
        doItems: ["Elegir un antipseudomónico activo según la sensibilidad.", "Sin shock ni alto riesgo de muerte, un antibiótico activo suele bastar como tratamiento dirigido."],
        avoidItems: ["Tratar colonización respiratoria sin infección compatible.", "Aminoglucósido como único tratamiento de una neumonía."],
        microItems: ["Revisar la muestra respiratoria y el antibiograma; solicitar sensibilidad ampliada si hay resistencia."],
        sourceIds: [...RESPIRATORY_SOURCES, "idsa-amr-2026"],
      })),
      rule("pseudo-respiratory-critical", 250, { germ: "pseudo", focus: "resp", severity: "critico" }, guidance({
        headline: "Pseudomonas respiratoria con shock: tratamiento activo y reevaluación precoz",
        doItems: ["Iniciar cobertura activa según antecedentes y protocolo local; valorar combinación inicial con UCI/Infecciosas.", "Revisar la necesidad de combinación cuando se conozca la sensibilidad y se resuelva el shock."],
        avoidItems: ["Aminoglucósido como único tratamiento de la neumonía.", "Mantener una combinación sin reevaluar su necesidad."],
        microItems: ["Obtener muestras respiratorias y hemocultivos; optimizar exposición y función renal."],
        sourceIds: RESPIRATORY_SOURCES,
      })),
      rule("pseudo-bacteremia", 200, { germ: "pseudo", focus: "bacteriemia", severity: ["invasiva", "critico"] }, guidance({
        headline: "Pseudomonas en sangre: tratamiento activo y búsqueda del origen",
        doItems: ["Elegir un betalactámico antipseudomónico activo; optimizar exposición según protocolo.", "Revisar catéteres y otros posibles focos."],
        avoidItems: ["Ceftriaxona, amoxicilina-clavulánico o ertapenem.", "Asumir que todos los antipseudomónicos siguen siendo activos."],
        microItems: ["Confirmar sensibilidad; si el perfil es DTR, consultar con PROA y solicitar estudio ampliado."],
        sourceIds: CURRENT_AMR_SOURCES,
      })),
      rule("enterococcus-bacteremia", 200, { germ: "enterococcus", focus: "bacteriemia", severity: ["invasiva", "critico"] }, guidance({
        headline: "Enterococcus en sangre: especie, sensibilidad y posible endocarditis",
        doItems: ["Ampicilina IV si la especie es sensible y resulta adecuada para el foco.", "En E. faecium o resistencia a vancomicina, acordar tratamiento dirigido con Infecciosas."],
        avoidItems: ["Cefalosporinas en monoterapia.", "Aplicar una pauta para E. faecalis sin identificar la especie."],
        microItems: ["Confirmar especie y antibiograma; buscar el origen.", "Valorar endocarditis si persiste la bacteriemia o la clínica lo sugiere."],
        sourceIds: [...LOCAL_SOURCE, "esc-endocarditis-2023"],
      })),
      rule("enterococcus-endocarditis", 200, { germ: "enterococcus", focus: "endocarditis", severity: ["invasiva", "critico"] }, guidance({
        headline: "Endocarditis por Enterococcus: la especie determina la combinación",
        doItems: ["En E. faecalis sensible, ampicilina con ceftriaxona es una opción de tratamiento combinado.", "Acordar pauta y duración con el equipo de endocarditis según especie y sensibilidad."],
        avoidItems: ["Ceftriaxona sola.", "Extrapolar ampicilina con ceftriaxona a E. faecium."],
        microItems: ["Identificar la especie y revisar resistencia a betalactámicos, vancomicina y aminoglucósidos.", "Hemocultivos de control y evaluación ecocardiográfica."],
        sourceIds: ["esc-endocarditis-2023"],
      })),
    ]);

    const CONTEXT_RULES = Object.freeze([
      Object.freeze({
        id: "snc-penetration",
        when: { focus: "snc" },
        exceptGerms: ["listeria", "sarm"],
        microItems: ["En SNC, revisar penetración meníngea y necesidad de cubrir Listeria según edad/inmunosupresión."],
        sourceIds: LOCAL_SOURCE,
      }),
      Object.freeze({
        id: "abdomen-anaerobes",
        when: { focus: "abdomen" },
        exceptGerms: ["anaerobios", "crab", "steno"],
        microItems: ["En foco abdominal, comprobar si tu pauta cubre anaerobios o añade metronidazol."],
        sourceIds: LOCAL_SOURCE,
      }),
    ]);

    function resolveScenario(input) {
      const base = GERM_GUIDANCE[input.germ];
      if (!base || !SEVERITY_GUIDANCE[input.severity]) {
        return null;
      }

      const matchingRules = SCENARIO_RULES.filter((candidate) => matchesWhen(candidate.when, input)).sort(
        (left, right) => right.priority - left.priority,
      );
      const selectedRule = matchingRules[0] ?? null;
      const selected = selectedRule?.result ?? base;
      const contextRules = CONTEXT_RULES.filter(
        (candidate) =>
          matchesWhen(candidate.when, input) && !candidate.exceptGerms?.includes(input.germ),
      );
      const sourceIds = new Set(selected.sourceIds);
      const microItems = [...selected.microItems];

      for (const contextRule of contextRules) {
        microItems.push(...contextRule.microItems);
        contextRule.sourceIds.forEach((sourceId) => sourceIds.add(sourceId));
      }

      const scope = selectedRule ? "specific" : contextRules.length ? "contextual" : "germ-only";
      const scopeNotice =
        scope === "germ-only"
          ? " Esta combinación concreta de foco y gravedad no dispone de una regla específica: la salida es orientación por germen/mecanismo."
          : "";

      return Object.freeze({
        input: Object.freeze({ ...input }),
        headline: selected.headline,
        doItems: Object.freeze([...selected.doItems]),
        avoidItems: Object.freeze([...selected.avoidItems]),
        microItems: Object.freeze(microItems),
        followUpItems: Object.freeze([...(selected.followUpItems ?? FOCUS_FOLLOW_UP[input.focus] ?? [])]),
        alert: `${SEVERITY_GUIDANCE[input.severity].alert}${scopeNotice}`,
        scope,
        ruleId: selectedRule?.id ?? null,
        contextRuleIds: Object.freeze(contextRules.map((candidate) => candidate.id)),
        sourceIds: Object.freeze([...sourceIds]),
      });
    }

    function getTopMatchingRules(input) {
      const matches = SCENARIO_RULES.filter((candidate) => matchesWhen(candidate.when, input));
      if (!matches.length) return [];
      const highestPriority = Math.max(...matches.map((candidate) => candidate.priority));
      return matches.filter((candidate) => candidate.priority === highestPriority);
    }

    function matchesWhen(when, input) {
      return Object.entries(when).every(([key, expected]) => {
        const accepted = Array.isArray(expected) ? expected : [expected];
        return accepted.includes(input[key]);
      });
    }

    function guidance({ headline, doItems, avoidItems, microItems, followUpItems, sourceIds }) {
      return Object.freeze({
        headline,
        doItems: Object.freeze(doItems),
        avoidItems: Object.freeze(avoidItems),
        microItems: Object.freeze(microItems),
        followUpItems: followUpItems ? Object.freeze([...followUpItems]) : null,
        sourceIds: Object.freeze(sourceIds),
      });
    }

    function rule(id, priority, when, result) {
      return Object.freeze({ id, priority, when: Object.freeze(when), result });
    }

    const AUDITED_SCENARIOS = Object.freeze(
      GERM_OPTIONS.flatMap((germ) =>
        FOCUS_OPTIONS.flatMap((focus) =>
          SEVERITY_OPTIONS.map((severity) =>
            Object.freeze({ germ: germ.id, focus: focus.id, severity: severity.id }),
          ),
        ),
      ).filter((input) => resolveScenario(input)?.ruleId),
    );

    function isAuditedScenario(input) {
      return AUDITED_SCENARIOS.some(
        (candidate) =>
          candidate.germ === input.germ &&
          candidate.focus === input.focus &&
          candidate.severity === input.severity,
      );
    }

    function getAuditedGermOptions() {
      const allowed = new Set(AUDITED_SCENARIOS.map(({ germ }) => germ));
      return GERM_OPTIONS.filter(({ id }) => allowed.has(id));
    }

    function getAuditedFocusOptions(germ) {
      const allowed = new Set(
        AUDITED_SCENARIOS.filter((scenario) => scenario.germ === germ).map(({ focus }) => focus),
      );
      return FOCUS_OPTIONS.filter(({ id }) => allowed.has(id));
    }

    function getAuditedSeverityOptions(germ, focus) {
      const allowed = new Set(
        AUDITED_SCENARIOS.filter(
          (scenario) => scenario.germ === germ && scenario.focus === focus,
        ).map(({ severity }) => severity),
      );
      return SEVERITY_OPTIONS.filter(({ id }) => allowed.has(id));
    }

    return Object.freeze({ FOCUS_OPTIONS, GERM_OPTIONS, SEVERITY_OPTIONS, SEVERITY_GUIDANCE, GERM_GUIDANCE, SCENARIO_RULES, CONTEXT_RULES, resolveScenario, getTopMatchingRules, matchesWhen, AUDITED_SCENARIOS, isAuditedScenario, getAuditedGermOptions, getAuditedFocusOptions, getAuditedSeverityOptions });
  })();

  // src/selectors.js
  __modules["selectors"] = (() => {
    const { COVERAGE, COVERAGE_TARGETS, coverageSymbol } = __modules["coverage"];
    function normalize(text) {
      return String(text ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }

    function filterOrganisms(organisms, query, group = "all") {
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

    function filterAntibiotics(antibiotics, query) {
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
            ...(antibiotic.precautions ?? []),
            antibiotic.search,
          ].join(" "),
        ).includes(needle),
      );
    }

    function filterMechanisms(mechanisms, query) {
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

    function buildMatrix() {
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
                  return Object.freeze({ targetId: target.id, level, symbol: coverageSymbol(level), note: entry.notes[target.id] ?? "" });
                }),
              ),
            }),
          ),
        ),
      });
    }

    function toneClass(group) {
      const semanticGroups = {
        positive: "accent-positive",
        negative: "accent-negative",
        anaerobe: "accent-anaerobe",
        atypical: "accent-atypical",
      };
      return semanticGroups[group] ?? `accent-${group}`;
    }

    function optionLabel(options, id) {
      return options.find((option) => option.id === id)?.label ?? id;
    }

    return Object.freeze({ normalize, filterOrganisms, filterAntibiotics, filterMechanisms, buildMatrix, toneClass, optionLabel });
  })();

  // src/classification.js
  __modules["classification"] = (() => {
    const { normalize } = __modules["selectors"];
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

    const CLASSIFICATION = Object.freeze(classificationData.map((group) => Object.freeze({
      ...group,
      rows: Object.freeze(group.rows.map((row) => Object.freeze({
        ...row,
        taxa: Object.freeze(row.taxa),
        organismIds: Object.freeze(row.organismIds),
        sourceIds: Object.freeze(row.sourceIds),
      }))),
    })));

    const CLASSIFICATION_NOTES = Object.freeze([
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

    function filterClassification(query = "", groupId = "all") {
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

    return Object.freeze({ CLASSIFICATION, CLASSIFICATION_NOTES, filterClassification });
  })();

  // src/sources.js
  __modules["sources"] = (() => {
    const SOURCES = Object.freeze({
      "classification-image": Object.freeze({
        id: "classification-image",
        title: "Tabla de clasificación bacteriana aportada por el usuario",
        version: "Imagen original · edición no identificada",
        registeredAt: "2026-09-20",
        scope: "Origen del esquema. Se conserva sin cambios para cotejarlo; las notas de la sección explican las correcciones y los datos no corroborados.",
        url: "assets/clasificacion-bacteriana-original.png",
      }),
      "uk-smi-id1": Object.freeze({
        id: "uk-smi-id1",
        title: "UK SMI ID 1 · Identificación de bacterias de importancia médica",
        version: "4 · 06-08-2025 · algoritmos de morfología",
        registeredAt: "2026-09-20",
        scope: "Gram, morfología y crecimiento; orientación de identificación, con variabilidad y necesidad de confirmación microbiológica.",
        url: "https://www.rcpath.org/asset/7BCE1B56-E62F-4FE2-AA6EAB8930779A24/",
      }),
      "uk-smi-id4": Object.freeze({
        id: "uk-smi-id4",
        title: "UK SMI ID 4 · Streptococcus, Enterococcus y microorganismos similares",
        version: "4 · 22-09-2021",
        registeredAt: "2026-09-20",
        scope: "Hemólisis, Lancefield, optoquina, bilis-esculina y PYR. Matices de S. dysgalactiae, grupo S. anginosus y enterococos.",
        url: "https://www.rcpath.org/asset/CE35B1B6-9D79-4125-A0F64BA28E9A3584/",
      }),
      "uk-smi-id7": Object.freeze({
        id: "uk-smi-id7",
        title: "UK SMI ID 7 · Staphylococcus, Micrococcus y Rothia",
        version: "4 · 26-05-2020",
        registeredAt: "2026-09-20",
        scope: "Coagulasa, novobiocina y limitaciones de las pruebas; S. lugdunensis puede tener aglutinación positiva con coagulasa en tubo negativa.",
        url: "https://www.rcpath.org/asset/DB5F13CB-53CA-4E9E-A0937B78B610D0AC/",
      }),
      "uk-smi-id16": Object.freeze({
        id: "uk-smi-id16",
        title: "UK SMI ID 16 · Identificación de Enterobacteriaceae",
        version: "4 · 13-04-2015 · nomenclatura de la fuente",
        registeredAt: "2026-09-20",
        scope: "Lactosa y rasgos bioquímicos variables de enterobacterias. No respalda el porcentaje 10–15 % de la imagen como estimación actual.",
        url: "https://www.rcpath.org/asset/28C29E82-88C1-4DD3-8F73BA01FA251D49/",
      }),
      "uk-smi-id17": Object.freeze({
        id: "uk-smi-id17",
        title: "UK SMI ID 17 · Pseudomonas y otros no fermentadores de glucosa",
        version: "4.1 · 31-07-2025 · tabla 2",
        registeredAt: "2026-09-20",
        scope: "Oxidasa positiva en P. aeruginosa y negativa en Acinetobacter y S. maltophilia; excepciones dentro del género Pseudomonas.",
        url: "https://www.rcpath.org/asset/BFD560D2-EB3A-4260-BF1F63FEEE21325A/",
      }),
      "eucast-expected-phenotypes": Object.freeze({
        id: "eucast-expected-phenotypes",
        title: "EUCAST · Fenotipos de resistencia esperados",
        version: "1.2 · enero de 2023 · tabla 4",
        registeredAt: "2026-09-20",
        scope: "Resistencia esperada a vancomicina en E. gallinarum, E. casseliflavus, Leuconostoc y Pediococcus. No atribuye sensibilidad universal a E. faecalis o E. faecium.",
        url: "https://www.eucast.org/fileadmin/eucast/pdf/expert_rules/Expected_Resistant_Phenotypes_v1.2_20230113.pdf",
      }),
      "uk-smi-id26": Object.freeze({
        id: "uk-smi-id26",
        title: "UK SMI ID 26 · Identificación de Helicobacter",
        version: "3.1 · 18-09-2025 · revisión científica de 2015",
        registeredAt: "2026-09-20",
        scope: "Morfología y crecimiento microaerófilo, apartado 4.2. La actualización de 2025 es administrativa; no se usa para recomendaciones terapéuticas.",
        url: "https://www.rcpath.org/asset/03A7F1ED-EF84-497C-AF44A9745EA5A051/",
      }),
      "asm-achromobacter": Object.freeze({
        id: "asm-achromobacter",
        title: "ASM · Achromobacter Infections and Treatment Options",
        version: "Antimicrobial Agents and Chemotherapy · 2020",
        registeredAt: "2026-09-20",
        scope: "Únicamente características de identificación: bacilo gramnegativo aerobio, no fermentador y oxidasa positivo. No se importan opciones de tratamiento.",
        url: "https://journals.asm.org/doi/10.1128/aac.01025-20",
      }),
      "idsa-ampc-identification": Object.freeze({
        id: "idsa-ampc-identification",
        title: "IDSA 2026 · Especies y riesgo de AmpC inducible",
        version: "Apartado 2.1 · revisión dirigida",
        registeredAt: "2026-09-20",
        scope: "Diferencias por especie, inclusión de H. alvei con evidencia clínica limitada y corrección de la generalización de AmpC a Proteus.",
        url: "https://www.idsociety.org/practice-guideline/amr-guidance/",
      }),
      "manual-12-microbiology": Object.freeze({
        id: "manual-12-microbiology",
        title: "Manual de Diagnóstico y Terapéutica Médica · Hospital 12 de Octubre",
        version: "2022 · p. 970, tabla 7, nota 1",
        registeredAt: "2026-09-20",
        scope: "S. lugdunensis: estafilococo coagulasa negativo de alta virulencia. Comprobado en la página 986 del PDF local. No se han trasladado dosis ni pautas de esa tabla.",
        url: null,
      }),
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
      "idsa-amr-2026": Object.freeze({
        id: "idsa-amr-2026",
        title: "IDSA 2026 Guidance on Antimicrobial Resistant Gram-Negative Infections",
        version: "30 de julio de 2026 · revisión parcial",
        registeredAt: "2026-09-20",
        scope: "BLEE (1.1–1.3), rutas de AmpC (2.3–2.7), selección dirigida en Pseudomonas (4.1), NDM (3.5) y Stenotrophomonas invasiva (6.1–6.6). Orientación de EE. UU.; adaptar a disponibilidad, criterios de sensibilidad y PROA local. Revisión dirigida, no actualización íntegra del atlas.",
        url: "https://www.idsociety.org/practice-guideline/amr-guidance/",
      }),
      "idsa-sab-2026": Object.freeze({
        id: "idsa-sab-2026",
        title: "IDSA/ESCMID · Bacteriemia por Staphylococcus aureus",
        version: "Consenso de 9 de septiembre de 2026 · parte 1",
        registeredAt: "2026-09-20",
        scope: "Evaluación y seguimiento en adultos: hemocultivos de control, ecocardiografía, focos secundarios y duración individualizada. Esta parte no establece la selección del antibiótico.",
        url: "https://www.idsociety.org/practice-guideline/staphylococcus-aureus-bacteremia/",
      }),
      "esc-endocarditis-2023": Object.freeze({
        id: "esc-endocarditis-2023",
        title: "ESC · Guía de endocarditis",
        version: "2023 · apartados 7.6–7.8",
        registeredAt: "2026-09-20",
        scope: "Estafilococos y Enterococcus: diferencias por especie, sensibilidad y válvula nativa o protésica. Contrastado con el PDF original local, páginas 3979–3982. No se reproducen dosis ni duraciones como pautas automáticas.",
        url: "https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/endocarditis/",
      }),
      "idsa-ssti-2014": Object.freeze({
        id: "idsa-ssti-2014",
        title: "IDSA · Infecciones de piel y partes blandas",
        version: "2014 · abscesos, celulitis e infección necrosante",
        registeredAt: "2026-09-20",
        scope: "Drenaje, cultivo, cobertura de SASM/SARM y estreptococos, y valoración quirúrgica urgente si se sospecha necrosis. Adaptar a resistencias y protocolo local.",
        url: "https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/",
      }),
      "idsa-hap-vap-2016": Object.freeze({
        id: "idsa-hap-vap-2016",
        title: "ATS/IDSA · Neumonía hospitalaria y asociada a ventilación",
        version: "2016 · tratamiento dirigido de SARM y Pseudomonas",
        registeredAt: "2026-09-20",
        scope: "Vancomicina/linezolid en SARM; tratamiento según sensibilidad en Pseudomonas y reconsideración de la combinación según shock y evolución. El ámbito de la guía es la neumonía hospitalaria o asociada a ventilación.",
        url: "https://www.idsociety.org/practice-guideline/hap_vap/",
      }),
      "aemps-linezolid": Object.freeze({
        id: "aemps-linezolid",
        title: "AEMPS CIMA · Linezolid Glenmark 600 mg",
        version: "Ficha técnica · apartados 4.1 y 4.4",
        registeredAt: "2026-09-20",
        scope: "Indicaciones respiratorias por grampositivos sensibles y precauciones hematológicas e interacciones. No extrapolar cobertura a gramnegativos ni asumir que basta ante bacteriemia concomitante.",
        url: "https://cima.aemps.es/cima/dochtml/ft/81569/FT_81569.html",
      }),
      "aemps-meropenem": Object.freeze({
        id: "aemps-meropenem",
        title: "AEMPS CIMA · Meronem I.V. 1 g",
        version: "Ficha técnica consultada · apartados 4.1 y 5.1",
        registeredAt: "2026-09-19",
        scope: "Meropenem: actividad frente a Listeria y matiz de sensibilidad natural intermedia de E. faecalis. No equivale a elección terapéutica por foco.",
        url: "https://cima.aemps.es/cima/dochtml/ft/60640/FT_60640.html",
      }),
      "aemps-imipenem": Object.freeze({
        id: "aemps-imipenem",
        title: "AEMPS CIMA · Imipenem/Cilastatina Kabi 500 mg/500 mg",
        version: "Ficha técnica consultada · apartados 4.4 y 5.1",
        registeredAt: "2026-09-19",
        scope: "E. faecalis frecuentemente sensible; E. faecium resistente. Imipenem/cilastatina no se recomienda para meningitis.",
        url: "https://cima.aemps.es/cima/dochtml/ft/71285/FichaTecnica_71285.html",
      }),
      "dailymed-imipenem": Object.freeze({
        id: "dailymed-imipenem",
        title: "DailyMed · PRIMAXIN IV (imipenem/cilastatina)",
        version: "Ficha estadounidense · apartado 12.4",
        registeredAt: "2026-09-19",
        scope: "Actividad in vitro frente a Listeria; eficacia clínica no establecida en ensayos adecuados. No usar como recomendación de tratamiento ni extrapolar indicaciones de EE. UU.",
        url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f41d8abd-7792-4918-1b93-bd83ea01955e",
      }),
      "aemps-ciprofloxacin": Object.freeze({
        id: "aemps-ciprofloxacin",
        title: "AEMPS CIMA · Ciprofloxacino Ratio 250 mg",
        version: "Ficha técnica consultada · apartados 4.1–4.5 y 5.1",
        registeredAt: "2026-09-19",
        scope: "Espectro, eficacia insuficiente frente a estreptococos, resistencias adquiridas, foco urinario, función renal e interacción con tizanidina. Sin extrapolar dosis.",
        url: "https://cima.aemps.es/cima/dochtml/ft/67095/FT_67095.html",
      }),
      "aemps-levofloxacin": Object.freeze({
        id: "aemps-levofloxacin",
        title: "AEMPS CIMA · Levofloxacino cinfa 500 mg",
        version: "Ficha técnica consultada · apartados 4.1–4.5 y 5.1",
        registeredAt: "2026-09-19",
        scope: "Espectro respiratorio y urinario, actividad condicionada por AST, restricciones en NAC y necesidad de ajuste renal. Sin incorporar pautas posológicas.",
        url: "https://cima.aemps.es/cima/dochtml/ft/75614/FT_75614.html",
      }),
      "aemps-moxifloxacin": Object.freeze({
        id: "aemps-moxifloxacin",
        title: "AEMPS CIMA · Moxifloxacino Sandoz 400 mg",
        version: "Ficha técnica oral consultada · apartados 4.1–4.5 y 5.1–5.2",
        registeredAt: "2026-09-19",
        scope: "Espectro respiratorio, ausencia de actividad anti-Pseudomonas, anaerobios variables, QT y ausencia de indicación urinaria. No extrapolar indicaciones entre presentaciones oral e IV.",
        url: "https://cima.aemps.es/cima/dochtml/ft/74573/FichaTecnica_74573.html",
      }),
      "aemps-fluoroquinolonas": Object.freeze({
        id: "aemps-fluoroquinolonas",
        title: "AEMPS · Fluoroquinolonas: restricciones de uso",
        version: "Nota de seguridad MUH (FV), 07/2023 · 23-10-2023",
        registeredAt: "2026-09-19",
        scope: "Uso restringido, reacción grave previa, daños tendinosos/neurológicos y factores de riesgo. Beneficio-riesgo individual; no selección automática por espectro.",
        url: "https://www.aemps.gob.es/informa/fluoroquinolonas-de-administracion-sistemica-o-inhalada-recordatorio-sobre-las-restricciones-de-uso/",
      }),
      "eucast-2026-quinolones": Object.freeze({
        id: "eucast-2026-quinolones",
        title: "EUCAST · Clinical Breakpoint Tables",
        version: "16.1 · 24-06-2026",
        registeredAt: "2026-09-19",
        scope: "Quinolonas: límites por foco en Enterococcus (p. 41), estreptococos y evidencia insuficiente para moxifloxacino en meningitis por Listeria (p. 90). El atlas no reproduce puntos de corte ni usa sus símbolos como categorías S/I/R.",
        url: "https://www.eucast.org/fileadmin/eucast/pdf/breakpoints/v_16.1_Breakpoint_Tables.pdf",
      }),
    });

    function getSources(sourceIds) {
      return sourceIds.map((sourceId) => SOURCES[sourceId]).filter(Boolean);
    }

    return Object.freeze({ SOURCES, getSources });
  })();

  // src/validate.js
  __modules["validate"] = (() => {
    const { ANTIBIOTICS, CASES, MECHANISMS, ORGANISMS, SECTIONS } = __modules["catalog"];
    const { COVERAGE, COVERAGE_LEVELS, COVERAGE_TARGETS } = __modules["coverage"];
    const {
      CONTEXT_RULES,
      AUDITED_SCENARIOS,
      FOCUS_OPTIONS,
      GERM_GUIDANCE,
      GERM_OPTIONS,
      SCENARIO_RULES,
      SEVERITY_OPTIONS,
      getTopMatchingRules,
      isAuditedScenario,
      resolveScenario,
    } = __modules["rules"];
    const { SOURCES } = __modules["sources"];
    const { CLASSIFICATION, CLASSIFICATION_NOTES } = __modules["classification"];
    function validateData() {
      const errors = [];
      const sourceIds = new Set(Object.keys(SOURCES));
      const focusIds = new Set(FOCUS_OPTIONS.map(({ id }) => id));
      const germIds = new Set(GERM_OPTIONS.map(({ id }) => id));
      const severityIds = new Set(SEVERITY_OPTIONS.map(({ id }) => id));

      checkUniqueIds(errors, "secciones", SECTIONS);
      checkUniqueIds(errors, "organismos", ORGANISMS);
      checkUniqueIds(errors, "antibióticos", ANTIBIOTICS);
      checkUniqueIds(errors, "mecanismos", MECHANISMS);
      checkUniqueIds(errors, "casos", CASES);
      checkUniqueIds(errors, "focos", FOCUS_OPTIONS);
      checkUniqueIds(errors, "gérmenes", GERM_OPTIONS);
      checkUniqueIds(errors, "gravedades", SEVERITY_OPTIONS);
      checkUniqueIds(errors, "reglas", SCENARIO_RULES);
      checkUniqueIds(errors, "reglas contextuales", CONTEXT_RULES);
      checkUniqueIds(errors, "filas de cobertura", COVERAGE);
      checkUniqueIds(errors, "columnas de cobertura", COVERAGE_TARGETS);
      const classificationRows = CLASSIFICATION.flatMap((group) => group.rows);
      checkUniqueIds(errors, "grupos de clasificación", CLASSIFICATION);
      checkUniqueIds(errors, "ramas de clasificación", classificationRows);
      checkSourceReferences(errors, "clasificación", classificationRows, sourceIds);
      checkSourceReferences(errors, "nota de clasificación", CLASSIFICATION_NOTES.map((note) => ({ ...note, id: note.title })), sourceIds);
      const organismIds = new Set(ORGANISMS.map(({ id }) => id));
      for (const row of classificationRows) {
        for (const id of row.organismIds) {
          if (!organismIds.has(id)) errors.push(`Clasificación ${row.id}: ficha inexistente (${id}).`);
        }
      }

      if (!AUDITED_SCENARIOS.length) {
        errors.push("No existe ninguna ruta clínica auditada para el selector.");
      }

      checkSourceReferences(errors, "organismo", ORGANISMS, sourceIds);
      checkSourceReferences(errors, "antibiótico", ANTIBIOTICS, sourceIds);
      checkSourceReferences(errors, "mecanismo", MECHANISMS, sourceIds);
      checkSourceReferences(errors, "caso", CASES, sourceIds);
      checkSourceReferences(errors, "cobertura", COVERAGE, sourceIds);
      checkSourceReferences(
        errors,
        "guía por germen",
        Object.entries(GERM_GUIDANCE).map(([id, value]) => ({ id, ...value })),
        sourceIds,
      );
      checkSourceReferences(
        errors,
        "regla",
        SCENARIO_RULES.map((item) => ({ id: item.id, sourceIds: item.result.sourceIds })),
        sourceIds,
      );
      checkSourceReferences(errors, "regla contextual", CONTEXT_RULES, sourceIds);

      const antibioticIds = new Set(ANTIBIOTICS.map(({ id }) => id));
      const targetIds = COVERAGE_TARGETS.map(({ id }) => id);
      const validLevels = new Set(COVERAGE_LEVELS);
      for (const row of COVERAGE) {
        if (!row.group) {
          errors.push(`Cobertura ${row.id}: falta el grupo terapéutico.`);
        }
        if (!antibioticIds.has(row.catalogId)) {
          errors.push(`Cobertura ${row.id}: catalogId inexistente (${row.catalogId}).`);
        }
        const rowTargets = Object.keys(row.values);
        for (const targetId of targetIds) {
          if (!(targetId in row.values)) {
            errors.push(`Cobertura ${row.id}: falta la columna ${targetId}.`);
          } else if (!validLevels.has(row.values[targetId])) {
            errors.push(`Cobertura ${row.id}/${targetId}: nivel inválido (${row.values[targetId]}).`);
          } else if (row.values[targetId] === "unknown" && !row.notes[targetId]?.trim()) {
            errors.push(`Cobertura ${row.id}/${targetId}: la incertidumbre requiere una nota explicativa.`);
          }
        }
        for (const targetId of rowTargets) {
          if (!targetIds.includes(targetId)) {
            errors.push(`Cobertura ${row.id}: columna desconocida ${targetId}.`);
          }
        }
      }

      for (const germId of germIds) {
        if (!GERM_GUIDANCE[germId]) {
          errors.push(`No existe orientación base para el germen ${germId}.`);
        }
      }
      for (const germId of Object.keys(GERM_GUIDANCE)) {
        if (!germIds.has(germId)) {
          errors.push(`La orientación base referencia un germen desconocido: ${germId}.`);
        }
      }

      for (const item of [...SCENARIO_RULES, ...CONTEXT_RULES]) {
        validateWhen(errors, item.id, item.when, { focus: focusIds, germ: germIds, severity: severityIds });
      }

      for (const rule of SCENARIO_RULES) {
        if (!Number.isInteger(rule.priority)) {
          errors.push(`Regla ${rule.id}: prioridad no entera.`);
        }
        if (!rule.when.focus) {
          errors.push(`Regla ${rule.id}: debe declarar los focos a los que se aplica.`);
        }
      }

      for (const focus of FOCUS_OPTIONS) {
        for (const germ of GERM_OPTIONS) {
          for (const severity of SEVERITY_OPTIONS) {
            const input = { focus: focus.id, germ: germ.id, severity: severity.id };
            const topRules = getTopMatchingRules(input);
            if (topRules.length > 1) {
              errors.push(
                `Empate de reglas para ${focus.id}/${germ.id}/${severity.id}: ${topRules.map(({ id }) => id).join(", ")}.`,
              );
            }
            if (!resolveScenario(input)) {
              errors.push(`Escenario sin salida: ${focus.id}/${germ.id}/${severity.id}.`);
            }
          }
        }
      }

      const reachableRuleIds = new Set(AUDITED_SCENARIOS.map((input) => resolveScenario(input)?.ruleId));
      for (const rule of SCENARIO_RULES) {
        if (!reachableRuleIds.has(rule.id)) {
          errors.push(`Regla ${rule.id}: no es alcanzable desde ninguna ruta auditada.`);
        }
      }
      for (const input of AUDITED_SCENARIOS) {
        if (!isAuditedScenario(input) || !resolveScenario(input)?.ruleId) {
          errors.push(`Ruta auditada inválida: ${input.germ}/${input.focus}/${input.severity}.`);
        }
        if (!resolveScenario(input)?.followUpItems.length) {
          errors.push(`Ruta sin seguimiento: ${input.germ}/${input.focus}/${input.severity}.`);
        }
        if (input.focus === "cistitis" && input.severity !== "estable") {
          errors.push(`La cistitis baja no debe ofrecerse como infección invasiva o crítica: ${input.germ}.`);
        }
      }

      for (const source of Object.values(SOURCES)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(source.registeredAt)) {
          errors.push(`Fuente ${source.id}: registeredAt no usa YYYY-MM-DD.`);
        }
        const bundledImage = /^assets\/[a-z0-9][a-z0-9-]*\.png$/.test(source.url ?? "");
        if (source.url && !source.url.startsWith("https://") && !bundledImage) {
          errors.push(`Fuente ${source.id}: debe usar HTTPS o una imagen PNG incluida en assets/.`);
        }
      }

      return errors;
    }

    function assertDataIsValid() {
      const errors = validateData();
      if (errors.length) {
        throw new Error(`Datos PROADEX inválidos:\n- ${errors.join("\n- ")}`);
      }
    }

    function checkUniqueIds(errors, label, items) {
      const seen = new Set();
      for (const item of items) {
        if (!item.id) {
          errors.push(`${label}: elemento sin id.`);
        } else if (seen.has(item.id)) {
          errors.push(`${label}: id duplicado (${item.id}).`);
        }
        seen.add(item.id);
      }
    }

    function checkSourceReferences(errors, label, items, knownSources) {
      for (const item of items) {
        if (!item.sourceIds?.length) {
          errors.push(`${label} ${item.id}: sin fuentes.`);
          continue;
        }
        for (const sourceId of item.sourceIds) {
          if (!knownSources.has(sourceId)) {
            errors.push(`${label} ${item.id}: fuente inexistente (${sourceId}).`);
          }
        }
      }
    }

    function validateWhen(errors, ruleId, when, validValues) {
      for (const [dimension, expected] of Object.entries(when)) {
        if (!validValues[dimension]) {
          errors.push(`Regla ${ruleId}: dimensión desconocida (${dimension}).`);
          continue;
        }
        const values = Array.isArray(expected) ? expected : [expected];
        for (const value of values) {
          if (!validValues[dimension].has(value)) {
            errors.push(`Regla ${ruleId}: valor desconocido ${dimension}=${value}.`);
          }
        }
      }
    }

    return Object.freeze({ validateData, assertDataIsValid });
  })();

  // src/navigation.js
  __modules["navigation"] = (() => {
    const { ANTIBIOTICS, MECHANISMS, ORGANISMS } = __modules["catalog"];
    const { isAuditedScenario } = __modules["rules"];
    // Una ruta ausente permite la vista inicial; una ruta solicitada e inválida no.
    function readSharedScenario(params) {
      const dimensions = ["germ", "focus", "severity"];
      if (!dimensions.some((key) => params.has(key))) return { status: "absent", input: null };
      const input = Object.fromEntries(dimensions.map((key) => [key, params.get(key)]));
      const complete = dimensions.every((key) => params.getAll(key).length === 1);
      // La antigua ruta conjunta solo tenía una salida específica: Listeria en SNC.
      if (complete && input.germ === "enterolisteria" && input.focus === "snc") input.germ = "listeria";
      const query = new URLSearchParams([...params].filter(([key]) => dimensions.includes(key))).toString();
      return { status: complete && isAuditedScenario(input) ? "valid" : "unavailable", input, query };
    }

    function findDetailItem(type, id) {
      const collections = { organism: ORGANISMS, antibiotic: ANTIBIOTICS, mechanism: MECHANISMS };
      if (!Object.hasOwn(collections, type)) return null;
      return collections[type].find((item) => item.id === id) ?? null;
    }

    return Object.freeze({ readSharedScenario, findDetailItem });
  })();

  // src/app.js
  __modules["app"] = (() => {
    const {
      ANTIBIOTICS,
      CASES,
      COMBINATION_GAPS,
      DEEP_SECTIONS,
      MECHANISMS,
      ORGANISMS,
      SECTIONS,
    } = __modules["catalog"];
    const {
      FOCUS_OPTIONS,
      GERM_OPTIONS,
      SEVERITY_OPTIONS,
      getAuditedFocusOptions,
      getAuditedGermOptions,
      getAuditedSeverityOptions,
      isAuditedScenario,
      resolveScenario,
    } = __modules["rules"];
    const {
      buildMatrix,
      filterAntibiotics,
      filterMechanisms,
      filterOrganisms,
      optionLabel,
      toneClass,
    } = __modules["selectors"];
    const { SOURCES, getSources } = __modules["sources"];
    const { assertDataIsValid } = __modules["validate"];
    const { findDetailItem, readSharedScenario } = __modules["navigation"];
    const { CLASSIFICATION, CLASSIFICATION_NOTES, filterClassification } = __modules["classification"];
    const MATRIX = buildMatrix();
    const DEFAULT_SCENARIO = Object.freeze({ germ: "blee", focus: "bacteriemia", severity: "invasiva" });
    const DEFAULT_SCANNER = "ceftriaxone";

    const state = {
      activeSection: "atlas",
      theme: readStoredTheme(),
      query: "",
      organismFilter: "all",
      classificationGroup: "all",
      scannerDrug: DEFAULT_SCANNER,
      ...DEFAULT_SCENARIO,
      unavailableScenario: null,
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
      renderClassificationControls();
      renderSourceList(document.querySelector("#source-list"), Object.keys(SOURCES), true);
      bindEvents();
      renderThemeButton();
      renderCatalogs();
      renderScenario();
      applyActiveSection();
      openDetailFromState();
    }

    function bindEvents() {
      document.querySelector(".skip-link").addEventListener("click", (event) => {
        event.preventDefault();
        const main = document.querySelector("#main-content");
        main.focus({ preventScroll: true });
        main.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      });

      document.querySelector("#scenario-reset").addEventListener("click", () => {
        state.unavailableScenario = null;
        Object.assign(state, DEFAULT_SCENARIO);
        renderSelectorOptions();
        renderScenario();
        syncUrl();
        document.querySelector("#germ-select").focus();
      });

      for (const id of ["global-search", "classification-search"]) {
        document.querySelector(`#${id}`).addEventListener("input", (event) => {
          state.query = event.target.value;
          for (const searchId of ["global-search", "classification-search"]) {
            document.querySelector(`#${searchId}`).value = state.query;
          }
          renderCatalogs();
        });
      }

      document.querySelector("#classification-group").addEventListener("change", (event) => {
        state.classificationGroup = event.target.value;
        renderClassification();
      });

      document.querySelector("#organism-filters").addEventListener("click", (event) => {
        const button = event.target.closest("button[data-filter]");
        if (!button) return;
        state.organismFilter = button.dataset.filter;
        document
          .querySelectorAll("#organism-filters button")
          .forEach((candidate) => {
            candidate.classList.toggle("active", candidate === button);
            candidate.setAttribute("aria-pressed", String(candidate === button));
          });
        renderCatalogs();
      });

      document.addEventListener("keydown", (event) => {
        const editing = event.target.closest("input, textarea, select, [contenteditable]");
        if (event.key !== "/" || editing || event.ctrlKey || event.metaKey || event.altKey || document.querySelector("#detail-dialog").open) return;
        event.preventDefault();
        document.querySelector("#global-search").focus();
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
        if (window.location.hash === "#main-content") return;
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
      if (!navigation.childElementCount) navigation.append(
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
      for (const button of navigation.querySelectorAll(".nav-btn")) {
        const active = button.getAttribute("aria-controls") === state.activeSection;
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      }
      centerActiveNavigationItem(navigation);
    }

    function centerActiveNavigationItem(navigation) {
      if (navigation.scrollWidth <= navigation.clientWidth) return;
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
      const dimensions = [["germ", GERM_OPTIONS], ["focus", FOCUS_OPTIONS], ["severity", SEVERITY_OPTIONS]];
      for (const [dimension, options] of dimensions) {
        const select = document.querySelector(`#${dimension}-select`);
        select.disabled = Boolean(state.unavailableScenario);
        if (state.unavailableScenario) {
          const requested = state.unavailableScenario[dimension];
          fillSelect(select, [{ id: requested ?? "", label: optionLabel(options, requested) || "No indicado" }], requested ?? "");
        }
      }
      if (state.unavailableScenario) return;
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
              title: `${target.label}: ${coverageTitle(cell.level)}. ${cell.note}`,
              "aria-label": `${target.label}: ${coverageTitle(cell.level)}. ${cell.note}`,
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
      const notes = row.cells.map(({ note }) => note).filter(Boolean);
      if (notes.length) summary.append(document.createTextNode(` ${notes.join(" ")}`));
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
      renderClassification();

      const status = document.querySelector("#search-status");
      status.replaceChildren();
      if (state.query.trim()) {
        status.append(document.createTextNode(`${organisms.length} patógenos · ${antibiotics.length} fármacos · ${mechanisms.length} mecanismos`));
        const branches = filterClassification(state.query).reduce((total, group) => total + group.rows.length, 0);
        if (branches) {
          const button = element("button", {
            className: "search-classification-link", text: `Ver clasificación (${branches} ${branches === 1 ? "rama" : "ramas"})`, attrs: { type: "button" },
          });
          button.addEventListener("click", () => {
            state.classificationGroup = "all";
            document.querySelector("#classification-group").value = "all";
            renderClassification();
            activateSection("classification");
            document.querySelector("#classification-search").focus({ preventScroll: true });
          });
          status.append(button);
        }
      }
    }

    function renderClassificationControls() {
      fillSelect(document.querySelector("#classification-group"), [
        { id: "all", label: "Todos los grupos" },
        ...CLASSIFICATION.map((group) => ({ id: group.id, label: group.title })),
      ], state.classificationGroup);
      document.querySelector("#classification-notes").replaceChildren(
        ...CLASSIFICATION_NOTES.map((note) => {
          const details = element("details", { className: "source-details" });
          const body = element("div");
          const sources = element("ul", { className: "source-list" });
          renderSourceList(sources, note.sourceIds);
          body.append(element("p", { text: note.text }), sources);
          details.append(element("summary", { text: note.title }), body);
          return details;
        }),
      );
    }

    function renderClassification() {
      const groups = filterClassification(state.query, state.classificationGroup);
      const branches = groups.reduce((total, group) => total + group.rows.length, 0);
      setText("classification-status", `${branches} ${branches === 1 ? "rama" : "ramas"} en ${groups.length} ${groups.length === 1 ? "grupo" : "grupos"}. La búsqueda muestra cada rama completa para conservar el contexto.`);
      toggleEmpty("classification-empty", branches);
      document.querySelector("#classification-groups").replaceChildren(...groups.map((group) => {
        const article = element("article", { className: "classification-group", attrs: { "aria-labelledby": `classification-${group.id}` } });
        article.append(element("h3", { id: `classification-${group.id}`, text: group.title }));
        for (const row of group.rows) {
          const branch = element("div", { className: "classification-row", attrs: { "data-classification-row": row.id } });
          const criteria = element("div", { className: "classification-criteria" });
          criteria.append(element("p", { text: row.setting }), element("h4", { text: row.test }));
          const content = element("div", { className: "classification-content" });
          const taxa = element("ul", { className: "classification-taxa", attrs: { "aria-label": "Microorganismos" } });
          taxa.append(...row.taxa.map((name) => element("li", { text: name })));
          content.append(taxa);
          if (row.note) content.append(element("p", { className: "classification-note", text: row.note }));
          if (row.organismIds.length) {
            const links = element("div", { className: "classification-links" });
            links.append(element("span", { text: "Fichas relacionadas:" }));
            for (const id of row.organismIds) {
              const organism = findDetailItem("organism", id);
              if (!organism) continue;
              const button = element("button", { className: "lane-chip", text: organism.short, attrs: { type: "button", "aria-label": `Abrir ficha relacionada: ${organism.name}` } });
              button.addEventListener("click", () => openDetail(organism, "organism"));
              links.append(button);
            }
            content.append(links);
          }
          branch.append(criteria, content);
          article.append(branch);
        }
        const sourceDetails = element("details", { className: "source-details" });
        const sourceList = element("ul", { className: "source-list" });
        renderSourceList(sourceList, [...new Set(["classification-image", ...group.rows.flatMap((row) => row.sourceIds)])], true);
        sourceDetails.append(element("summary", { text: "Fuentes de estas ramas" }), sourceList);
        article.append(sourceDetails);
        return article;
      }));
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
        renderCardLink(),
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
        renderCardLink(),
      );
      card.addEventListener("click", () => openDetail(mechanism, "mechanism"));
      return card;
    }

    function renderCardLink() {
      const link = element("span", { className: "card-link", attrs: { "aria-hidden": "true" } });
      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      arrow.setAttribute("viewBox", "0 0 24 24");
      arrow.setAttribute("fill", "none");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M6 18 18 6M6 6h12v12");
      arrow.append(path);
      link.append(document.createTextNode("Consultar ficha"), arrow);
      return link;
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
        if (item.precautions?.length) blocks.push(infoListBlock("Precauciones de la familia", item.precautions));
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
              attrs: { title: `${coverageTitle(cell.level)}. ${cell.note}`, "aria-label": `${coverageTitle(cell.level)}. ${cell.note}` },
            }),
          );
          tableRow.append(tableCell);
        }
        bodyRows.push(tableRow);
      }
      document.querySelector("#matrix-body").replaceChildren(...bodyRows);
      document.querySelector("#matrix-caveats").replaceChildren(
        ...MATRIX.rows.filter((row) => row.cells.some(({ note }) => note)).map((row) =>
          element("p", { text: `${row.label}: ${row.cells.map(({ note }) => note).filter(Boolean).join(" ")}` }),
        ),
      );
    }

    function coverageTitle(level) {
      if (level === "unknown") return "Cobertura clínica no establecida";
      return level === "yes" ? "Cubre" : level === "maybe" ? "Variable o no de elección" : "No cubre";
    }

    function renderScenario() {
      const unavailable = state.unavailableScenario;
      document.querySelector("#scenario-guidance").hidden = Boolean(unavailable);
      document.querySelector("#scenario-reset").hidden = !unavailable;
      setText("route-status-title", unavailable ? "Ruta no disponible" : "Escenario seleccionado");
      if (unavailable) {
        const requested = [
          optionLabel(GERM_OPTIONS, unavailable.germ) || "Germen no indicado",
          optionLabel(FOCUS_OPTIONS, unavailable.focus) || "Foco no indicado",
          optionLabel(SEVERITY_OPTIONS, unavailable.severity) || "Gravedad no indicada",
        ].join(" · ");
        setText("scenario-headline", "Ruta no disponible");
        setText("severity-pill", optionLabel(SEVERITY_OPTIONS, unavailable.severity) || "Sin gravedad");
        setText("scenario-scope", "Sin recomendación");
        setText("route-summary", `Solicitud: ${requested}.`);
        setText("scenario-alert", "El enlace contiene una combinación no disponible, incompleta o ambigua. No se ha sustituido por otra ruta. Elige otra ruta para continuar.");
        for (const id of ["scenario-do", "scenario-avoid", "scenario-micro", "scenario-follow-up", "scenario-sources"]) {
          document.querySelector(`#${id}`).replaceChildren();
        }
        return;
      }
      const input = { focus: state.focus, germ: state.germ, severity: state.severity };
      if (!isAuditedScenario(input)) throw new Error("El selector intentó mostrar una ruta no auditada.");
      const scenario = resolveScenario(input);
      if (!scenario?.ruleId || scenario.scope !== "specific") {
        throw new Error("No se pudo resolver la regla específica seleccionada.");
      }

      setText("scenario-headline", scenario.headline);
      setText("severity-pill", optionLabel(SEVERITY_OPTIONS, state.severity));
      setText("scenario-alert", scenario.alert);
      setText("scenario-scope", "Orientación por foco");
      setText("route-summary", `${optionLabel(GERM_OPTIONS, state.germ)} · ${optionLabel(FOCUS_OPTIONS, state.focus)}.`);
      renderTextList("scenario-do", scenario.doItems);
      renderTextList("scenario-avoid", scenario.avoidItems);
      renderTextList("scenario-micro", scenario.microItems);
      renderTextList("scenario-follow-up", scenario.followUpItems);
      renderSourceList(document.querySelector("#scenario-sources"), scenario.sourceIds);
    }

    function renderCases() {
      document.querySelector("#case-grid").replaceChildren(
        ...CASES.map((clinicalCase, index) => {
          const card = element("article", { className: "case-card" });
          const result = element("div", { className: "case-result" });
          result.append(element("strong", { text: "Lectura:" }), document.createTextNode(` ${clinicalCase.answer}`));
          const sources = element("details", { className: "source-details" });
          const sourceList = element("ul", { className: "source-list" });
          renderSourceList(sourceList, clinicalCase.sourceIds);
          sources.append(element("summary", { text: "Fuentes de este caso" }), sourceList);
          card.append(
            element("span", { className: "case-index", text: String(index + 1).padStart(2, "0") }),
            element("h3", { text: clinicalCase.title }),
            element("p", { text: clinicalCase.setup }),
            result,
            sources,
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
      document.querySelector("#theme-button").setAttribute(
        "aria-label",
        state.theme === "light" ? "Activar tema oscuro" : "Activar tema claro",
      );
      document.querySelector('meta[name="theme-color"]').content = state.theme === "light" ? "#ffffff" : "#111113";
    }

    function hydrateStateFromHash() {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const view = params.get("view");
      if (SECTIONS.some(({ id }) => id === view)) state.activeSection = view;

      // El antiguo enlace a la fila conjunta abre ahora la fila explícita de meropenem.
      const scannerDrug = params.get("scanner") === "mero-imi" ? "meropenem" : params.get("scanner");
      if (MATRIX.rows.some(({ id }) => id === scannerDrug)) state.scannerDrug = scannerDrug;

      const scenario = readSharedScenario(params);
      if (scenario.status === "valid") Object.assign(state, scenario.input);
      state.unavailableScenario = scenario.status === "unavailable" ? { ...scenario.input, query: scenario.query } : null;

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
      state.unavailableScenario = null;
      state.detail = null;
    }

    function syncUrl() {
      const params = new URLSearchParams();
      if (state.activeSection !== "atlas") params.set("view", state.activeSection);
      if (state.scannerDrug !== DEFAULT_SCANNER) params.set("scanner", state.scannerDrug);
      if (state.unavailableScenario) {
        for (const [key, value] of new URLSearchParams(state.unavailableScenario.query)) params.append(key, value);
      } else if (state.activeSection === "wizard") {
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

    return Object.freeze({});
  })();
})();
