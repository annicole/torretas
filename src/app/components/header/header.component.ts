import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '@app/services/maquina.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  urlImg:string;
  chartPage:number = 0;
  constructor(private maquinaService: MaquinaService) { }

  ngOnInit() {
    this.urlImg = "../../../assets/img/ICMA_AUTOMATION-01.png";
    this.maquinaService.chartPage.subscribe((page: number) => this.chartPage = page);
  }

}
