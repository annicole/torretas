import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

import { ChartBar } from '@app/classes/ChartBar';
import { Maquina } from '@app/models/maquina';
import { Area } from '@app/models/area';
import { MaquinaService } from '@app/services/maquina.service';
import { AreaService } from '@app/services/area.service';
import { ChartPie } from '@app/classes/ChartPie';
import { DatePipe } from '@angular/common';
import { GraficaService } from '@app/services/grafica.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '@app/services/auth.service';
import * as ruta from '@app/classes/Ruta';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.css']
})
export class GraficaEventoComponent implements OnInit, OnDestroy {
  private chart: am4charts.XYChart;
  private chart1: am4charts.PieChart;
  private chart2: am4charts.XYChart;
  private chartBar: ChartBar = new ChartBar();
  private chartPie: ChartPie = new ChartPie();
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
    private zone: NgZone,
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
    if (this.activate.snapshot.paramMap.get('idMaquina') != '0') {
      this.graficaForm.value.maquina = this.activate.snapshot.paramMap.get('idMaquina');
    }
    //this.getMaquinas();
    //this.getAreas();
    //this.graficaForm.get('maquina').setValidators([Validators.required]);
    this.llenarGraficaTime();
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  llenarGraficaTime() {
    let open = 100;
    let close = 120;

    let names = ["Raina",
      "Demarcus",
      "Carlo",
      "Jacinda",
      "Richie",
      "Antony",
      "Amada",
      "Idalia",
      "Janella",
      "Marla",
      "Curtis",
      "Shellie",
      "Meggan",
      "Nathanael",
      "Jannette",
      "Tyrell",
      "Sheena",
      "Maranda",
      "Briana",
      "Rosa",
      "Rosanne",
      "Herman",
      "Wayne",
      "Shamika",
      "Suk",
      "Clair",
      "Olivia",
      "Hans",
      "Glennie",
    ];

    for (var i = 0; i < names.length; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
      close = open + Math.round(Math.random() * 10) + 3;
      this.dataTimeLine.push({ category: names[i], open: open, close: close });
    }
    this.chatFlag = true;
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
        console.log(response);
        arreglo = response.grafica[0];
        Object.keys(arreglo).forEach(key => {
          if (key.substring(0, 1) === 'e') {
            this.dataChart.push({
              sensor: key,
              numEventos: arreglo[key]
            });
          } else if (key.substring(0, 2) === 'te') {
            this.dataChart1.push({
              sensor: key,
              numEventos: arreglo[key]
            });
          }
          else if (key.substring(0, 2) === 'tp') {
            this.dataChart2.push({
              sensor: key,
              numEventos: arreglo[key]
            });
          }
        });
        this.chatFlag = true;
        this.llenarGraficaBarras();
        this.llenarGraficaBarras2();
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

  llenarGraficaBarras() {
    this.chart = this.chartBar.generateChartData(this.dataChart, "chartdiv");
    let serie = null;
    serie = this.chartBar.generateSerie(this.chart);
    serie.columns.template.events.on("hit", this.clickEventBar, this);
    // Cursor
    this.chart.cursor = new am4charts.XYCursor();
  }

  clickEventBar(ev) {
    let selected = ev.target.dataItem.dataContext.sensor;
    let fechaI: string = this.graficaForm.value.fechaInicio + ' ' + this.graficaForm.value.horaInicio;
    let fechaF: string = this.graficaForm.value.fechaFin + ' ' + this.graficaForm.value.horaFin;
    localStorage.setItem('maquina', this.graficaForm.value.maquina);
    localStorage.setItem('fechaInicio', fechaI);
    localStorage.setItem('fechaFin', fechaF);
    localStorage.setItem('sensor', selected.substring(1, 2));
    window.open(ruta.ruta + "/evento", "_blank");
  }

  llenarGraficaBarras2() {
    this.chart2 = this.chartBar.generateChartData(this.dataChart2, "chartdiv2");
    let serie = null;
    serie = this.chartBar.generateSerie(this.chart2);
    serie.columns.template.events.on("hit", this.clickEventBar2, this);
    // Cursor
    this.chart2.cursor = new am4charts.XYCursor();
  }

  clickEventBar2(ev) {
    let selected = ev.target.dataItem.dataContext.sensor;
    let fechaI: string = this.graficaForm.value.fechaInicio + ' ' + this.graficaForm.value.horaInicio;
    let fechaF: string = this.graficaForm.value.fechaFin + ' ' + this.graficaForm.value.horaFin;
    localStorage.setItem('maquina', this.graficaForm.value.maquina);
    localStorage.setItem('fechaInicio', fechaI);
    localStorage.setItem('fechaFin', fechaF);
    localStorage.setItem('sensor', selected.substring(2, 3));
    window.open(ruta.ruta + "/evento", "_blank");
  }

  clickEventPie(ev) {
    let selected = ev.target.dataItem.dataContext;
    console.log(selected);
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

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
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
    this.graficaForm.controls['fechaFins'].setValue('');
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
    /* let fechaI: string = this.fechaInicio + ' ' + this.horaInicio;
     let fechaF: string = this.fechaFin + ' ' + this.horaFin;
     console.log("hora",this.horaInicio, ' ',this.horaFin);
     console.log(fechaI,fechaF);
     localStorage.setItem('maquina', this.maquina);
     localStorage.setItem('fechaInicio', fechaI);
     localStorage.setItem('fechaFin', fechaF);
     localStorage.setItem('sensor','1');
     window.open("http://localhost:4200/evento", "_blank");*/
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
