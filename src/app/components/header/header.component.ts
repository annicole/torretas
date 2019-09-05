import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  urlImg:string;
  constructor() { }

  ngOnInit() {
    this.urlImg = "../../../assets/img/ICMA_AUTOMATION-01.png";
  }

}
