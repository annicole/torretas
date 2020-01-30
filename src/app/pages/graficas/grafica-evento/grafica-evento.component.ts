import { Component, OnInit } from '@angular/core';
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

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.scss']
})
export class GraficaEventoComponent implements OnInit {
  private chart: am4charts.XYChart;
  maquinas: Maquina[];
  maxDate: string;
  minDate: string;
  validate: boolean = false;
  validateHour: boolean
  graficaForm: FormGroup;
  submitted = false;
  dataChart = [];
  dataChart1 = [];
  dataChart2 = [];
  chatFlag = false;
  showFilter: boolean = false;
  iconFilter: string = 'expand_less';
  areas: Area[];
  dataTimeLine = [];
  filterByMachine: boolean = true;

  constructor(
    private maquinaService: MaquinaService,
    private datePipe: DatePipe,
    private graficaService: GraficaService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private activate: ActivatedRoute, private auth: AuthService,
    private areaService: AreaService
  ) { }

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

  llenarGraficaTime() {

    this.dataTimeLine = [{
      "start": "2019-11-10 08:00",
      "end": "2019-11-10 17:00",
      "task": "Official workday"
    }, {
      "start": "2019-11-10 06:00",
      "end": "2019-11-10 11:00",
      "task": "Gathering requirements",
      "bulletf1": false
    }, {
      "start": "2019-11-10 11:30",
      "end": "2019-11-10 16:30",
      "task": "Development"
    }, {
      "start": "2019-11-10 16:00",
      "end": "2019-11-10 18:00",
      "task": "Producing specifications"
    }, {
      "start": "2019-11-10 13:00",
      "end": "2019-11-11 01:00",
      "task": "Testing",
      "bulletf2": false
    }, {
      "task": ""
    }].reverse();
  }

  async getDataGrafica() {
    try {
      let arreglo = [];
      let fechaI: string = this.graficaForm.value.fechaInicio + ' ' + this.graficaForm.value.horaInicio;
      let fechaF: string = this.graficaForm.value.fechaFin + ' ' + this.graficaForm.value.horaFin;
      this.dataChart = [];
      this.dataChart1 = [];
      this.dataChart2 = [];
      this.chatFlag = false;
      let value;
      let bandera;
      if (this.graficaForm.value.maquina != '') {
        value = this.graficaForm.value.maquina;
        bandera = '0';
      } else if (this.graficaForm.value.area != '') {
        value = this.graficaForm.value.area;
        bandera = '1';
      }

      let response = await this.graficaService.getGrafica(value, fechaI, fechaF, bandera, this.auth.token).toPromise();
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
          else if (key.substring(0, 2) === 'tp') {
            this.dataChart2.push({
              sensor: key,
              numEventos: arreglo[key.substring(2, key.length)]
            });
          }
        });
        this.chatFlag = true;
        this.llenarGraficaTime(); //quitar
        this.spinner.hide("mySpinner");
      } else {
        this.chatFlag = false;
        this.spinner.hide("mySpinner");
      }
    } catch (e) {
      console.log(e);
      this.spinner.hide("mySpinner");
      Swal.fire('Error', 'Error al obtener los datos para las gráficas', 'error');
    }
  }

  async getMaquinas() {
    try {
      let response = await this.maquinaService.getMaquinas("", "", this.auth.token).toPromise();
      if (response.code == 200) {
        this.maquinas = response.maquina;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getAreas() {
    try {
      let response = await this.areaService.getAreas("", this.auth.token).toPromise();
      if (response.code == 200) {
        this.areas = response.area;
      }
    } catch (e) {
      console.log(e);
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
      } else {
        controlFinal.setErrors(null);
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

  showSpinner() {
    const opt1: Spinner = {
      bdColor: "rgba(51,51,51,0.8)",
      size: "medium",
      color: "#fff",
      type: "square-jelly-box"
    };
    const opt2: Spinner = {
      bdColor: "rgba(100,149,237, .8)",
      size: "large",
      color: "white",
      type: "line-scale-party"
    };
    const opt3: Spinner = {
      bdColor: "rgba(156,220,145, .8)",
      size: "large",
      color: "white",
      type: "ball-clip-rotate-multiple"
    };

    this.spinner.show("mySpinner", opt1);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.iconFilter = (this.showFilter) ? 'expand_more' : 'expand_less';
  }

  filterTypeselected(type: boolean) {
    this.filterByMachine = type;
    const controlMaquina = this.graficaForm.controls['maquina'];
    const controlArea = this.graficaForm.controls['area'];
    if (type) {
      controlArea.setValidators(null);
      controlArea.setValue('');
      controlMaquina.setValidators([Validators.required]);
    } else {
      controlMaquina.setValue('');
      controlMaquina.setValidators(null);
      controlArea.setValidators([Validators.required]);
    }
    controlMaquina.updateValueAndValidity();
    controlArea.updateValueAndValidity();
  }
}
