import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartBar } from '../../../classes/ChartBar';
import { Maquina } from '../../../models/maquina';
import { MaquinaService } from '../../../services/maquina.service';
import { ChartPie } from '../../../classes/ChartPie';
import { DatePipe } from '@angular/common';
import { GraficaService} from '../../../services/grafica.service';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.css']
})
export class GraficaEventoComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  private chart1 : am4charts.PieChart;
  private chart2: am4charts.XYChart;
  private chartBar: ChartBar = new ChartBar();
  private chartPie: ChartPie = new ChartPie();
  maquinas: Maquina[];
  maxDate:string;
  minDate:string;
  fechaInicio:Date;
  fechaFin:Date;
  horaInicio;
  horaFin;
  validDate:boolean=false;
  
  dataChart1 = [];
  chatFlag = false;

  constructor(private zone: NgZone, private maquinaService: MaquinaService,private datePipe:DatePipe,
              private graficaService:GraficaService) { }

  ngOnInit() {
    this.getMaquinas();
    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getDataGrafica();
    
  }

  ngAfterViewInit() {
      // Add data
//      this.getDataGrafica();
      //this.llenarGraficaBarras();
      //this.llenarGraficaPie();
  }

  async getDataGrafica(){
    try{
      console.log("getDataGrafica");
      let arreglo=[];
      let response = await this.graficaService.getGrafica("-1","2019-06-13 13:47:21","2019-06-13 13:47:23").toPromise();
      if(response.code==200){
        arreglo = response.grafica[0];
        Object.keys(arreglo).forEach(key=>{
          if( key.substring(0,1)==='e'){
            this.dataChart1.push({
              sensor: key,
              numEventos: arreglo[key]
            });
          }
      });
      this.chatFlag = true;      
        //this.llenarGraficaPie();
      }
    }catch(e){
      console.log(e);
    }
  }



  llenarGraficaBarras() {
    this.chart = this.chartBar.generateChartData(this.dataChart1, "chartdiv");
    let serie = this.chartBar.generateSerie(this.chart);

    serie.columns.template.events.on("hit", this.clickEventBar, this);

    // Cursor
    this.chart.cursor = new am4charts.XYCursor();
  }

  clickEventBar(ev) {
    let selected = ev.target.dataItem.dataContext;
    console.log(selected);
  }

  //llenarGraficaPie() {
    //this.chart1 = am4core.create("chartdiv1", am4charts.PieChart);
    //console.log("llenarGraficaPie",this.dataChart1);
    //this.chart1.data = this.dataChart1;
    //let serie = this.chartPie.generateSeries(this.chart1)

    //pieSeries.slices.template.events.on("hit", this.clickEventPie, this);
  //}

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

  fechaChanged(){
    this.minDate = this.datePipe.transform(this.fechaInicio, 'yyyy-MM-dd');
    console.log(this.fechaInicio);
  }

  fechaFinChanged(){
    if (  this.fechaFin < this.fechaInicio) {
     this. validDate = true;
    }
    console.log(this.fechaFin);
  }

  horaInicioChanged(){
    
    console.log(this.horaInicio);
  }

  horaFinChanged(){
    console.log(this.horaFin);
  }
}
