// Copyright 2026 PeopleWare N.V.
// SPDX-License-Identifier: Apache-2.0

/**
 * One-off migration helper. Run from this package with:
 *
 *   node scripts/convert-joi-to-zod.mjs
 *
 * It intentionally reads the Joi modules at runtime, rather than trying to
 * translate JavaScript source text. Joi's describe() output is a much more
 * reliable migration boundary for schemas assembled with append(), concat(),
 * and shared schema constants.
 */
import { createRequire } from "node:module";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const sourceRoot = join(here, "..", "..", "openapi");
const outputRoot = join(here, "..", "src");
const categories = [
  "health",
  "human",
  "id",
  "location",
  "money",
  "number",
  "parameters",
  "resource",
  "string",
  "time",
];
const sourceFiles = [];

const kebab = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .toLowerCase();
const quote = (value) => JSON.stringify(value);
const comment = (value) =>
  typeof value === "string" && value.length ? value : undefined;

async function filesIn(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await filesIn(path);
    else if (extname(entry.name) === ".js") sourceFiles.push(path);
  }
}

function regexSource(value) {
  const match = /^\/(.*)\/([a-z]*)$/.exec(value);
  return match
    ? `new RegExp(${quote(match[1])}, ${quote(match[2])})`
    : quote(value);
}

function literal(value) {
  if (typeof value === "string") return `z.literal(${quote(value)})`;
  if (value === null) return "z.null()";
  if (typeof value === "number" || typeof value === "boolean")
    return `z.literal(${String(value)})`;
  return `z.literal(${JSON.stringify(value)})`;
}

function describeSchema(description) {
  if (!description) return "z.any()";
  if (description.type === "alternatives") {
    const alternatives = (description.matches ?? []).flatMap(
      (match) => match.schemas ?? (match.schema ? [match.schema] : []),
    );
    return alternatives.length
      ? `z.union([${alternatives.map(describeSchema).join(", ")}])`
      : "z.any()";
  }

  let expression;
  switch (description.type) {
    case "string":
      expression = "z.string()";
      break;
    case "number":
      expression = "z.number()";
      break;
    case "boolean":
      expression = "z.boolean()";
      break;
    case "array":
      expression = `z.array(${describeSchema(description.items?.[0])})`;
      break;
    case "object": {
      const entries = Object.entries(description.keys ?? {}).map(
        ([key, value]) => {
          const required = value.flags?.presence === "required";
          let property = describeSchema(value);
          if (!required) property += ".optional()";
          return `${quote(key)}: ${property}`;
        },
      );
      expression = `z.object({${entries.join(", ")}})`;
      if (description.flags?.unknown === true) expression += ".passthrough()";
      else if (description.flags?.unknown === false) expression += ".strict()";
      break;
    }
    case "any":
      expression = "z.any()";
      break;
    default:
      expression = "z.any()";
      break;
  }

  const rules = description.rules ?? [];
  const args = (rule) => rule.args ?? {};
  for (const rule of rules) {
    if (rule.name === "integer") expression += ".int()";
    if (rule.name === "min" && typeof args(rule).limit === "number")
      expression += `.min(${args(rule).limit})`;
    if (rule.name === "max" && typeof args(rule).limit === "number")
      expression += `.max(${args(rule).limit})`;
    if (rule.name === "length" && typeof args(rule).limit === "number")
      expression += `.length(${args(rule).limit})`;
    if (rule.name === "unique")
      expression +=
        '.refine(value => new Set(value).size === value.length, { message: "Array items must be unique" })';
    if (rule.name === "pattern" && typeof args(rule).regex === "string")
      expression += `.regex(${regexSource(args(rule).regex)})`;
    if (rule.name === "uuid") expression += ".uuid()";
    if (rule.name === "trim")
      expression += `.refine(value => value === value.trim(), { message: "Must be trimmed" })`;
  }

  const valids =
    description.allow?.filter(
      (value) =>
        value !== "" &&
        (value === null ||
          ["string", "number", "boolean"].includes(typeof value)),
    ) ?? [];
  if (valids.length)
    expression =
      valids.length === 1
        ? literal(valids[0])
        : `z.union([${valids.map(literal).join(", ")}])`;
  return expression;
}

function schemaFile(category, source, name, schema) {
  let expression = describeSchema(schema);
  const metadata = [`id: ${quote(name)}`];
  const title = comment(schema.flags?.label);
  if (title) metadata.push(`title: ${quote(title)}`);
  if (schema.flags?.description)
    metadata.push(`description: ${quote(schema.flags.description)}`);
  if (schema.examples?.length)
    metadata.push(`examples: ${JSON.stringify(schema.examples)}`);
  expression += `.meta({${metadata.join(", ")}})`;
  return `export const ${name}Schema = ${expression};\nexport type ${name} = z.infer<typeof ${name}Schema>;\n`;
}

for (const category of categories) await filesIn(join(sourceRoot, category));
const exportsByCategory = new Map(categories.map((category) => [category, []]));

for (const source of sourceFiles) {
  const moduleExports = require(source);
  const schemas = Object.entries(moduleExports).filter(
    ([, value]) => value && typeof value.describe === "function",
  );
  if (!schemas.length) continue;
  const category = relative(sourceRoot, source).split(sep)[0];
  const targetDirectory = join(
    outputRoot,
    relative(sourceRoot, dirname(source)),
  );
  await mkdir(targetDirectory, { recursive: true });
  const content = `// Copyright 2026 PeopleWare N.V.\n// SPDX-License-Identifier: Apache-2.0\nimport { z } from "zod";\n\n${schemas.map(([name, value]) => schemaFile(category, source, name, value.describe())).join("\n")}`;
  const target = join(
    targetDirectory,
    `${kebab(source.slice(0, -extname(source).length).split(sep).at(-1))}.schema.ts`,
  );
  await writeFile(target, content);
  exportsByCategory.get(category).push({
    name: schemas.map(([name]) => `${name}Schema`),
    path: `./${relative(join(outputRoot, category), target).replaceAll(sep, "/").replace(/\.ts$/, ".js")}`,
  });
}

for (const [category, modules] of exportsByCategory) {
  if (!modules.length) continue;
  const lines = modules.flatMap((module) =>
    module.name.map(
      (name) =>
        `export { ${name}, type ${name.slice(0, -6)} } from "${module.path}";`,
    ),
  );
  await writeFile(
    join(outputRoot, category, "index.ts"),
    `// Copyright 2026 PeopleWare N.V.\n// SPDX-License-Identifier: Apache-2.0\n${lines.join("\n")}\n`,
  );
}

console.log(
  `Converted ${sourceFiles.length} source modules into ${[...exportsByCategory.values()].reduce((count, modules) => count + modules.length, 0)} generated files.`,
);
