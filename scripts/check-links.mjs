import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve("dist");
const base =
  process.env.GITHUB_PAGES === "true" ? "/portfolio-dario-jauregui" : "";
const htmlFiles = [];

const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    statSync(path).isDirectory()
      ? walk(path)
      : name.endsWith(".html") && htmlFiles.push(path);
  }
};
walk(root);

const failures = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const pagePath = `/${relative(root, file).split(sep).join("/")}`.replace(
    /index\.html$/,
    "",
  );
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#|javascript:)/.test(reference))
      continue;
    const pathname = new URL(reference, `https://local${base}${pagePath}`)
      .pathname;
    const withoutBase = pathname.startsWith(base)
      ? pathname.slice(base.length)
      : pathname;
    const target = join(root, withoutBase);
    const valid = existsSync(target) || existsSync(join(target, "index.html"));
    if (!valid) failures.push(`${relative(root, file)} -> ${reference}`);
  }
}

if (failures.length)
  throw new Error(`Broken internal links:\n${failures.join("\n")}`);
console.log(
  `Checked ${htmlFiles.length} HTML files: no broken internal links.`,
);
