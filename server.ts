import 'zone.js/node';
import '@angular/compiler';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import http from 'http';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './src/app/app';
import { config } from './src/app/app.config.server';

const bootstrap = (context?: any) => bootstrapApplication(App, config, context);

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = join(serverDistFolder, '..', 'browser');
  const indexHtml = join(browserDistFolder, 'index.html');

  const commonEngine = new CommonEngine({
    allowedHosts: ['localhost', 'localhost:4000', '127.0.0.1']
  });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use('/tasks', (req, res) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: req.originalUrl,
      method: req.method,
      headers: req.headers
    };
    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
  });

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
