import { Component, OnInit, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartBar } from '../../../classes/ChartBar';
import { Maquina } from '../../../models/maquina';
import { MaquinaService } from '../../../services/maquina.service';
import { ChartPie } from '../../../classes/ChartPie';
import { DatePipe } from '@angular/common';
import { GraficaService} from '../../../services/grafica.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {


  chart1;
  dataChart1;

  @Input() chartData;

  constructor() { }

  ngOnInit() {
    this.dataChart1 = this.chartData;
    this.chart1 = am4core.create("chartdiv1", am4charts.PieChart);
    this.chart1.data = this.dataChart1;
    let pieSeries = this.chart1['series'].push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "text";
  }

}
