import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogCongratulationsComponent } from './components/dialog-congratulations/dialog-congratulations.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DialogCongratulationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
