import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export class ChartHeapMap {


    generateChar(data, chartDiv: string) {
        let chart = am4core.create(chartDiv, am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        // Add data
        chart.data = data;

        chart.maskBullets = false;
        return chart;
    }

    generateSerie(chart: am4charts.XYChart) {
        // Create series

        chart.maskBullets = false;

        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

        xAxis.dataFields.category = "x";
        yAxis.dataFields.category = "y";
        xAxis.renderer.minGridDistance = 40;

        xAxis.renderer.grid.template.disabled = true;
        yAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.axisFills.template.disabled = true;
        yAxis.renderer.axisFills.template.disabled = true;
        yAxis.renderer.ticks.template.disabled = true;
        xAxis.renderer.ticks.template.disabled = true;

        yAxis.renderer.inversed = true;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "x";
        series.dataFields.categoryY = "y";
        series.dataFields.value = "value";
        series.sequencedInterpolation = true;
        series.columns.template.disabled = true;
        series.defaultState.transitionDuration = 3000;
        
        // Set up column appearance
        /* let column = series.columns.template;
         column.strokeWidth = 2;
         column.strokeOpacity = 1;
         column.stroke = am4core.color("#ffffff");
         column.tooltipText = "{x}, {y}: {value.workingValue.formatNumber('#.')}";
         column.width = am4core.percent(50);
         column.height = am4core.percent(50);
         column.column.cornerRadius(60, 60, 60, 60);
         column.propertyFields.fill = "color";*/

        var bullet = series.bullets.push(new am4core.Circle());
        bullet.tooltipText = "{x}, {y}: {value.workingValue.formatNumber('#.')}";
        bullet.strokeWidth = 3;
        bullet.stroke = am4core.color("#ffffff");
        bullet.strokeOpacity = 0;
        bullet.propertyFields.fill = "color";


        bullet.adapter.add("tooltipY", function (tooltipY, target) {
            return -target.radius + 1;
        });

        series.heatRules.push({
            property: "radius",
            target: bullet,
            min: 2,
            max: 40
        });

        bullet.hiddenState.properties.scale = 0.01;
        bullet.hiddenState.properties.opacity = 1;

        var hoverState = bullet.states.create("hover");
        hoverState.properties.strokeOpacity = 1;

    }

}