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

}
