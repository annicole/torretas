import { Component, OnInit } from '@angular/core';

import { Evento } from '../../../models/evento';
import { EventoService } from '../../../services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  date = new Date();
  private idMaquina: string;
  private sensor: string;
  private fechaInicio: string;
  private fechaFin: string;
  private page='1';
  private limit='15';
  listEventos: Evento[] = [
    {
      desbloqueo: 'desbloqueo',
      hrf: this.date,
      hri: this.date,
      maquina: "maquina",
      parof: this.date,
      paroi: this.date,
      sesnor: "sensor",
      tiempoe: 1,
      tiempop: 2,
    },
    {
      desbloqueo: 'desbloqueo2',
      hrf: this.date,
      hri: this.date,
      maquina: "maquina2",
      parof: this.date,
      paroi: this.date,
      sesnor: "sensor2",
      tiempoe: 12,
      tiempop: 22,
    },
    {
      desbloqueo: 'desbloqueo3',
      hrf: this.date,
      hri: this.date,
      maquina: "maquina3",
      parof: this.date,
      paroi: this.date,
      sesnor: "sensor3",
      tiempoe: 13,
      tiempop: 23,
    },
  ];
  numberOfElemets = [
    { label: 'Ver 1 items', value: '1' },
    { label: 'Ver 2 items', value: '2' },
    { label: 'Ver 3 items', value: '3' },
    { label: 'Ver 4 items', value: '4' }
  ];
  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    try {
      this.idMaquina = localStorage.getItem('maquina');
      this.fechaInicio = localStorage.getItem('fechaInicio');
      this.fechaFin = localStorage.getItem('fechaFin');
      this.sensor = localStorage.getItem('sensor');
      console.log(this.idMaquina,this.fechaFin,this.fechaInicio,this.sensor);
      localStorage.removeItem('maquina');
      localStorage.removeItem('fechaInicio');
      localStorage.removeItem('fechaFin');
      localStorage.removeItem('sensor');
      this.getEventos();
    } catch (e) {
      console.log(e);
    }
  }

  async getEventos() {
    try {
      let resp = await this.eventoService.getEvento("/e1", this.idMaquina, this.fechaInicio, this.fechaFin,this.page,this.limit).toPromise();
      if (resp.code == 200) {
        this.listEventos = resp.evento;
      }
    } catch (e) {
      console.log(e);
    }
  }

  selectPage(page) {
    this.page = page;
    console.log('Page from pagination bar: ', page);
    // do a call with this page
  }

  selectOption(option) {
    console.log('Number of elemets: ', option);
  }

}
