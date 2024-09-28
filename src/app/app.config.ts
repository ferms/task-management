import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
// import { TemplatesApiMockService } from './features/templates/services/templates-api-mock.service';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, inMemoryScrollingFeature),
    importProvidersFrom(
      HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
    //   HttpClientInMemoryWebApiModule.forFeature(TemplatesApiMockService, {
    //     delay: 500,
    //   }),
    ),
  ],
};
