import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

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

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      let chart1 = am4core.create("chartdiv1", am4charts.XYChart);
      let chart2 = am4core.create("chartdiv2", am4charts.XYChart);
      chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      chart.data = [{
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


      chart1.data = [{
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



      chart2.data = [{
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


      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 270;
      categoryAxis.tooltip.disabled = true;
      categoryAxis.renderer.minHeight = 110;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.minWidth = 50;

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueY = "visits";
      series.dataFields.categoryX = "country";
      series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series.columns.template.strokeWidth = 0;

      series.tooltip.pointerOrientation = "vertical";

      series.columns.template.column.cornerRadiusTopLeft = 10;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let hoverState = series.columns.template.column.states.create("hover");
      hoverState.properties.cornerRadiusTopLeft = 0;
      hoverState.properties.cornerRadiusTopRight = 0;
      hoverState.properties.fillOpacity = 1;

      series.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;


      // Chart 1 example


      let categoryAxis1 = chart1.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis1.dataFields.category = "country";
      categoryAxis1.renderer.grid.template.location = 0;
      categoryAxis1.renderer.minGridDistance = 30;
      categoryAxis1.renderer.labels.template.horizontalCenter = "right";
      categoryAxis1.renderer.labels.template.verticalCenter = "middle";
      categoryAxis1.renderer.labels.template.rotation = 270;
      categoryAxis1.tooltip.disabled = true;
      categoryAxis1.renderer.minHeight = 110;

      let valueAxis1 = chart1.yAxes.push(new am4charts.ValueAxis());
      valueAxis1.renderer.minWidth = 50;

      // Create series
      let series1 = chart1.series.push(new am4charts.ColumnSeries());
      series1.sequencedInterpolation = true;
      series1.dataFields.valueY = "visits";
      series1.dataFields.categoryX = "country";
      series1.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series1.columns.template.strokeWidth = 0;

      series1.tooltip.pointerOrientation = "vertical";

      series1.columns.template.column.cornerRadiusTopLeft = 10;
      series1.columns.template.column.cornerRadiusTopRight = 10;
      series1.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let hoverState1 = series1.columns.template.column.states.create("hover");
      hoverState1.properties.cornerRadiusTopLeft = 0;
      hoverState1.properties.cornerRadiusTopRight = 0;
      hoverState1.properties.fillOpacity = 1;

      series1.columns.template.adapter.add("fill", function (fill, target) {
        return chart1.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      chart1.cursor = new am4charts.XYCursor();

      this.chart1 = chart1;


      //Chart 2 example



      let categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis2.dataFields.category = "country";
      categoryAxis2.renderer.grid.template.location = 0;
      categoryAxis2.renderer.minGridDistance = 30;
      categoryAxis2.renderer.labels.template.horizontalCenter = "right";
      categoryAxis2.renderer.labels.template.verticalCenter = "middle";
      categoryAxis2.renderer.labels.template.rotation = 270;
      categoryAxis2.tooltip.disabled = true;
      categoryAxis2.renderer.minHeight = 110;

      let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.renderer.minWidth = 50;

      // Create series
      let series2 = chart2.series.push(new am4charts.ColumnSeries());
      series2.sequencedInterpolation = true;
      series2.dataFields.valueY = "visits";
      series2.dataFields.categoryX = "country";
      series2.tooltipText = "[{categoryX}: bold]{valueY}[/]";
      series2.columns.template.strokeWidth = 0;

      series2.tooltip.pointerOrientation = "vertical";

      series2.columns.template.column.cornerRadiusTopLeft = 10;
      series2.columns.template.column.cornerRadiusTopRight = 10;
      series2.columns.template.column.fillOpacity = 0.8;

      // on hover, make corner radiuses bigger
      let hoverState2 = series2.columns.template.column.states.create("hover");
      hoverState2.properties.cornerRadiusTopLeft = 0;
      hoverState2.properties.cornerRadiusTopRight = 0;
      hoverState2.properties.fillOpacity = 1;

      series2.columns.template.adapter.add("fill", function (fill, target) {
        return chart2.colors.getIndex(target.dataItem.index);
      });

      // Cursor
      chart2.cursor = new am4charts.XYCursor();

      this.chart2 = chart2;


    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }



}
