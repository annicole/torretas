import { Component, OnInit } from '@angular/core';
import{ MaquinaService} from '../../../services/maquina.service';
import{ SensorService} from '../../../services/sensor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{Maquina} from '../../../models/maquina';
import{Sensor} from '../../../models/sensor';
import Swal from 'sweetalert2';
import {Color} from '../../../models/color';
import{ ColorService} from '../../../services/color.service';

@Component({
  selector: 'app-nuevo-sensor',
  templateUrl: './nuevo-sensor.component.html',
  styleUrls: ['./nuevo-sensor.component.css']
})
export class NuevoSensorComponent implements OnInit {

  sensor:Sensor = new Sensor();
  sensorForm : FormGroup;
  submitted = false;
  maquinas:Maquina[];
  colores:Color[];
  constructor(private maquinaService:MaquinaService,private sensorService:SensorService,
               private formBuilder: FormBuilder,private colorService:ColorService) { }

  ngOnInit() {
    this.sensorForm = this.formBuilder.group({
      sensor: ['' , Validators.required],
      idmaquina: ['' , Validators.required],
      color:['',Validators.required],
      intermitente:['',Validators.required],
      tipo:['',Validators.required]
    }); 
    this.getAreas();
    this.getColores();
  }

  async getColores(){
    try{
      let resp = await this.colorService.getColors().toPromise();
    if(resp.code == 200)
       {
       this.colores = resp.color;
     }
    }catch(e){
      console.log(e);
    }
  }

  async getAreas(){
      try{
        let resp = await this.maquinaService.getMaquinas().toPromise();
        console.log(resp);
      if(resp.code == 200)
         {
         this.maquinas = resp.maquina;
         console.log(resp);
       }
      }catch(e){
        console.log(e);
      }
  }

  get f() { return this.sensorForm.controls; }

  onSubmit(){
    this.submitted = true;    
    if(this.sensorForm.invalid){      
      return;
    } else {
      this.guardar();
    }    
  } 

  async guardar(){
    try{
      let response = await this.sensorService.create(this.sensor).toPromise();
      if(response.code = 200){
        Swal.fire('','Sensor guardado correctamente','success');
      } 
      else {
       Swal.fire('Error','No fue posible guardar el sensor','error');
      } 
    }catch(e){
      Swal.fire('Error','No fue posible guardar el sensor','error');
    }
  }

}
