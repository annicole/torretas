import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ChartBar} from '../../../classes/ChartBar';
import {Maquina} from '../../../models/maquina';
import {MaquinaService} from '../../../services/maquina.service';


am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.css']
})
export class GraficaEventoComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  private chart1: am4charts.XYChart;
  private chart2: am4charts.XYChart;
  private chartBar:ChartBar;
  maquinas:Maquina[];
  private maxDate;

  constructor(private zone: NgZone,private maquinaService:MaquinaService) { }

  ngOnInit() {
    this.getMaquinas();
  //  this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      this.chartBar = new ChartBar();
      // Add data
      let data = [{
        "country": "USA",
        "visits": 3025
      }, {
        "country": "China",
        "visits": 1882
      }, {
        "country": "Japan",
        "visits": 1809
      }, {
        "country": "Germany",
        "visits": 1322
      }, {
        "country": "UK",
        "visits": 1122
      }, {
        "country": "France",
        "visits": 1114
      }, {
        "country": "India",
        "visits": 984
      }, {
        "country": "Spain",
        "visits": 711
      }];

      this.chart = this.chartBar.createChart(data,"chartdiv");
      this.chart1 = this.chartBar.createChart(data,"chartdiv1");
      this.chart2 = this.chartBar.createChart(data,"chartdiv2");

    });
  }

  async getMaquinas(){
    try{
      let response= await this.maquinaService.getMaquinas().toPromise();
      console.log(response);
        if(response.code == 200){
          this.maquinas = response.maquina;
        } 
    }catch(e){
      console.log(e);
    }
  } 
  
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }



}
