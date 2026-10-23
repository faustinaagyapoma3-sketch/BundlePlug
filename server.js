const http = require('http');
const fs = require('fs');
const path = require('path');
const port = Number(process.env.PORT || 3000);
const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' };
const server = http.createServer((req,res)=>{
  const url = new URL(req.url, `http://${req.headers.host}`);
  let file = url.pathname === '/manus-routes.json' ? path.join(root,'public/manus-routes.json') : path.join(root, url.pathname === '/' ? 'index.html' : url.pathname === '/products' || url.pathname === '/products/' ? 'products/index.html' : url.pathname);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { file = path.join(root,'index.html'); }
  const ext = path.extname(file);
  res.writeHead(200, {'Content-Type': mime[ext] || 'text/plain; charset=utf-8', 'Cache-Control':'no-cache'});
  fs.createReadStream(file).pipe(res);
});
server.listen(port,'0.0.0.0',()=>console.log(`BundlePlug preview listening on ${port}`));
