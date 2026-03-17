import 'zone.js/node';
import '@angular/compiler';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './src/app/app';
import { config } from './src/app/app.config.server';
import https from 'https';
import http from 'http';

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

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  const apiProxyHandler = (req: express.Request, res: express.Response) => {
    const targetUrl = `https://69b9226ee69653ffe6a6a4d9.mockapi.io${req.originalUrl}`;
    
    const protocol = targetUrl.startsWith('https') ? https : http;
    
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const proxyReq = protocol.request(targetUrl, options, (proxyRes) => {
      let data = '';
      proxyRes.on('data', (chunk) => data += chunk);
      proxyRes.on('end', () => {
        res.status(proxyRes.statusCode || 200);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
      });
    });

    proxyReq.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    if (req.body) {
      proxyReq.write(JSON.stringify(req.body));
    }
    proxyReq.end();
  };

  server.all('/tasks', apiProxyHandler);
  server.all('/tasks/*', apiProxyHandler);

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
