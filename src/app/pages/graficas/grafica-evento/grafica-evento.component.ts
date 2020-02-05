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
  dataChart2 = [];
  chatFlag = false;
  dataTimeLine = [];
  dataDonut = [];
  dataLayared =[];

  constructor(
    @Inject(MaquinaService) maquinaService: MaquinaService,
    private datePipe: DatePipe,
    private graficaService: GraficaService,
    private formBuilder: FormBuilder,
    @Inject(NgxSpinnerService) spinner: NgxSpinnerService,
    private activate: ActivatedRoute, @Inject(AuthService) auth: AuthService,
    @Inject(AreaService)areaService: AreaService
  ) { 
    super(areaService,maquinaService,auth,spinner);
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
    this.llenarGraficaDonut();
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

  llenarGraficaDonut() {
    this.dataDonut = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
    }, {
      "country": "The Netherlands",
      "litres": 50
    }];

    this.dataLayared = [{
      "country": "USA",
      "year2004": 3.5,
      "year2005": 4.2
  }, {
      "country": "UK",
      "year2004": 1.7,
      "year2005": 3.1
  }, {
      "country": "Canada",
      "year2004": 2.8,
      "year2005": 2.9
  }, {
      "country": "Japan",
      "year2004": 2.6,
      "year2005": 2.3
  }, {
      "country": "France",
      "year2004": 1.4,
      "year2005": 2.1
  }, {
      "country": "Brazil",
      "year2004": 2.6,
      "year2005": 4.9
  }];
  
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

}
