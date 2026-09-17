import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve("dist");
const base = (
  process.env.BASE_PATH ||
  (process.env.GITHUB_PAGES === "true" ? "/portfolio-dario-jauregui" : "")
).replace(/\/$/, "");
const htmlFiles = [];
const idCache = new Map();

const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    statSync(path).isDirectory()
      ? walk(path)
      : name.endsWith(".html") && htmlFiles.push(path);
  }
};
walk(root);

const idsFor = (file) => {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    idCache.set(
      file,
      new Set(
        [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]),
      ),
    );
  }
  return idCache.get(file);
};

const failures = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const pagePath = `/${relative(root, file).split(sep).join("/")}`.replace(
    /index\.html$/,
    "",
  );
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(reference)) continue;
    const url = new URL(reference, `https://local${base}${pagePath}`);
    const pathname = url.pathname;
    const withoutBase = pathname.startsWith(base)
      ? pathname.slice(base.length)
      : pathname;
    const target = join(root, withoutBase);
    const targetFile =
      existsSync(target) && statSync(target).isFile()
        ? target
        : existsSync(join(target, "index.html"))
          ? join(target, "index.html")
          : null;
    const valid = Boolean(targetFile);
    if (!valid) failures.push(`${relative(root, file)} -> ${reference}`);
    else if (
      url.hash &&
      targetFile.endsWith(".html") &&
      !idsFor(targetFile).has(decodeURIComponent(url.hash.slice(1)))
    )
      failures.push(`${relative(root, file)} -> missing anchor ${reference}`);
  }
}

if (failures.length)
  throw new Error(`Broken internal links:\n${failures.join("\n")}`);
console.log(
  `Checked ${htmlFiles.length} HTML files: no broken internal links.`,
);
