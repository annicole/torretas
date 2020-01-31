import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from '@amcharts/amcharts4/core';

export class ChartLayed {

    generateChartData(data, chartDiv: string) {
        let chart = am4core.create(chartDiv, am4charts.XYChart);

        // Add percent sign to all numbers
        chart.numberFormatter.numberFormat = "#.#'%'";

        chart.data = data;
        chart.responsive.enabled = true;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "country";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "GDP growth rate";
        //valueAxis.title.fontSize = 25;

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "year2004";
        series.dataFields.categoryX = "country";
        series.clustered = false;
        series.tooltipText = "GDP grow in {categoryX} (2004): [bold]{valueY}[/]";

        let series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = "year2005";
        series2.dataFields.categoryX = "country";
        series2.clustered = false;
        series2.columns.template.width = am4core.percent(50);
        series2.tooltipText = "GDP grow in {categoryX} (2005): [bold]{valueY}[/]";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;

        return chart;
    }
}