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
import {LoginComponent} from './pages/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { TipoEquipoComponent } from './pages/filtro/tipo-equipo/tipo-equipo.component';
import {ModuloInterfazComponent} from './pages/filtro/modulo-interfaz/modulo-interfaz.component'
import {PerfilConfigComponent} from './pages/filtro/perfil-config/perfil-config.component'
import {NuevoConfiguracionModuloComponent} from './pages/forms/nuevo-configuracion-modulo/nuevo-configuracion-modulo.component'
import {ProductosComponent} from './pages/filtro/productos/productos.component'
import {SubensambleComponent} from './pages/filtro/subensamble/subensamble.component'
import { MateriaPrimaComponent } from '@app/pages/filtro/materia-prima/materia-prima.component'
import { EmpresaComponent } from '@app/pages/filtro/empresa/empresa.component'
import { OrdenManufacturaComponent } from '@app/pages/filtro/orden-manufactura/orden-manufactura.component'
import { TurnosProductivosComponent } from '@app/pages/filtro/turnos/registro-turnos-productivos.component'
import { NuevoTurnosComponent } from '@app/pages/forms/nuevo-turnos/nuevo-turnos.component'
import { NuevoEmpresaComponent } from '@app/pages/forms/nuevo-empresa/nuevo-empresa.component'
import { NuevoWoComponent } from '@app/pages/forms/nuevo-wo/nuevo-wo.component'
import { ControlComponent } from './pages/control/control.component';
import { PersonalCalidadComponent } from './pages/filtro/personal-calidad/personal-calidad.component';
import { PersonalIngenieriaComponent } from './pages/filtro/personal-ingenieria/personal-ingenieria.component';
import { PersonalMaterialesComponent } from './pages/filtro/personal-materiales/personal-materiales.component';
import { PersonalOperativoComponent } from './pages/filtro/personal-operativo/personal-operativo.component';
import { PersonalTecnicoComponent } from './pages/filtro/personal-tecnico/personal-tecnico.component';
import { ProgramaProduccionComponent} from '@app/pages/filtro/programa-produccion/programa-produccion.component'
import { PerformanceComponent } from './pages/performance/performance.component'

const routes:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'graficas/:idMaquina',component:GraficaEventoComponent,canActivate: [AuthGuard] },
  {path:'maquina',component:MaquinasComponent,canActivate: [AuthGuard] },
  {path:'moduloInterfaz',component:ModuloInterfazComponent,canActivate: [AuthGuard] },
  {path:'evento',component:EventoComponent,canActivate: [AuthGuard] },
  {path:'departamento',component:DepartamentosComponent,canActivate: [AuthGuard] },
  {path:'area',component:AreasComponent,canActivate: [AuthGuard] },
  {path:'cia/:id',component:NuevoCiaComponent,canActivate: [AuthGuard]},
  {path:'usuario',component:UsuariosComponent,canActivate: [AuthGuard] },
  {path:'home',component:HomeComponent,canActivate: [AuthGuard] },
  {path:'login',component:LoginComponent },
  {path:'tablaEstado/:idMaquina',component:GraficaSensorComponent,canActivate: [AuthGuard]},
  {path:'tipoEquipo',component:TipoEquipoComponent,canActivate: [AuthGuard] },
  {path:'perfilConfig',component:PerfilConfigComponent,canActivate: [AuthGuard] },
  {path:'configuracionModulo/:idPerfil',component:NuevoConfiguracionModuloComponent,canActivate:[AuthGuard]},
  {path:'producto',component:ProductosComponent,canActivate:[AuthGuard]},
  {path:'subensamble',component:SubensambleComponent,canActivate:[AuthGuard]},
  {path: 'materiaPrima', component: MateriaPrimaComponent, canActivate: [AuthGuard] },
  {path: 'empresa/:id', component: NuevoEmpresaComponent, canActivate: [AuthGuard] },
  {path: 'empresa/add', component: NuevoEmpresaComponent, canActivate: [AuthGuard] },
  {path: 'control', component: ControlComponent, canActivate: [AuthGuard] },
  {path: 'empresa', component: EmpresaComponent, canActivate: [AuthGuard] },
  {path: 'OrdenManufactura', component: OrdenManufacturaComponent, canActivate: [AuthGuard] },
  {path: 'OrdenManufactura/:id', component: NuevoWoComponent, canActivate: [AuthGuard] },
  {path:'materiaPrima',component:MateriaPrimaComponent,canActivate:[AuthGuard]},
  {path:'personal-calidad', component:PersonalCalidadComponent,canActivate:[AuthGuard]},
  {path:'personal-ingenieria', component:PersonalIngenieriaComponent,canActivate:[AuthGuard]},
  {path:'personal-materiales', component:PersonalMaterialesComponent,canActivate:[AuthGuard]},
  {path:'personal-operativo', component:PersonalOperativoComponent,canActivate:[AuthGuard]},
  {path:'personal-tecnico', component:PersonalTecnicoComponent,canActivate:[AuthGuard]},
  {path: 'materiaPrima', component: MateriaPrimaComponent, canActivate: [AuthGuard] },
  {path: 'empresa/:id', component: NuevoEmpresaComponent, canActivate: [AuthGuard] },
  {path: 'empresa/add', component: NuevoEmpresaComponent, canActivate: [AuthGuard] },
  {path: 'control', component: ControlComponent, canActivate: [AuthGuard] },
  {path: 'empresa', component: EmpresaComponent, canActivate: [AuthGuard] },
  {path: 'TurnosProductivos', component: TurnosProductivosComponent, canActivate: [AuthGuard] },
  {path: 'RegistroTurnosProductivos/:id', component: NuevoTurnosComponent, canActivate: [AuthGuard] },
  {path: 'produccion',component: ProgramaProduccionComponent,canActivate:[AuthGuard]},
  {path: 'performance', component: PerformanceComponent},
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
