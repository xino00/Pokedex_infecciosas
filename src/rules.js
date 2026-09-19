import { MBL_GUIDANCE, STENO_GUIDANCE } from "./clinical-guidance.js";

export const FOCUS_OPTIONS = Object.freeze([
  { id: "cistitis", label: "Cistitis baja" },
  { id: "itu-complicada", label: "Pielonefritis / ITU complicada" },
  { id: "resp", label: "Neumonía / respiratorio" },
  { id: "abdomen", label: "Intraabdominal / biliar" },
  { id: "snc", label: "SNC / meningitis" },
  { id: "bacteriemia", label: "Bacteriemia / sepsis" },
  { id: "endocarditis", label: "Endocarditis" },
  { id: "piel", label: "Piel y partes blandas" },
]);

export const GERM_OPTIONS = Object.freeze([
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

export const SEVERITY_OPTIONS = Object.freeze([
  { id: "estable", label: "Estable" },
  { id: "invasiva", label: "Invasiva / bacteriemia" },
  { id: "critico", label: "Shock / paciente crítico" },
]);

export const SEVERITY_GUIDANCE = Object.freeze({
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

export const GERM_GUIDANCE = Object.freeze({
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

export const SCENARIO_RULES = Object.freeze([
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

export const CONTEXT_RULES = Object.freeze([
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

export function resolveScenario(input) {
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

export function getTopMatchingRules(input) {
  const matches = SCENARIO_RULES.filter((candidate) => matchesWhen(candidate.when, input));
  if (!matches.length) return [];
  const highestPriority = Math.max(...matches.map((candidate) => candidate.priority));
  return matches.filter((candidate) => candidate.priority === highestPriority);
}

export function matchesWhen(when, input) {
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

export const AUDITED_SCENARIOS = Object.freeze(
  GERM_OPTIONS.flatMap((germ) =>
    FOCUS_OPTIONS.flatMap((focus) =>
      SEVERITY_OPTIONS.map((severity) =>
        Object.freeze({ germ: germ.id, focus: focus.id, severity: severity.id }),
      ),
    ),
  ).filter((input) => resolveScenario(input)?.ruleId),
);

export function isAuditedScenario(input) {
  return AUDITED_SCENARIOS.some(
    (candidate) =>
      candidate.germ === input.germ &&
      candidate.focus === input.focus &&
      candidate.severity === input.severity,
  );
}

export function getAuditedGermOptions() {
  const allowed = new Set(AUDITED_SCENARIOS.map(({ germ }) => germ));
  return GERM_OPTIONS.filter(({ id }) => allowed.has(id));
}

export function getAuditedFocusOptions(germ) {
  const allowed = new Set(
    AUDITED_SCENARIOS.filter((scenario) => scenario.germ === germ).map(({ focus }) => focus),
  );
  return FOCUS_OPTIONS.filter(({ id }) => allowed.has(id));
}

export function getAuditedSeverityOptions(germ, focus) {
  const allowed = new Set(
    AUDITED_SCENARIOS.filter(
      (scenario) => scenario.germ === germ && scenario.focus === focus,
    ).map(({ severity }) => severity),
  );
  return SEVERITY_OPTIONS.filter(({ id }) => allowed.has(id));
}
