import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { mockBackendInterceptor } from './mocks/mock-backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // reduce la cantidad de eventos procesados
    provideRouter(routes), // define las rutas de la aplicación
    provideHttpClient(
      withFetch(),
      withInterceptors([mockBackendInterceptor]) // interceptor para simular el backend con datos mockeados
    )
  ]
};
