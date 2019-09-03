import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {GraficaEventoComponent} from './pages/graficas/grafica-evento/grafica-evento.component';
import {EventoComponent} from './pages/eventos/evento/evento.component';
import { NuevoCiaComponent } from './pages/forms/nuevo-cia/nuevo-cia.component';

import {HomeComponent} from './pages/home/home.component';
import {DepartamentosComponent} from './pages/filtro/departamentos/departamentos.component';
import {MaquinasComponent} from './pages/filtro/maquinas/maquinas.component';
import {AreasComponent} from './pages/filtro/areas/areas.component';
import {UsuariosComponent} from './pages/filtro/usuarios/usuarios.component';
import {SensoresComponent} from './pages/filtro/sensores/sensores.component';
import {LoginComponent} from './pages/login/login.component';

const routes:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'graficas',component:GraficaEventoComponent},
  {path:'maquina',component:MaquinasComponent},
  {path:'sensor',component:SensoresComponent},
  {path:'evento',component:EventoComponent},
  {path:'departamento',component:DepartamentosComponent},
  {path:'area',component:AreasComponent},
  {path:'cia',component:NuevoCiaComponent},
  {path:'usuario',component:UsuariosComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent}
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
