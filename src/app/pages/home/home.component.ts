import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CiaService} from '../../services/cia.service';
import Swal from 'sweetalert2';
import {Cia} from '../../models/cia';
import { object } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cia:Cia = new Cia();
  urlImg:string;
  homeCards: Array <object> = [];

  constructor(private router:Router,private ciaService:CiaService) { }

  ngOnInit() {
    this.urlImg = "../../../assets/img/ICMA_AUTOMATION-01.png";
    this.getCia();
    this.homeCards = [
      {
        icon: 'assessment',
        text: 'Graficas',
        function: '/graficas',
        class: 'black-bg'
      },
      {
        icon: 'store',
        text: 'Agregar Cia',
        function: '/cia',
        class: 'blue-bg'
      },
      {
        icon: 'build',
        text: 'Agregar Máquina',
        function: '/maquina',
        class: 'pink-bg'
      },
      {
        icon: 'work',
        text: 'Agregar Área',
        function: '/area',
        class: 'red-bg'
      },
      {
        icon: 'group',
        text: 'Ver Departamentos',
        function: '/departamento',
        class: 'green-bg'
      },
      {
        icon: 'schedule',
        text: 'Agregar Sensor',
        function: '/sensor',
        class: 'yellow-bg'
      },
      {
        icon: 'person_add',
        text: 'Agregar Usuario',
        function: '/usuario',
        class: 'orange-bg'
      }
    ];
  }

  async getCia(){
    try{
      let resp = await this.ciaService.readCia(3).toPromise();
      if (resp.code == 200) {
        this.cia = resp.cia;
        console.log(resp);
      }
    }catch(e){
      console.log(e);
    }
  }

  navigateTo(url:String){
    url = '/'+url;
    this.router.navigate([url]);
  }
}
