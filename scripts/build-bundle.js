import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "app.bundle.js");
const moduleFiles = Object.freeze([
  "src/catalog.js",
  "src/coverage.js",
  "src/rules.js",
  "src/selectors.js",
  "src/sources.js",
  "src/validate.js",
  "src/app.js",
]);

const bundle = await buildBundle();

if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== bundle) {
    console.error("app.bundle.js no corresponde con los módulos de src/. Ejecuta: npm run build");
    process.exitCode = 1;
  } else {
    console.log("app.bundle.js está sincronizado con src/.");
  }
} else {
  await writeFile(outputPath, bundle, "utf8");
  console.log(`Generado ${path.relative(projectRoot, outputPath)} sin dependencias externas.`);
}

async function buildBundle() {
  const modules = [];
  for (const relativePath of moduleFiles) {
    const source = await readFile(path.join(projectRoot, relativePath), "utf8");
    modules.push(transformModule(relativePath, source));
  }

  return [
    "/* Este archivo se genera con `npm run build`. No editar directamente. */",
    "(() => {",
    '  "use strict";',
    "  const __modules = Object.create(null);",
    "",
    modules.join("\n\n"),
    "})();",
    "",
  ].join("\n");
}

function transformModule(relativePath, source) {
  const moduleId = moduleIdFromPath(relativePath);
  const exportedNames = [
    ...source.matchAll(/^export\s+(?:const|function)\s+([A-Za-z_$][\w$]*)/gm),
  ].map((match) => match[1]);

  const withoutImports = source.replace(
    /^import\s*\{([\s\S]*?)\}\s*from\s*["'](.+?)["'];\s*/gm,
    (_statement, names, dependencyPath) =>
      `const {${names}} = __modules["${moduleIdFromPath(dependencyPath)}"];\n`,
  );
  const executableSource = withoutImports.replace(
    /^export\s+(?=(?:const|function)\b)/gm,
    "",
  );
  const returnStatement = exportedNames.length
    ? `return Object.freeze({ ${exportedNames.join(", ")} });`
    : "return Object.freeze({});";

  return [
    `  // ${relativePath}`,
    `  __modules["${moduleId}"] = (() => {`,
    indent(executableSource.trimEnd(), 4),
    "",
    `    ${returnStatement}`,
    "  })();",
  ].join("\n");
}

function moduleIdFromPath(modulePath) {
  return path.posix.basename(modulePath.replaceAll("\\", "/"), ".js");
}

function indent(text, spaces) {
  const prefix = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line ? `${prefix}${line}` : ""))
    .join("\n");
}
