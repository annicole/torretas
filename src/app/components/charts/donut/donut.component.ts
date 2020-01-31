import { Component, OnInit, Input } from '@angular/core';
import { ChartDonut } from '@app/classes/ChartDonut';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.css']
})
export class DonutComponent implements OnInit {
  private charDonut: ChartDonut = new ChartDonut();
  chart;
  dataChart;
  @Input() divInput: string;
  @Input() chartData;

  constructor() { }

  ngOnInit() {

    this.dataChart = this.chartData;
    this.chart = this.charDonut.generateChartData(this.dataChart, "chartDonut");
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

}
