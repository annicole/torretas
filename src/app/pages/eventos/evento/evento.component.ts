import { Component, OnInit } from '@angular/core';
import{Maquina} from '../../../models/maquina';
import{ MaquinaService} from '../../../services/maquina.service';
import {Evento} from '../../../models/evento';
import{ EventoService} from '../../../services/evento.service';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  maquinas:Maquina[];
  listEventos:Evento[];
  constructor(private maquinaService:MaquinaService,private eventoService:EventoService) { }

  ngOnInit() {
    this.getMaquinas();
    this.getEventos();
  }

  async getMaquinas(){
    try{
      let resp = await this.maquinaService.getMaquinas().toPromise();
      console.log(resp);
    if(resp.code == 200)
       {
       this.maquinas = resp.maquina;
       console.log(resp);
     }
    }catch(e){
      console.log(e);
    }
}

  async getEventos(){
    try{
      let resp = await this.eventoService.getEvento("/e1").toPromise();
      if(resp.code ==200){
        this.listEventos = resp.evento;
      }
    }catch(e){
      console.log(e);
    }
  } 

}
