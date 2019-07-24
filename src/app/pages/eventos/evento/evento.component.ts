import { Component, OnInit } from '@angular/core';
import{Maquina} from '../../../models/maquina';
import{ MaquinaService} from '../../../services/maquina.service';
import {Evento} from '../../../models/evento';
import{ EventoService} from '../../../services/evento.service';
import {AplicacionService} from '../../../services/aplicacion.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  maquinas:Maquina[];
  listEventos:Evento[];
  private idMaquina:number;
  private sensor:string;
  constructor(private maquinaService:MaquinaService,private eventoService:EventoService,
              private aplicacionSerivce:AplicacionService ) { }

  ngOnInit() {
   // this.getMaquinas();

    //this.getEventos();
    this.sensor = this.aplicacionSerivce['sensor'];
    this.idMaquina = this.aplicacionSerivce['idMaqina'];
    console.log(this.sensor,this.idMaquina);
  }

  async getMaquinas(){
    try{
      let resp = await this.maquinaService.getMaquinas().toPromise();
    if(resp.code == 200)
       {
       this.maquinas = resp.maquina;
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
