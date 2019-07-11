import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {GraficaEventoComponent} from './pages/graficas/grafica-evento/grafica-evento.component';

const routes:Routes=[
  {path:'',component:GraficaEventoComponent}
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
