import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficaEventoComponent } from './pages/graficas/grafica-evento/grafica-evento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TablaSensorComponent } from './components/tabla-sensor/tabla-sensor.component';
import { NuevoMaquinaComponent } from './pages/forms/nuevo-maquina/nuevo-maquina.component';
import { HeaderComponent } from './components/header/header.component';
import { NuevoSensorComponent } from './pages/forms/nuevo-sensor/nuevo-sensor.component';


@NgModule({
  declarations: [
    AppComponent,
    GraficaEventoComponent,
    TablaSensorComponent,
    NuevoMaquinaComponent,
    HeaderComponent,
    NuevoSensorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
