import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {GraficaEventoComponent} from './pages/graficas/grafica-evento/grafica-evento.component';
import { NuevoMaquinaComponent } from './pages/forms/nuevo-maquina/nuevo-maquina.component';
import { NuevoSensorComponent } from './pages/forms/nuevo-sensor/nuevo-sensor.component';
import {EventoComponent} from './pages/eventos/evento/evento.component'

const routes:Routes=[
  {path:'',redirectTo:'/graficas',pathMatch:'full'},
  {path:'graficas',component:GraficaEventoComponent},
  {path:'maquina',component:NuevoMaquinaComponent},
  {path:'sensor',component:NuevoSensorComponent},
  {path:'evento1',component:EventoComponent}
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
