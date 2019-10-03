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
        function: '/graficas/0',
        class: 'black-bg'
      },
      {
        icon: 'store',
        text: 'Editar Cia',
        function: '/cia',
        class: 'blue-bg'
      },
      {
        icon: 'build',
        text: 'Máquinas',
        function: '/maquina',
        class: 'pink-bg'
      },
      {
        icon: 'work',
        text: 'Áreas',
        function: '/area',
        class: 'red-bg'
      },
      {
        icon: 'group',
        text: 'Departamentos',
        function: '/departamento',
        class: 'green-bg'
      },
      {
        icon: 'schedule',
        text: 'Sensores',
        function: '/sensor',
        class: 'yellow-bg'
      },
      {
        icon: 'person_add',
        text: 'Usuarios',
        function: '/usuario',
        class: 'orange-bg'
      }
    ];
  }

  async getCia(){
    try{
      let resp = await this.ciaService.readCia(2).toPromise();
      if (resp.code == 200) {
        this.cia = resp.cia;
        console.log(this.cia.logotipo);
        var uints = new Uint8Array([91,111,98,106,101,99,116,32,79,98,106,101,99,116,93]);
        console.log(uints);
        var decoder = new TextDecoder('utf8');
        var base64 = btoa(decoder.decode(uints));
        var url = 'data:image/jpg;base64,' + base64;
       // console.log(this.urlImg);
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
