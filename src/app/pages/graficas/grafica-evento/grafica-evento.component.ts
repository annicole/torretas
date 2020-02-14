import { Component, OnInit, Inject } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

import { Maquina } from '@app/models/maquina';
import { Area } from '@app/models/area';
import { MaquinaService } from '@app/services/maquina.service';
import { AreaService } from '@app/services/area.service';
import { DatePipe } from '@angular/common';
import { GraficaService } from '@app/services/grafica.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '@app/services/auth.service';
import { COLORS_CHART } from '@app/classes/Color';
import { ClassChart } from '@app/classes/ClassChart';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.scss']
})
export class GraficaEventoComponent extends ClassChart implements OnInit {
  maxDate: string;
  minDate: string;
  validate: boolean = false;
  validateHour: boolean
  dataChart = [];
  dataChart1 = [];
  chatFlag = false;
  chatFlagDonut = false;
  dataTimeLine = [];
  dataDonut = [];
  dataDonut2 = [];
  dataLayared = [];

  constructor(
    @Inject(MaquinaService) maquinaService: MaquinaService,
    private datePipe: DatePipe,
    private graficaService: GraficaService,
    private formBuilder: FormBuilder,
    @Inject(NgxSpinnerService) spinner: NgxSpinnerService,
    private activate: ActivatedRoute, @Inject(AuthService) auth: AuthService,
    @Inject(AreaService) areaService: AreaService
  ) {
    super(areaService, maquinaService, auth, spinner);
  }

  ngOnInit() {
    this.graficaForm = this.formBuilder.group({
      maquina: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      area: ['']
    }, { validators: [this.ValidDate('fechaInicio', 'fechaFin'), this.ValidDate('horaInicio', 'horaFin')] });
    this.getMaquinas();
    this.getAreas();
    this.graficaForm.get('maquina').setValidators([Validators.required]);
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (this.activate.snapshot.paramMap.get('idMaquina') != '0') {
      this.graficaForm.controls['maquina'].setValue(this.activate.snapshot.paramMap.get('idMaquina'));
    }
  }

  async getDataGrafica() {
    let arreglo = [];
    let fechaI: string = this.graficaForm.value.fechaInicio + ' ' + this.graficaForm.value.horaInicio;
    let fechaF: string = this.graficaForm.value.fechaFin + ' ' + this.graficaForm.value.horaFin;
    this.dataChart = [];
    this.dataChart1 = [];
    this.chatFlag = false;
    let value;
    let bandera;
    this.dataDonut = [];
    let response;
    try {
      if (this.graficaForm.value.maquina != '') {
        value = this.graficaForm.value.maquina;
        bandera = '0';
      } else if (this.graficaForm.value.area != '') {
        value = this.graficaForm.value.area;
        bandera = '1';
      }
      response = await this.graficaService.getGrafica(value, fechaI, fechaF, bandera, this.auth.token).toPromise();
      if (response.code == 200) {
        arreglo = response.grafica[0];
        Object.keys(arreglo).forEach(key => {
          if (['Operando', 'En_Paro', 'Stand_by', 'Servicio', 'Materiales', 'Ingenieria', 'Produccion', 'Calidad'].indexOf(key) >= 0) {
            this.dataChart.push({
              sensor: key,
              numEventos: arreglo[key],
              color: COLORS_CHART[key]
            });
          } else if (key.substring(0, 2) === 'te') {
            let keyValue = key.substring(2, key.length);
            this.dataChart1.push({
              sensor: keyValue,
              numEventos: arreglo[key],
              color: COLORS_CHART[keyValue]
            });
          }
         /* else if (key.substring(0, 2) === 'tp') {
            this.dataChart2.push({
              sensor: key,
              numEventos: arreglo[key.substring(2, key.length)]
            });
          }*/
        });
        this.chatFlag = true;
      } else {
        this.chatFlag = false;
      }

      //Donut 
      let responseDonut = await this.graficaService.getGraficaAnillo(value, fechaI, fechaF, bandera, this.auth.token).toPromise();
      arreglo = responseDonut.grafica[0];
      Object.keys(arreglo).forEach(key => {
        if (key.substring(0, 2) === 'te') {
          let keyValue = key.substring(2, key.length);
          this.dataDonut.push({
            sensor: keyValue,
            numEventos: arreglo[key],
            color: COLORS_CHART[keyValue]
          });
          this.dataDonut2.push({
            sensor: keyValue,
            numEventos: arreglo[key],
            color: COLORS_CHART[keyValue]
          });
        } else if (key === 'no_reportado') {
          this.dataDonut2.push({
            sensor: key,
            numEventos: arreglo[key],
            color: COLORS_CHART[key]
          })
        }
      });
      this.chatFlagDonut = true;

      //Layered
      response = await this.graficaService.getSobrepuesta(value, fechaI, fechaF, bandera, this.auth.token).toPromise();
      arreglo = response.grafica[0];
      Object.keys(arreglo).forEach(key => {
        if (key.substring(0, 2) === 'te') {
          let keyValue = key.substring(2, key.length);
          this.dataLayared.push({
            sensor: keyValue,
            numEventos: arreglo[key],
            color: COLORS_CHART[keyValue]
          });
        }
      });

      this.spinner.hide("mySpinner");
    } catch (e) {
      console.log(e.status);
      this.spinner.hide("mySpinner");
      Swal.fire('Error', 'Error al obtener los datos para las gráficas', 'error');
    }
  }

  fechaChanged() {
    this.minDate = this.datePipe.transform(this.graficaForm.value.fechaInicio, 'yyyy-MM-dd');
    this.graficaForm.controls['fechaFin'].setValue('');
  }

  ValidDate(inicio: string, final: string) {
    return (formGroup: FormGroup) => {
      const controlInicio = formGroup.controls[inicio];
      const controlFinal = formGroup.controls[final];
      if (controlFinal.errors && !controlFinal.errors.mustMatch) {
        return;
      }
      if (controlFinal.value < controlInicio.value) {
        controlFinal.setErrors({ mustMatch: true });
      }
    }
  }

  get f() { return this.graficaForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.graficaForm.invalid) {
      return;
    } else {
      this.filtrar();
    }
  }

  filtrar() {
    this.showSpinner();
    this.getDataGrafica();
  }

}
