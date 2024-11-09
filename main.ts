import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { App } from './app/app.component';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule)
  ]
});