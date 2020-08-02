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
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import localeEsMX from '@angular/common/locales/es-MX';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
import { AreasComponent } from './pages/filtro/areas/areas.component';
import { MaquinasComponent } from './pages/filtro/maquinas/maquinas.component';
import { SensoresComponent } from './pages/filtro/sensores/sensores.component';
import { UsuariosComponent } from './pages/filtro/usuarios/usuarios.component';
import { GraficaSensorComponent } from './pages/graficas/grafica-sensor/grafica-sensor.component';
import { BarraComponent } from './components/charts/barra/barra.component';
import { TimeLineComponent } from './components/charts/time-line/time-line.component';
import { TipoEquipoComponent } from './pages/filtro/tipo-equipo/tipo-equipo.component';
import { HeaderTableComponent } from './components/header-table/header-table.component';
import { NuevoTipoEquipoComponent } from './pages/forms/nuevo-tipo-equipo/nuevo-tipo-equipo.component';
import { DonutComponent } from './components/charts/donut/donut.component';
import { LayeredComponent } from './components/charts/layered/layered.component';
import { CardTitleComponent } from './components/card-title/card-title.component';
import { FilterByComponent } from './components/filter-by/filter-by.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ModuloInterfazComponent } from './pages/filtro/modulo-interfaz/modulo-interfaz.component';
import { NuevoModuloComponent } from './pages/forms/nuevo-modulo/nuevo-modulo.component';
import { NuevoPerfilconfigComponent } from './pages/forms/nuevo-perfilconfig/nuevo-perfilconfig.component';
import { PerfilConfigComponent } from './pages/filtro/perfil-config/perfil-config.component';
import { NuevoConfiguracionModuloComponent } from './pages/forms/nuevo-configuracion-modulo/nuevo-configuracion-modulo.component';
import { RespiradorComponent } from './pages/filtro/respirador/respirador.component';

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
    LoginComponent,
    AreasComponent,
    MaquinasComponent,
    SensoresComponent,
    UsuariosComponent,
    GraficaSensorComponent,
    BarraComponent,
    TimeLineComponent,
    TipoEquipoComponent,
    HeaderTableComponent,
    NuevoTipoEquipoComponent,
    DonutComponent,
    LayeredComponent,
    CardTitleComponent,
    FilterByComponent,
    DialogComponent,
    ModuloInterfazComponent,
    NuevoModuloComponent,
    NuevoPerfilconfigComponent,
    PerfilConfigComponent,
    NuevoConfiguracionModuloComponent,
    RespiradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [DatePipe,{ provide: LOCALE_ID, useValue: 'es-Mx' }],
  bootstrap: [AppComponent],
  entryComponents: [
    NuevoDepartamentoComponent,NuevoAreaComponent,NuevoMaquinaComponent,NuevoSensorComponent,NuevoUsuarioComponent,
    NuevoTipoEquipoComponent,NuevoModuloComponent, NuevoPerfilconfigComponent
  ]
})
export class AppModule { }
