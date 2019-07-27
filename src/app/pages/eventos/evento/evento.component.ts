import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

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
  page:string='1';
  limit:string='10';
  total:number; 
  listEventos: Evento[];
  numberOfElemets = [
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
    { label: '25', value: '25' }
  ];
  constructor(private eventoService: EventoService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    try {
      this.idMaquina = localStorage.getItem('maquina');
      this.fechaInicio = localStorage.getItem('fechaInicio');
      this.fechaFin = localStorage.getItem('fechaFin');
      this.sensor = localStorage.getItem('sensor');
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
      let resp = await this.eventoService.getEvento("/e"+this.sensor, this.idMaquina, this.fechaInicio, this.fechaFin,this.page,this.limit).toPromise();
      if (resp.code == 200) {
        this.listEventos = resp.evento;
        this.total = resp.total;
        this.spinner.hide("mySpinner");
      }
   
    } catch (e) {
      console.log(e);
    }
  }

  selectPage(page) {
    this.page = page;
    this.showSpinner();
    this.getEventos();
    // do a call with this page
  }

  selectOption(option) {
    this.limit = option.value;
    this.showSpinner();
    this.getEventos();
  }

  showSpinner() {
    const opt1: Spinner = {
      bdColor: "rgba(51,51,51,0.8)",
      size: "medium",
      color: "#fff",
      type: "square-jelly-box"
    };
    this.spinner.show("mySpinner", opt1);
  }
}
