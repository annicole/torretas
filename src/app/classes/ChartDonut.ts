import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export class ChartDonut {


    generateChartData(data, chartDiv: string) {

        let chart = am4core.create(chartDiv, am4charts.PieChart);
        chart.data = data;
        chart.responsive.enabled = true;

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.innerRadius = am4core.percent(50);
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;

        let rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;

        chart.legend = new am4charts.Legend();
        //chart.legend.position = "right";
        chart.legend.valign = "bottom";
        //chart.legend.maxHeight = 150;
        //chart.legend.maxWidth = 200;
        chart.legend.labels.template.maxWidth = 120;
        chart.legend.labels.template.wrap = true;
        let markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 15;
        markerTemplate.height = 15;
        //chart.legend.labels.template.text = "{name}";

        return chart;
    }
}