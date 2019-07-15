import { Component, OnInit } from '@angular/core';
import{ MaquinaService} from '../../../services/maquina.service';
import{ AreaService} from '../../../services/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Maquina} from '../../../models/maquina';
import{Area} from '../../../models/area';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nuevo-maquina',
  templateUrl: './nuevo-maquina.component.html',
  styleUrls: ['./nuevo-maquina.component.css']
})
export class NuevoMaquinaComponent implements OnInit {

  maquina:Maquina = new Maquina();
  maquinaForm : FormGroup;
  submitted = false;
  areas:Area[];
  constructor(private maquinaService:MaquinaService,private areaService:AreaService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.maquinaForm = this.formBuilder.group({
      maquina: ['' , Validators.required],
      idarea: ['' , Validators.required]
    }); 
    this.getAreas();
  }

  async getAreas(){
      try{
        let resp = await this.areaService.getAreas().toPromise();
        console.log(resp);
      if(resp.code == 200)
         {
         this.areas = resp.area;
         console.log(resp);
       }
      }catch(e){
        console.log(e);
      }
  }

  get f() { return this.maquinaForm.controls; }

  onSubmit(){
    this.submitted = true;    
    if(this.maquinaForm.invalid){      
      return;
    } else {
      this.guardar();
    }    
  } 

  async guardar(){
    try{
      let response = await this.maquinaService.create(this.maquina).toPromise();
      if(response.code = 200){
        Swal.fire('','Máquina guardada correctamente','success');
        this.router.navigate(['']);
      } 
      else {
       Swal.fire('Error','No fue posible guardar la máquina','error');
      } 
    }catch(e){
      console.log(e);
      Swal.fire('Error','No fue posible guardar la máquina','error');
    }
  }

}
