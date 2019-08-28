import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficaEventoComponent } from './pages/graficas/grafica-evento/grafica-evento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { registerLocaleData } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import localeEsMX from '@angular/common/locales/es-MX';

import { TablaSensorComponent } from './components/tabla-sensor/tabla-sensor.component';
import { NuevoMaquinaComponent } from './pages/forms/nuevo-maquina/nuevo-maquina.component';
import { HeaderComponent } from './components/header/header.component';
import { NuevoSensorComponent } from './pages/forms/nuevo-sensor/nuevo-sensor.component';
import { EventoComponent } from './pages/eventos/evento/evento.component';
import { PieComponent } from './components/charts/pie/pie.component';
import { PaginationBarComponent } from './components/pagination-bar/pagination-bar.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NuevoAreaComponent } from './pages/forms/nuevo-area/nuevo-area.component';
import { NuevoDepartamentoComponent } from './pages/forms/nuevo-departamento/nuevo-departamento.component';
import { NuevoCiaComponent } from './pages/forms/nuevo-cia/nuevo-cia.component';
import { NuevoUsuarioComponent } from './pages/forms/nuevo-usuario/nuevo-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { DepartamentosComponent } from './pages/filtro/departamentos/departamentos.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';
import { LoginComponent } from './pages/login/login.component';

registerLocaleData(localeEsMX, 'es-Mx');


@NgModule({
  declarations: [
    AppComponent,
    GraficaEventoComponent,
    TablaSensorComponent,
    NuevoMaquinaComponent,
    HeaderComponent,
    NuevoSensorComponent,
    EventoComponent,
    PieComponent,
    PaginationBarComponent,
    DropdownComponent,
    NuevoAreaComponent,
    NuevoDepartamentoComponent,
    NuevoCiaComponent,
    NuevoUsuarioComponent,
    HomeComponent,
    DepartamentosComponent,
    FilePickerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [DatePipe,{ provide: LOCALE_ID, useValue: 'es-Mx' }],
  bootstrap: [AppComponent],
  entryComponents: [
    NuevoDepartamentoComponent,
  ]
})
export class AppModule { }
