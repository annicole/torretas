import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  form: FormGroup;
  total: number = 0;
  urlMidas:string;
  urlOperando:string;
  urlParo:string;
  urlIngenieria:string;
  urlMantenimiento:string;
  urlCalidad:string;
  urlProduccion:string;
  urlMateriales:string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.urlMidas = "../../../assets/img/MIDAS.jpg";
    this.urlOperando = "../../../assets/img/OPERANDO.jpg";
    this.urlParo = "../../../assets/img/PARO.jpg";
    this.urlIngenieria = "../../../assets/img/INGENIERIA.jpg";
    this.urlMantenimiento = "../../../assets/img/MANTENIMIENTO.jpg";
    this.urlProduccion = "../../../assets/img/PRODUCCION.jpg";
    this.urlCalidad = "../../../assets/img/CALIDAD.jpg";
    this.urlMateriales = "../../../assets/img/MATERIALES.jpg";

  }



  /*
function update_values(temp1, temp2, volts){
  $("#display_temp1").html(temp1);
  $("#display_temp2").html(temp2);
  $("#display_volt").html(volts);
}

function process_msg(topic, message){
  // ej: "10,11,12"
  if (topic == "values"){
    var msg = message.toString();
    var sp = msg.split(",");
    var temp1 = sp[0];
    var temp2 = sp[1];
    var volts = sp[2];
    update_values(temp1,temp2,volts);
  }
}

function process_led1(){
  if ($('#input_led1').is(":checked")){
    console.log("Encendido");

    client.publish('led1', 'on', (error) => {
      console.log(error || 'Mensaje enviado!!!')
    })
  }else{
    console.log("Apagado");
    client.publish('led1', 'off', (error) => {
      console.log(error || 'Mensaje enviado!!!')
    })
  }
}

process_led2(){
  if ($('#input_led2').is(":checked")){
    console.log("Encendido");

    client.publish('led2', 'on', (error) => {
      console.log(error || 'Mensaje enviado!!!')
    })
  }else{
    console.log("Apagado");
    client.publish('led2', 'off', (error) => {
      console.log(error || 'Mensaje enviado!!!')
    })
  }
}
*/

}
