import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CiaService} from '@app/services/cia.service';
import {Cia} from '@app/models/cia';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cia:Cia = new Cia();
  urlImg:string;
  homeCards: Array <object> = [];

  constructor(private router:Router,private ciaService:CiaService,private auth:AuthService) { }

  ngOnInit() {
    this.urlImg = "assets/img/ICMA_AUTOMATION-01.png";
    this.getCia();
    this.homeCards = [
      {
        icon: 'insert_chart',
        text: 'Gráficas Evento',
        function: '/graficas/0',
        class: 'black-bg'
      },
      {
        icon: 'bubble_chart',
        text: 'Estados',
        function: '/tablaEstado/0',
        class: 'green-two-bg'
      },
      {
        icon: 'store',
        text: 'Editar Empresa',
        function: '/cia/0',
        class: 'blue-bg'
      },
      {
        icon: 'build',
        text: 'Equipos',
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
        text: 'Modulo Interfaz',
        function: '/moduloInterfaz',
        class: 'yellow-bg'
      },
      {
        icon: 'person_add',
        text: 'Usuarios',
        function: '/usuario',
        class: 'orange-bg'
      },
      {
        icon: 'assignment',
        text: 'Control de producción',
        function: '/producto',
        class: 'gray-bg'
      }
    ];
  }

  async getCia(){
    try{
      let resp = await this.ciaService.readCia(1,this.auth.token).toPromise();
      if (resp.code == 200) {
        this.cia = resp.cia;
        var uints = new Uint8Array([91,111,98,106,101,99,116,32,79,98,106,101,99,116,93]);
        var decoder = new TextDecoder('utf8');
        var base64 = btoa(decoder.decode(uints));
        var url = 'data:image/jpg;base64,' + base64;
       // console.log(this.urlImg);
      }
    }catch(e){
        }
  }

  navigateTo(url:String){
    url = '/'+url;
    this.router.navigate([url]);
  }
}
