import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const path = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!path.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.'))) {
      res.writeHead(403).end('Forbidden'); return;
    }
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' }).end(data);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log('Killed by Apple: http://localhost:' + (process.env.PORT || 3000)));
