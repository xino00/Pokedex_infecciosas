// Texto compartido para que ficha, mecanismo y motor mantengan la misma revisión.
export const QUINOLONE_PRECAUTIONS = Object.freeze([
  "Utilizar únicamente para indicaciones autorizadas y tras valorar beneficio-riesgo. En infecciones leves/moderadas, reservar si no pueden usarse las alternativas habituales. No usar en infecciones autolimitadas o no bacterianas.",
  "Evitar si hubo una reacción grave previa a quinolonas. Ante síntomas tendinosos o neurológicos, suspender y reevaluar: algunos daños pueden ser prolongados o irreversibles.",
  "Valorar el riesgo de tendinitis y rotura de tendones, especialmente con corticoides, edad avanzada, insuficiencia renal o trasplante. Comprobar QT, interacciones y separación de antiácidos/hierro/zinc según ficha.",
]);

export const STENO_GUIDANCE = Object.freeze({
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

export const MBL_GUIDANCE = Object.freeze({
  headline: "Enterobacterales MBL: mecanismo y AST antes de elegir",
  doItems: Object.freeze([
    "NDM: IDSA 2026 prefiere aztreonam-avibactam o cefiderocol; si el primero no está disponible, CAZ-AVI + aztreonam.",
    "Otras MBL (VIM/IMP): CAZ-AVI + aztreonam o cefiderocol según AST, foco y PROA (IDSA 2024).",
  ]),
  avoidItems: Object.freeze(["CAZ-AVI en monoterapia.", "Vaborbactam/relebactam como si inhibieran MBL."]),
  microItems: Object.freeze(["Confirmar mecanismo, sensibilidad y disponibilidad; pedir estudio de CAZ-AVI + aztreonam si se plantea la combinación."]),
  sourceIds: Object.freeze(["idsa-amr-2024", "idsa-amr-2026"]),
});
