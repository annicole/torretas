import { Component, OnInit } from '@angular/core';
import{ DepartamentoService} from '../../../services/departamento.service';
import {CiaService} from '../../../services/cia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Departamento} from '../../../models/departamento';
import{Cia} from '../../../models/cia';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nuevo-departamento',
  templateUrl: './nuevo-departamento.component.html',
  styleUrls: ['./nuevo-departamento.component.css']
})
export class NuevoDepartamentoComponent implements OnInit {

  departamento:Departamento = new Departamento();
  departamentoForm : FormGroup;
  submitted = false;
  cias:Cia[];
  constructor(private ciaService:CiaService,private deptoService:DepartamentoService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.departamentoForm = this.formBuilder.group({
      departamento: ['' , Validators.required],
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
       console.log(resp);
     }
    }catch(e){
      console.log(e);
    }
}

get f() { return this.departamentoForm.controls; }

onSubmit(){
  this.submitted = true;    
  if(this.departamentoForm.invalid){      
    return;
  } else {
    this.guardar();
  }    
} 

async guardar(){
  try{
    let response = await this.deptoService.create(this.departamento).toPromise();
    if(response.code = 200){
      Swal.fire('','Departamento guardado correctamente','success');
      this.router.navigate(['']);
    } 
    else {
     Swal.fire('Error','No fue posible guardar el departamento','error');
    } 
  }catch(e){
    console.log(e);
    Swal.fire('Error','No fue posible guardar el departamento','error');
  }
}
}
