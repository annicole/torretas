import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartBar } from '../../../classes/ChartBar';
import { Maquina } from '../../../models/maquina';
import { MaquinaService } from '../../../services/maquina.service';
import { ChartPie } from '../../../classes/ChartPie';
import { DatePipe } from '@angular/common';
import { GraficaService } from '../../../services/grafica.service';
import { AplicacionService } from '../../../services/aplicacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.css']
})
export class GraficaEventoComponent implements OnInit, AfterViewInit, OnDestroy {
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
  maquina: number;
  graficaForm: FormGroup;
  submitted = false;
  dataChart = [];
  dataChart1 = [];
  dataChart2 = [];
  constructor(private zone: NgZone, private maquinaService: MaquinaService, private datePipe: DatePipe,
    private graficaService: GraficaService, private aplicacionService: AplicacionService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.graficaForm = this.formBuilder.group({
      maquina: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    },{validator: this.ValidDate('fechaInicio','fechaFin')});
    this.getMaquinas();
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngAfterViewInit() {
    this.getDataGrafica();
  }

  async getDataGrafica() {
    try {
      let arreglo = [];
      let response = await this.graficaService.getGrafica("-1", "2019-06-13 13:47:21", "2019-06-13 13:47:23").toPromise();
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
            })
          }
          else if (key.substring(0, 2) === 'tp') {
            this.dataChart2.push({
              sensor: key,
              numEventos: arreglo[key]
            })
          }
        });
        this.llenarGraficaBarras();
        this.llenarGraficaBarras2();
        this.llenarGraficaPie();
      }
    } catch (e) {
      console.log(e);
    }
  }

  llenarGraficaBarras() {
    this.chart = this.chartBar.generateChartData(this.dataChart, "chartdiv");
    let serie = this.chartBar.generateSerie(this.chart);

    serie.columns.template.events.on("hit", this.clickEventBar, this);

    // Cursor
    this.chart.cursor = new am4charts.XYCursor();
  }

  clickEventBar(ev) {
    let selected = ev.target.dataItem.dataContext;
    console.log(selected);
    this.aplicacionService.sensor = selected.sensor;
    this.aplicacionService.idMaqina = 1;
    console.log(this.aplicacionService.sensor, this.aplicacionService.idMaqina);
    window.open("http://localhost:4200/evento", "_blank");
  }

  llenarGraficaBarras2() {
    this.chart2 = this.chartBar.generateChartData(this.dataChart2, "chartdiv2");
    let serie = this.chartBar.generateSerie(this.chart2);

    serie.columns.template.events.on("hit", this.clickEventBar2, this);

    // Cursor
    this.chart2.cursor = new am4charts.XYCursor();
  }

  clickEventBar2(ev) {
    let selected = ev.target.dataItem.dataContext;
  }

  llenarGraficaPie() {
    this.chart1 = am4core.create("chartdiv1", am4charts.PieChart);
    this.chart1.data = this.dataChart1;
    let serie = this.chartPie.generateSeries(this.chart1);

    serie.slices.template.events.on("hit", this.clickEventPie, this);
  }

  clickEventPie(ev) {
    let selected = ev.target.dataItem.dataContext;
    console.log(selected);
  }

  async getMaquinas() {
    try {
      let response = await this.maquinaService.getMaquinas().toPromise();
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
    console.log(this.fechaInicio);
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
    console.log("filtrar");
  }
}
