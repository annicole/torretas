import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartBar } from '../../../classes/ChartBar';
import { Maquina } from '../../../models/maquina';
import { MaquinaService } from '../../../services/maquina.service';
import { ChartPie } from '../../../classes/ChartPie';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-evento',
  templateUrl: './grafica-evento.component.html',
  styleUrls: ['./grafica-evento.component.css']
})
export class GraficaEventoComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  private chart1;
  private chart2: am4charts.XYChart;
  private chartBar: ChartBar = new ChartBar();
  private chartPie: ChartPie = new ChartPie();
  maquinas: Maquina[];
  private maxDate;

  data = [{
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

  types = [{
    "country": "Lithuania",
    "litres": 501.9
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
  }];

  constructor(private zone: NgZone, private maquinaService: MaquinaService) { }

  ngOnInit() {
    this.getMaquinas();
    //  this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Add data

      this.llenarGraficaBarras();
      this.llenarGraficaPie();
      //this.chart2 = this.chartBar.createChart(data, "chartdiv2");

    });
  }

  llenarGraficaBarras() {
    this.chart = this.chartBar.generateChartData(this.data, "chartdiv");
    let serie = this.chartBar.generateSerie(this.chart);

    serie.columns.template.events.on("hit", this.clickEventBar, this);

    // Cursor
    this.chart.cursor = new am4charts.XYCursor();
  }

  clickEventBar(ev) {
    let selected = ev.target.dataItem.dataContext;
    console.log(selected);
  }

  llenarGraficaPie() {
    this.chart1 = am4core.create("chartdiv1", am4charts.PieChart);
    this.chart1.data = this.types;
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
      console.log(response);
      if (response.code == 200) {
        this.maquinas = response.maquina;
      }
    } catch (e) {
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
