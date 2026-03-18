import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes, RenderMode } from '@angular/ssr';
import { appConfig as clientConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes([{ path: '**', renderMode: RenderMode.Client }])
    ),
  ]
};

export const config = mergeApplicationConfig(clientConfig, serverConfig);