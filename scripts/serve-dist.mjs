import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve("dist");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";
const base =
  process.env.GITHUB_PAGES === "true" ? "/portfolio-dario-jauregui" : "";
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const resolveFile = (pathname) => {
  const decoded = decodeURIComponent(pathname).replace(base, "") || "/";
  const relative = decoded.endsWith("/") ? `${decoded}index.html` : decoded;
  const candidate = normalize(join(root, relative));
  if (!candidate.startsWith(`${root}${sep}`) && candidate !== root) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (existsSync(`${candidate}${sep}index.html`))
    return `${candidate}${sep}index.html`;
  return null;
};

export const startServer = () =>
  new Promise((resolveReady) => {
    const server = createServer((request, response) => {
      const pathname = new URL(
        request.url || "/",
        `http://${request.headers.host}`,
      ).pathname;
      const file = resolveFile(pathname);
      if (!file) {
        const fallback = join(root, "404.html");
        response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return existsSync(fallback)
          ? createReadStream(fallback).pipe(response)
          : response.end("Not found");
      }
      response.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
      });
      createReadStream(file).pipe(response);
    });
    server.listen(port, host, () => resolveReady(server));
  });

if (import.meta.url.endsWith(process.argv[1].replaceAll("\\", "/"))) {
  const server = await startServer();
  console.log(`Static server: http://${host}:${port}${base}/`);
  for (const signal of ["SIGINT", "SIGTERM"])
    process.on(signal, () => server.close(() => process.exit(0)));
}
