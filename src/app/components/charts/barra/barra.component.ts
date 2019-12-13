import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartBar } from '@app/classes/ChartBar';
import * as ruta from '@app/classes/Ruta';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  private chartBar: ChartBar = new ChartBar();
  chart;
  dataChart;

  @Input() chartData;
  @Input() fechaInicio;
  @Input() horaInicio;
  @Input() horaFin;
  @Input() fechaFin;
  @Input() maquina;

  constructor() { }

  ngOnInit() {
    this.llenarGrafica();
    console.log("entra", this.chartData);
  }

  llenarGrafica() {
    this.dataChart = this.chartData;
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
    localStorage.setItem('sensor',selected.substring(2, 3));
    window.open(ruta.ruta+"/evento", "_blank");
    
  }

}
