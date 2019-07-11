import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GraficaEventoComponent } from './pages/graficas/grafica-evento/grafica-evento.component';


@NgModule({
  declarations: [
    AppComponent,
    GraficaEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
