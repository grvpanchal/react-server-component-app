import http from 'http';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './client/App.jsx'; // transpiling with babel is required

http.createServer((req, res) => {
  // this is not the best code, I'm just trying to keep things simple
  if (req.url.endsWith('/client.js')) {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(fs.readFileSync('./dist/client.js'), 'utf8');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`
    <html>
      <head></head>
      <body>
        <div id="root">${renderToString(React.createElement(App))}</div>
        <script src="/client.js"></script>
      </body>
    </html>
    `);
}).listen(3000);