import 'zone.js'; 
import { bootstrapApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(),
  ]
}).catch((err) => console.error(err));