import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CiaService} from '../../services/cia.service';
import Swal from 'sweetalert2';
import {Cia} from '../../models/cia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cia:Cia = new Cia();
  urlImg:string;
  constructor(private router:Router,private ciaService:CiaService) { }

  ngOnInit() {
    this.urlImg = "img/ICMA_AUTOMATION-01.png"
  }

  async getCia(){
    try{
      let resp = await this.ciaService.readCia(1).toPromise();
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
