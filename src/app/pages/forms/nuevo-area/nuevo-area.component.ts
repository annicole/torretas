import { Component, OnInit } from '@angular/core';
import{ AreaService} from '../../../services/area.service';
import {CiaService} from '../../../services/cia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Area} from '../../../models/area';
import{Cia} from '../../../models/cia';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nuevo-area',
  templateUrl: './nuevo-area.component.html',
  styleUrls: ['./nuevo-area.component.css']
})
export class NuevoAreaComponent implements OnInit {

  area:Area = new Area();
  areaForm : FormGroup;
  submitted = false;
  cias:Cia[];
  constructor(private ciaService:CiaService,private areaService:AreaService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.areaForm = this.formBuilder.group({
      area: ['' , Validators.required],
      idcia: ['' , Validators.required]
    }); 
    this.getCias();
  }

  async getCias(){
    try{
      let resp = await this.ciaService.getCias().toPromise();
    if(resp.code == 200)
       {
       this.cias = resp.cia;
     }
    }catch(e){
      console.log(e);
    }
}

get f() { return this.areaForm.controls; }

onSubmit(){
  this.submitted = true;    
  if(this.areaForm.invalid){      
    return;
  } else {
    this.guardar();
  }    
} 

async guardar(){
  try{
    let response = await this.areaService.create(this.area).toPromise();
    if(response.code = 200){
      Swal.fire('','Área guardada correctamente','success');
      this.router.navigate(['']);
    } 
    else {
     Swal.fire('Error','No fue posible guardar el área','error');
    } 
  }catch(e){
    console.log(e);
    Swal.fire('Error','No fue posible guardar el área','error');
  }
}


}
