import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

import { ChartBar } from '@app/classes/ChartBar';
import { Maquina } from '@app/models/maquina';
import { MaquinaService } from '@app/services/maquina.service';
import { ChartPie } from '@app/classes/ChartPie';
import { DatePipe } from '@angular/common';
import { GraficaService } from '@app/services/grafica.service';
import { AplicacionService } from '@app/services/aplicacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

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
  fechaInicio;
  fechaFin;
  horaInicio;
  horaFin;
  validate: boolean = false;
  validateHour: boolean
  maquina: string;
  graficaForm: FormGroup;
  submitted = false;
  dataChart = [];
  dataChart1 = [];
  dataChart2 = [];
  chatFlag = false;
  showFilter: boolean = false;
  iconFilter: string = 'expand_less';

  constructor(
    private zone: NgZone,
    private maquinaService: MaquinaService,
    private datePipe: DatePipe,
    private graficaService: GraficaService,
    private aplicacionService: AplicacionService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private activate:ActivatedRoute
  ) { }

  ngOnInit() {
    this.graficaForm = this.formBuilder.group({
      maquina: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    }, { validators: [this.ValidDate('fechaInicio', 'fechaFin'),this.ValidDate('horaInicio', 'horaFin') ]});
    if (this.activate.snapshot.paramMap.get('idMaquina') != '0'){
      this.maquina = this.activate.snapshot.paramMap.get('idMaquina');
    }
    this.getMaquinas();
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  async getDataGrafica() {
    try {
      let arreglo = [];
      let fechaI: string = this.fechaInicio + ' ' + this.horaInicio;
      let fechaF: string = this.fechaFin + ' ' + this.horaFin;
      this.dataChart = [];
      this.dataChart1 = [];
      this.dataChart2 = [];
      this.chatFlag = false;
      let response = await this.graficaService.getGrafica(this.maquina, fechaI, fechaF).toPromise();
      if (response.code == 200) {
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
    let fechaI: string = this.fechaInicio + ' ' + this.horaInicio;
    let fechaF: string = this.fechaFin + ' ' + this.horaFin;
    localStorage.setItem('maquina', this.maquina);
    localStorage.setItem('fechaInicio', fechaI);
    localStorage.setItem('fechaFin', fechaF);
    localStorage.setItem('sensor',selected.substring(1, 2));
    window.open("http://localhost:4200/evento", "_blank");
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
    let fechaI: string = this.fechaInicio + ' ' + this.horaInicio;
    let fechaF: string = this.fechaFin + ' ' + this.horaFin;
    localStorage.setItem('maquina', this.maquina);
    localStorage.setItem('fechaInicio', fechaI);
    localStorage.setItem('fechaFin', fechaF);
    localStorage.setItem('sensor',selected.substring(1, 2));
    window.open("http://localhost:4200/evento", "_blank");
  }

  clickEventPie(ev) {
    let selected = ev.target.dataItem.dataContext;
    console.log(selected);
  }

  async getMaquinas() {
    try {
      let response = await this.maquinaService.getMaquinas("","").toPromise();
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

  fechaChanged() {
    this.minDate = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    this.fechaFin = "";
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
}
