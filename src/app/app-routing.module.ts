import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {GraficaEventoComponent} from './pages/graficas/grafica-evento/grafica-evento.component';
import {GraficaSensorComponent} from './pages/graficas/grafica-sensor/grafica-sensor.component';
import {EventoComponent} from './pages/eventos/evento/evento.component';
import { NuevoCiaComponent } from './pages/forms/nuevo-cia/nuevo-cia.component';

import {HomeComponent} from './pages/home/home.component';
import {DepartamentosComponent} from './pages/filtro/departamentos/departamentos.component';
import {MaquinasComponent} from './pages/filtro/maquinas/maquinas.component';
import {AreasComponent} from './pages/filtro/areas/areas.component';
import {UsuariosComponent} from './pages/filtro/usuarios/usuarios.component';
import {SensoresComponent} from './pages/filtro/sensores/sensores.component';
import {LoginComponent} from './pages/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'graficas/:idMaquina',component:GraficaEventoComponent,canActivate: [AuthGuard] },
  {path:'maquina',component:MaquinasComponent,canActivate: [AuthGuard] },
  {path:'sensor',component:SensoresComponent,canActivate: [AuthGuard] },
  {path:'evento',component:EventoComponent,canActivate: [AuthGuard] },
  {path:'departamento',component:DepartamentosComponent,canActivate: [AuthGuard] },
  {path:'area',component:AreasComponent,canActivate: [AuthGuard] },
  {path:'cia/:id',component:NuevoCiaComponent},
  {path:'usuario',component:UsuariosComponent,canActivate: [AuthGuard] },
  {path:'home',component:HomeComponent,canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent },
  {path:'graficaEstado',component:GraficaSensorComponent}
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
