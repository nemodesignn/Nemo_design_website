import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = resolve(__dirname, "public");
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function safePath(urlPath) {
  const basePath = "/Nemo_design_website";
  const rawPath = decodeURIComponent(urlPath.split("?")[0]);
  const decoded = rawPath === basePath || rawPath.startsWith(`${basePath}/`)
    ? rawPath.slice(basePath.length) || "/"
    : rawPath;
  const clean = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(join(publicDir, clean === "/" ? "/index.html" : clean));
  return filePath.startsWith(publicDir) ? filePath : join(publicDir, "index.html");
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url || "/");
  const target = existsSync(filePath) && statSync(filePath).isFile()
    ? filePath
    : join(publicDir, "index.html");

  const ext = extname(target);
  const isHtml = ext === ".html";

  const headers = {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": isHtml ? "no-store" : "public, max-age=31536000, immutable",
    "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()"
  };

  res.writeHead(200, headers);

  createReadStream(target).pipe(res);
});

server.listen(port, () => {
  console.log(`Studio site running at http://localhost:${port}`);
});
