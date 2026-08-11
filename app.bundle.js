/* Este archivo se genera con `npm run build`. No editar directamente. */
(() => {
  "use strict";
  const __modules = Object.create(null);

  // src/catalog.js
  __modules["catalog"] = (() => {
    const LOCAL_SOURCE = ["local-proa-fjd"];
    const AMR_SOURCES = ["local-proa-fjd", "idsa-amr-2024"];

    const SECTIONS = Object.freeze([
      { id: "atlas", label: "Atlas bacteriano", icon: "🧫" },
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
        cover:
          "Solo si infección real + AST + PROA. Si moderada-grave: dos agentes entre cefiderocol, minociclina, TMP-SMX o levofloxacino; alternativa CAZ-AVI + aztreonam.",
        gap: "Carbapenémicos inútiles por L1; muchas cefalosporinas fallan por L2.",
        trap: "Primero distinguir infección de colonización. No usar ceftazidima como tratamiento.",
        search: "stenotrophomonas maltophilia infeccion real ast proa tmp smx minociclina levofloxacino cefiderocol ceftazidima",
        sourceIds: AMR_SOURCES,
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
      { id: "mero-imi", dex: "K002", group: "red", name: "Meropenem / imipenem", family: "Carbapenémico antipseudomónico", icon: "💊", type: "UCI/MDR", covers: ["BLEE", "AmpC", "Anaerobios", "Pseudomonas si sensible"], misses: ["SARM", "Stenotrophomonas", "Atípicos", "Enterococcus resistente"], trap: "No gastar carbapenémico si el problema es colonización o cistitis baja con opción oral activa.", search: "meropenem imipenem carbapenemico blee ampc pseudomonas anaerobios" },
      { id: "aztreonam", dex: "M001", group: "amber", name: "Aztreonam", family: "Monobactámico", icon: "💊", type: "Solo GN aerobios", covers: ["Enterobacterales si sensible", "Pseudomonas si sensible"], misses: ["Gram positivos", "Anaerobios"], trap: "Comparte cadena lateral con ceftazidima: cuidado si alergia confirmada a ceftazidima.", search: "aztreonam monobactam alergia ceftazidima pseudomonas anaerobios" },
      { id: "anti-mrsa-ceph", dex: "C006", group: "blue", name: "Ceftarolina (ceftobiprol no intercambiable)", family: "Cefalosporina anti-SARM", icon: "💊", type: "Anti-SARM beta-lactámico", covers: ["SARM", "SASM", "Streptococcus", "neumococo resistente"], misses: ["Pseudomonas en ceftarolina", "BLEE/CRE/AmpC", "Enterococcus fiable"], trap: "Anti-SARM dirigido, no comodín MDR. No extrapolar ceftarolina y ceftobiprol como equivalentes.", search: "ceftarolina ceftobiprol no intercambiable sarm mrsa neumococo blee cre ampc" },
      { id: "caz-avi", dex: "N001", group: "red", name: "Ceftazidima-avibactam", family: "Nuevo BL/BLI", icon: "🧬", type: "KPC/OXA-48-like", covers: ["KPC", "OXA-48-like", "algunas Pseudomonas DTR si sensible"], misses: ["MBL en monoterapia", "Gram+ y anaerobios relevantes"], trap: "MBL: combinar con aztreonam o elegir otra estrategia según disponibilidad/AST.", search: "ceftazidima avibactam caz avi kpc oxa48 mbl aztreonam", sourceIds: AMR_SOURCES },
      { id: "ceftolo-tazo", dex: "N002", group: "green", name: "Ceftolozano-tazobactam", family: "Nuevo BL/BLI", icon: "🧬", type: "Pseudomonas DTR", covers: ["Pseudomonas MDR/DTR si sensible", "algunas BLEE pero no como referencia"], misses: ["KPC", "OXA-48", "MBL", "Anaerobios sin metronidazol"], trap: "Especialista en Pseudomonas; no lo uses como carbapenemasa-killer.", search: "ceftolozano tazobactam pseudomonas dtr blee kpc", sourceIds: AMR_SOURCES },
      { id: "mvb-imi-rel", dex: "N003", group: "red", name: "Meropenem-vaborbactam / imipenem-relebactam", family: "Nuevo BL/BLI", icon: "🧬", type: "KPC", covers: ["KPC", "algunas Pseudomonas DTR si sensible en IMI-REL"], misses: ["MBL", "OXA-48-like en MVB/IMI-REL"], trap: "Si es OXA-48 o MBL, cambiar de mapa.", search: "meropenem vaborbactam imipenem relebactam kpc oxa48 mbl", sourceIds: AMR_SOURCES },
      { id: "cefiderocol", dex: "N004", group: "red", name: "Cefiderocol", family: "Cefalosporina sideróforo", icon: "🧬", type: "MDR/XDR", covers: ["MBL como opción", "algunos no fermentadores MDR", "CRE según AST"], misses: ["Gram+", "Anaerobios"], trap: "Último recurso: siempre con AST, foco claro y PROA/Infecciosas.", search: "cefiderocol sideroforo mbl crab pseudomonas dtr", sourceIds: AMR_SOURCES },
      { id: "vanco", dex: "O001", group: "amber", name: "Vancomicina", family: "Glucopéptido", icon: "🛡️", type: "Gram+ resistentes", covers: ["SARM", "E. faecium sensible", "Gram+ resistentes"], misses: ["Gram negativos", "CDI luminal por vía IV"], trap: "IV no trata luz colónica; para CDI, vía oral/fidaxomicina según caso.", search: "vancomicina sarm c difficile oral iv niveles" },
      { id: "dapto", dex: "O002", group: "blue", name: "Daptomicina", family: "Lipopeptido", icon: "🛡️", type: "SARM/ERV no pulmonar", covers: ["Bacteriemia por Gram+", "endocarditis derecha", "osteoarticular", "IPPB"], misses: ["Neumonía"], trap: "Surfactante pulmonar la inactiva. CK y estatinas.", search: "daptomicina neumonia surfactante ck sarm erv" },
      { id: "tmp-smx", dex: "O003", group: "amber", name: "Cotrimoxazol", family: "TMP-SMX", icon: "🧪", type: "Oral útil / Steno", covers: ["Stenotrophomonas si sensible", "algunas ITU", "Pneumocystis"], misses: ["Pseudomonas", "anaerobios"], trap: "Vigilar potasio, función renal y hemograma.", search: "cotrimoxazol tmp smx stenotrophomonas potasio hemograma" },
      { id: "metro", dex: "O004", group: "blue", name: "Metronidazol", family: "Nitroimidazol", icon: "🧪", type: "Anaerobios", covers: ["Anaerobios", "protozoos seleccionados"], misses: ["Aerobios", "Gram+ y GN no anaerobios"], trap: "Ceftriaxona + metronidazol es una lógica; metronidazol solo rara vez lo es en foco polimicrobiano.", search: "metronidazol anaerobios abdomen ceftriaxona" },
    ];

    const ANTIBIOTICS = Object.freeze(
      antibioticData.map((item) => Object.freeze({ ...item, sourceIds: item.sourceIds ?? LOCAL_SOURCE })),
    );

    const mechanismData = [
      { id: "blee", name: "BLEE", icon: "🧬", group: "green", question: "¿Cistitis, pielonefritis/cUTI o infección invasiva?", use: "Cistitis baja: opción urinaria activa. Pielonefritis/cUTI: TMP-SMX/quinolona si sensible o carbapenémico. Extraurinaria grave: carbapenémico.", avoid: "Pip-tazo o cefepime como dirigidos en BLEE extraurinaria grave; nitrofurantoína/fosfomicina si pielonefritis.", micro: "AST completo, foco y posibilidad real de paso oral.", search: "blee esbl carbapenemico cistitis pielonefritis cuti cefepime piperacilina" },
      { id: "ampc", name: "AmpC inducible", icon: "🧬", group: "amber", question: "¿E. cloacae complex, K. aerogenes o C. freundii?", use: "Cefepime si sensible y CMI favorable. Carbapenémico si grave, foco profundo, CMI problemática o sospecha de BLEE coproducida.", avoid: "Ceftriaxona/cefotaxima/ceftazidima en infección invasiva por especies de riesgo.", micro: "Identificar especie y CMI de cefepime; valorar BLEE coproducida.", search: "ampc enterobacter cloacae complex klebsiella aerogenes citrobacter freundii cefepime ceftriaxona" },
      { id: "kpc", name: "CRE-KPC", icon: "🧬", group: "red", question: "¿Carbapenemasa KPC confirmada?", use: "Meropenem-vaborbactam, ceftazidima-avibactam o imipenem-relebactam si sensible.", avoid: "Combinaciones antiguas con aminoglucósido/polimixina si ya hay beta-lactámico activo.", micro: "Tipado de carbapenemasa + AST de nuevos BL/BLI.", search: "kpc cre meropenem vaborbactam ceftazidima avibactam imipenem relebactam" },
      { id: "oxa48", name: "CRE OXA-48-like", icon: "🧬", group: "red", question: "¿OXA-48-like?", use: "Ceftazidima-avibactam como referencia si sensible. Cefiderocol como alternativa según caso.", avoid: "Meropenem-vaborbactam o imipenem-relebactam como si fueran KPC.", micro: "Tipado de carbapenemasa; confirmar actividad de CAZ-AVI.", search: "oxa48 oxa 48 ceftazidima avibactam cefiderocol" },
      { id: "mbl", name: "MBL", icon: "🧬", group: "red", question: "¿NDM/VIM/IMP?", use: "Ceftazidima-avibactam + aztreonam o cefiderocol. Aztreonam-avibactam/cefepime-zidebactam según disponibilidad.", avoid: "CAZ-AVI en monoterapia. Vaborbactam/relebactam no inhiben MBL.", micro: "Probar combinación CAZ-AVI + aztreonam si el laboratorio puede.", search: "mbl ndm vim imp aztreonam avibactam cefiderocol" },
      { id: "dtr-pa", germId: "dtr", name: "Pseudomonas DTR", icon: "🧬", group: "green", question: "¿Conserva algún beta-lactámico clásico?", use: "Si conserva BL clásico no carbapenémico, usarlo a dosis altas/perfusión extendida. Si DTR: ceftolo-tazo, CAZ-AVI, IMI-REL o cefiderocol según AST.", avoid: "Combinación de rutina si ya hay beta-lactámico activo confirmado.", micro: "AST para nuevos BL/BLI y cefiderocol.", search: "pseudomonas dtr ceftolozano tazobactam cefiderocol" },
      { id: "crab", name: "CRAB", icon: "🧬", group: "red", question: "¿Infección real o colonización?", use: "Sulbactam-durlobactam + meropenem/imipenem si disponible. Si no, ampicilina-sulbactam alta dosis + otro agente.", avoid: "Meropenem/imipenem solos. Tratar colonización respiratoria sin síndrome.", micro: "Confirmar sensibilidad y discutir combinación con PROA.", search: "crab acinetobacter sulbactam durlobactam colistina cefiderocol" },
      { id: "steno", name: "Stenotrophomonas", icon: "🧬", group: "amber", question: "¿Colonización o infección real moderada-grave?", use: "Infección real + AST + PROA. Dos agentes entre cefiderocol, minociclina, TMP-SMX o levofloxacino; alternativa CAZ-AVI + aztreonam.", avoid: "Ceftazidima y carbapenémicos. Tratar hallazgo casual en vía aérea.", micro: "Solicitar sensibilidad a TMP-SMX, levofloxacino, minociclina y cefiderocol; discutir si hay que combinar.", search: "stenotrophomonas infeccion real ast proa tmp smx minociclina levofloxacino cefiderocol" },
    ];

    const MECHANISMS = Object.freeze(
      mechanismData.map((item) => Object.freeze({ ...item, sourceIds: ["idsa-amr-2024"] })),
    );

    const caseData = [
      { id: "listeria-meningitis", title: "Anciano con meningitis", setup: "Ceftriaxona cubre neumococo y meningococo, pero el paciente tiene riesgo de Listeria.", answer: "Añade ampicilina IV o amoxicilina IV según protocolo. Ceftriaxona sola deja hueco LAME: Listeria." },
      { id: "ampc-ceftriaxone", title: "Enterobacter cloacae bacteriémico “S” a ceftriaxona", setup: "El informe inicial puede parecer cómodo, pero es una especie de riesgo AmpC.", answer: "Evita ceftriaxona en infección invasiva. Cefepime si CMI favorable o carbapenémico si gravedad/CMI/BLEE.", sourceIds: AMR_SOURCES },
      { id: "ertapenem-pseudomonas", title: "Ertapenem para neumonía nosocomial con riesgo de Pseudomonas", setup: "Ertapenem cubre BLEE y anaerobios, pero tiene hueco APE.", answer: "Error: no cubre Pseudomonas. Usa antipseudomónico real si el riesgo es clínicamente relevante." },
      { id: "steno-colonization", title: "Stenotrophomonas en esputo de EPOC estable", setup: "No fermentador en vía aérea crónica sin fiebre, sin infiltrado nuevo, sin deterioro claro.", answer: "Probable colonización. No escalar por cultivo aislado; tratar solo si síndrome infeccioso real.", sourceIds: AMR_SOURCES },
      { id: "blee-branches", title: "BLEE no es una sola rama", setup: "El mismo antibiograma no significa lo mismo en cistitis baja, pielonefritis/cUTI o bacteriemia.", answer: "Cistitis baja: opción urinaria activa. Pielo/cUTI: TMP-SMX/quinolona si sensible o carbapenémico. Bacteriemia/foco extraurinario: carbapenémico; si crítico, meropenem/imipenem.", sourceIds: AMR_SOURCES },
      { id: "gonococcus-pharynx", title: "Gonococo faríngeo tratado con cefixima", setup: "Cefixima puede aparecer como alternativa oral, pero faringe es un sitio de erradicación difícil.", answer: "Ceftriaxona si es posible. Si hubo cefixima o sospecha de fallo: test de curación 7-14 días; cultivo/AST y experto si persiste.", sourceIds: ["cdc-gonorrhea-2021"] },
      { id: "daptomycin-pneumonia", title: "Daptomicina para neumonía por SARM", setup: "Daptomicina es potente anti-SARM, pero no en pulmón.", answer: "Error de foco: se inactiva por surfactante. Considera linezolid/vancomicina según contexto y protocolo." },
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
    const COVERAGE_LEVELS = Object.freeze(["yes", "maybe", "no"]);

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
        id: "mero-imi",
        label: "Meropenem/imipenem",
        group: "Monobactámicos y carbapenémicos",
        values: {
          strep: "yes", sasm: "maybe", sarm: "no", efaecalis: "no", listeria: "no",
          enterobacterales: "yes", blee: "yes", pseudomonas: "yes", anaerobes: "yes", atypicals: "no",
        },
      }),
    ]);

    function target(id, shortLabel, label) {
      return Object.freeze({ id, shortLabel, label });
    }

    function coverage({ id, label, group, values, catalogId = id }) {
      return Object.freeze({
        id,
        catalogId,
        label,
        group,
        sourceIds: Object.freeze(["local-proa-fjd"]),
        values: Object.freeze({ ...values }),
      });
    }

    function coverageSymbol(level) {
      return level === "yes" ? "✓" : level === "maybe" ? "±" : "✗";
    }

    return Object.freeze({ COVERAGE_LEVELS, COVERAGE_TARGETS, COVERAGE, coverageSymbol });
  })();

  // src/rules.js
  __modules["rules"] = (() => {
    const FOCUS_OPTIONS = Object.freeze([
      { id: "cistitis", label: "Cistitis baja" },
      { id: "itu-complicada", label: "Pielonefritis / ITU complicada" },
      { id: "resp", label: "Neumonía / respiratorio" },
      { id: "abdomen", label: "Intraabdominal / biliar" },
      { id: "snc", label: "SNC / meningitis" },
      { id: "bacteriemia", label: "Bacteriemia / sepsis" },
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
      { id: "enterolisteria", label: "Enterococcus / Listeria" },
      { id: "anaerobios", label: "Anaerobios relevantes" },
    ]);

    const SEVERITY_OPTIONS = Object.freeze([
      { id: "estable", label: "Estable" },
      { id: "invasiva", label: "Invasiva / bacteriemia" },
      { id: "critico", label: "Shock / neutropenia / UCI" },
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
      mbl: guidance({
        headline: "MBL: avibactam no inhibe MBL; necesitas aztreonam o cefiderocol",
        doItems: ["Ceftazidima-avibactam + aztreonam.", "Cefiderocol si sensible y foco encaja.", "Aztreonam-avibactam o cefepime-zidebactam si disponibles/protocolo."],
        avoidItems: ["CAZ-AVI en monoterapia.", "Vaborbactam/relebactam como si inhibieran MBL."],
        microItems: ["Pedir prueba/comentario de combinación CAZ-AVI + aztreonam si posible."],
        sourceIds: AMR_SOURCES,
      }),
      crab: guidance({
        headline: "CRAB: primero infección real, luego sulbactam",
        doItems: ["Confirmar clínica compatible y control de foco.", "Sulbactam-durlobactam + meropenem/imipenem si disponible.", "Si no disponible: ampicilina-sulbactam alta dosis + otro agente activo según sensibilidad."],
        avoidItems: ["Meropenem/imipenem solos.", "Tratar colonización respiratoria sin síndrome infeccioso.", "Cefiderocol en monoterapia de reflejo."],
        microItems: ["Consultar PROA/Infecciosas y confirmar sensibilidad."],
        sourceIds: AMR_SOURCES,
      }),
      steno: guidance({
        headline: "Stenotrophomonas: colonización frecuente",
        doItems: ["Tratar solo si infección real, bacteriemia o neumonía compatible.", "Confirmar AST y comentar con PROA antes de combinar automáticamente.", "Si moderada-grave: dos agentes entre cefiderocol, minociclina, TMP-SMX o levofloxacino; alternativa CAZ-AVI + aztreonam."],
        avoidItems: ["Carbapenémicos.", "Ceftazidima como tratamiento.", "Tratar cultivo respiratorio aislado en paciente estable."],
        microItems: ["Pedir sensibilidad a TMP-SMX, minociclina, levofloxacino y cefiderocol; discutir necesidad de combinación."],
        sourceIds: AMR_SOURCES,
      }),
      sarm: guidance({
        headline: "SARM: el foco decide vancomicina, daptomicina, linezolid o beta-lactámico anti-SARM",
        doItems: ["Vancomicina o daptomicina en bacteriemia/endocarditis según foco.", "Ceftarolina como beta-lactámico anti-SARM dirigido; no extrapolar a ceftobiprol sin protocolo.", "Control de foco: drenaje, retirada de catéter, eco si bacteriemia."],
        avoidItems: ["Beta-lactámicos habituales.", "Daptomicina en neumonía.", "Tratar absceso sin drenaje si es drenable."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: LOCAL_SOURCE,
      }),
      enterolisteria: guidance({
        headline: "Enterococcus/Listeria: cefalosporinas no bastan",
        doItems: ["E. faecalis sensible: ampicilina/amoxicilina o penicilina G dirigida si sensible.", "En E. faecalis endocarditis, ceftriaxona solo como sinergia con ampicilina según protocolo.", "Si E. faecium/VRE, estrategia dirigida y PROA."],
        avoidItems: ["Ceftriaxona/cefepime/ceftazidima como cobertura de Enterococcus o Listeria.", "Olvidar Listeria en meningitis de anciano, embarazo, neonato o inmunodeprimido."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
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
        doItems: ["Nitrofurantoína o TMP-SMX si sensible y encaja clínicamente.", "Quinolona si sensible y beneficio supera toxicidad.", "Fosfomicina solo si E. coli y cistitis baja encaja."],
        avoidItems: ["Carbapenémico si hay opción urinaria activa y paciente estable.", "Nitrofurantoína/fosfomicina si pielonefritis, prostatitis o bacteriemia."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      })),
      rule("blee-snc", 300, { germ: "blee", focus: "snc" }, guidance({
        headline: "BLEE + SNC: no ertapenem; revisar penetración meníngea",
        doItems: ["Meropenem si carbapenémico y el foco SNC exige cobertura BLEE.", "Añadir coberturas de meningitis según edad, inmunosupresión y protocolo.", "Avisar a Micro/PROA por foco crítico."],
        avoidItems: ["Ertapenem en SNC.", "Dar por cubierta Listeria con ceftriaxona o carbapenémico.", "Paso oral precoz sin estabilidad ni control microbiológico."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      })),
      rule("blee-critical", 250, { germ: "blee", severity: "critico" }, guidance({
        headline: "BLEE + shock/UCI: meropenem o imipenem, no ertapenem de entrada",
        doItems: ["Meropenem/imipenem si carbapenémico y paciente crítico.", "Optimizar exposición según protocolo, función renal y foco.", "Desescalar cuando AST, evolución y control de foco lo permitan."],
        avoidItems: ["Ertapenem en shock/UCI o hipoalbuminemia.", "Pip-tazo o cefepime como dirigido en BLEE grave aunque informe sensibilidad.", "Contar días de antibiótico inactivo como tratamiento efectivo."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      })),
      rule("blee-cuti", 200, { germ: "blee", focus: "itu-complicada" }, guidance({
        headline: "BLEE + pielonefritis/cUTI: no tratar como cistitis baja",
        doItems: ["TMP-SMX o quinolona si sensible, estable y con buena absorción.", "Carbapenémico si grave, sin opción oral activa o mala evolución.", "Ertapenem puede encajar si estable y sin riesgo Pseudomonas/SNC."],
        avoidItems: ["Nitrofurantoína o fosfomicina para pielonefritis, prostatitis o cUTI sistémica.", "Pip-tazo como opción preferida si hay alternativa más fiable.", "Mantener carbapenémico si hay paso oral activo y estabilidad real."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
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
        doItems: ["Ertapenem si estable, no crítico, sin SNC/neumonía nosocomial/riesgo Pseudomonas y albúmina razonable.", "Meropenem/imipenem si foco profundo, bacteriemia grave o dudas de exposición.", "Paso oral a TMP-SMX/quinolona solo si sensible, estable, buen control de foco y absorción fiable."],
        avoidItems: ["Pip-tazo o cefepime como dirigido en BLEE extraurinaria grave aunque informe sensibilidad.", "Ertapenem si shock/UCI, hipoalbuminemia, SNC o riesgo Pseudomonas.", "Contar días de antibiótico inactivo como tratamiento efectivo."],
        microItems: ["AST completo con opciones orales activas si puede haber desescalada.", "Revisar foco, control de foco, absorción y estabilidad antes de paso oral."],
        sourceIds: AMR_SOURCES,
      })),
      rule("sarm-respiratory", 200, { germ: "sarm", focus: "resp" }, guidance({
        headline: "SARM respiratorio: no daptomicina",
        doItems: ["Linezolid o vancomicina según gravedad, bacteriemia y protocolo.", "Ceftarolina si indicación dirigida; ceftobiprol solo si ficha/protocolo lo justifica."],
        avoidItems: ["Beta-lactámicos habituales.", "Daptomicina en neumonía.", "Tratar absceso sin drenaje si es drenable."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: LOCAL_SOURCE,
      })),
      rule("listeria-snc", 200, { germ: "enterolisteria", focus: "snc" }, guidance({
        headline: "SNC con riesgo Listeria: añade aminopenicilina",
        doItems: ["Ampicilina IV o amoxicilina IV según protocolo para cubrir Listeria.", "Mantener ceftriaxona/cefotaxima para neumococo/meningococo si procede, pero no como anti-Listeria.", "Si aparece Enterococcus, separar E. faecalis sensible de E. faecium/VRE."],
        avoidItems: ["Ceftriaxona/cefepime/ceftazidima como cobertura de Enterococcus o Listeria.", "Olvidar Listeria en meningitis de anciano, embarazo, neonato o inmunodeprimido."],
        microItems: ["Solicitar AST completo y revisar desescalada a 48-72 h."],
        sourceIds: LOCAL_SOURCE,
      })),
    ]);

    const CONTEXT_RULES = Object.freeze([
      Object.freeze({
        id: "snc-penetration",
        when: { focus: "snc" },
        exceptGerms: ["enterolisteria", "sarm"],
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

    function guidance({ headline, doItems, avoidItems, microItems, sourceIds }) {
      return Object.freeze({
        headline,
        doItems: Object.freeze(doItems),
        avoidItems: Object.freeze(avoidItems),
        microItems: Object.freeze(microItems),
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
                  return Object.freeze({ targetId: target.id, level, symbol: coverageSymbol(level) });
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

  // src/sources.js
  __modules["sources"] = (() => {
    const SOURCES = Object.freeze({
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
      }

      for (const source of Object.values(SOURCES)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(source.registeredAt)) {
          errors.push(`Fuente ${source.id}: registeredAt no usa YYYY-MM-DD.`);
        }
        if (source.url && !source.url.startsWith("https://")) {
          errors.push(`Fuente ${source.id}: la URL no usa HTTPS.`);
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

    return Object.freeze({});
  })();
})();
