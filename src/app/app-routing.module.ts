import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {GraficaEventoComponent} from './pages/graficas/grafica-evento/grafica-evento.component';
import { NuevoMaquinaComponent } from './pages/forms/nuevo-maquina/nuevo-maquina.component';
import { NuevoSensorComponent } from './pages/forms/nuevo-sensor/nuevo-sensor.component';
import {EventoComponent} from './pages/eventos/evento/evento.component';
import {NuevoAreaComponent  } from './pages/forms/nuevo-area/nuevo-area.component';
import { NuevoDepartamentoComponent } from './pages/forms/nuevo-departamento/nuevo-departamento.component';
import { NuevoCiaComponent } from './pages/forms/nuevo-cia/nuevo-cia.component';
import {NuevoUsuarioComponent} from './pages/forms/nuevo-usuario/nuevo-usuario.component';
import {HomeComponent} from './pages/home/home.component';

const routes:Routes=[
  {path:'',redirectTo:'/graficas',pathMatch:'full'},
  {path:'graficas',component:GraficaEventoComponent},
  {path:'maquina',component:NuevoMaquinaComponent},
  {path:'sensor',component:NuevoSensorComponent},
  {path:'evento',component:EventoComponent},
  {path:'departamento',component:NuevoDepartamentoComponent},
  {path:'area',component:NuevoAreaComponent},
  {path:'cia',component:NuevoCiaComponent},
  {path:'usuario',component:NuevoUsuarioComponent},
  {path:'home',component:HomeComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
