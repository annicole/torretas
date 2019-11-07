import { Component, OnInit } from '@angular/core';
import { GraficaService } from '@app/services/grafica.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaquinaService } from '@app/services/maquina.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { AreaService } from '@app/services/area.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '@app/services/auth.service';
import { Maquina } from '@app/models/maquina';
import { Area } from '@app/models/area';
import { ChartHeapMap } from '@app/classes/ChartHeapMap';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-grafica-sensor',
  templateUrl: './grafica-sensor.component.html',
  styleUrls: ['./grafica-sensor.component.css']
})
export class GraficaSensorComponent implements OnInit {

  areas: Area[];
  maquinas: Maquina[];
  private chart: am4charts.XYChart;
  private chartHeap:ChartHeapMap = new ChartHeapMap();
  dataChart=[];
  colors;

  graficaForm: FormGroup;
  constructor(
    private maquinaService: MaquinaService,
    private graficaService: GraficaService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private activate: ActivatedRoute, private auth: AuthService,
    private areaService: AreaService
  ) { }

  ngOnInit() {
    this.graficaForm = this.formBuilder.group({
      maquina: ['', Validators.required],
      area:['']
    });
    if (this.activate.snapshot.paramMap.get('idMaquina') != '0') {
      this.graficaForm.value.maquina = this.activate.snapshot.paramMap.get('idMaquina');
    }
    this.getMaquinas();
    this.getAreas();
    this.llenarGrafica();
  }

  async getMaquinas() {
    try {
      let response = await this.maquinaService.getMaquinas("", "", this.auth.token).toPromise();
      if (response.code == 200) {
        this.maquinas = response.maquina;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getAreas() {
    try {
      let response = await this.areaService.getAreas("",this.auth.token).toPromise();
      if (response.code == 200) {
        this.areas = response.area;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getDatosGrafica(){
    try {
      let arreglo;
      let tipo:string="";
      let id;
      if (this.graficaForm.value.maquina != '') {
        id = this.graficaForm.value.maquina;
        tipo = '0';
      } else if (this.graficaForm.value.area != '') {
        id = this.graficaForm.value.area;
        tipo = '1';
      }else{
        id="-1";
      }
      let response = await this.graficaService.getGraficaEstadoR(id,tipo,this.auth.token).toPromise();
      if (response.code == 200) {
        arreglo = response.grafica;
       // console.log( arreglo);
        arreglo.forEach( (element) => {
          Object.keys(element).forEach(key => {
            let maquina = element[0];
            if (key.substring(0, 3) === 'edo') {
              this.dataChart.push({
                sensor: key,
                maquina: maquina,
                estado: element[key]
              });
            }
          });
      });
      console.log(this.dataChart);
    }
    } catch (e) {
      console.log(e);
    }
  }

  llenarGrafica(){
   

    this.chart = this.chartHeap.generateChar(null,"chartdiv");
    this.chartHeap.generateSerie(this.chart);

    this.colors ={
      "critical": this.chart.colors.getIndex(0).brighten(-0.8),
      "bad": this.chart.colors.getIndex(1).brighten(-0.6),
      "medium": this.chart.colors.getIndex(1).brighten(-0.4),
      "good": this.chart.colors.getIndex(1).brighten(-0.2),
      "verygood": this.chart.colors.getIndex(1).brighten(0)
    };

    let data = [ {
      "y": "Critical",
      "x": "Very good",
      "color": this.colors.medium,
      "value": 20
    }, {
      "y": "Bad",
      "x": "Very good",
      "color": this.colors.good,
      "value": 20
    }, {
      "y": "Medium",
      "x": "Very good",
      "color": this.colors.verygood,
      "value": 20
    }, {
      "y": "Good",
      "x": "Very good",
      "color": this.colors.verygood,
      "value": 20
    }, {
      "y": "Very good",
      "x": "Very good",
      "color": this.colors.verygood,
      "value": 20
    },
    
    {
      "y": "Critical",
      "x": "Good",
      "color": this.colors.bad,
      "value": 20
    }, {
      "y": "Bad",
      "x": "Good",
      "color": this.colors.medium,
      "value": 20
    }, {
      "y": "Medium",
      "x": "Good",
      "color": this.colors.good,
      "value": 20
    }, {
      "y": "Good",
      "x": "Good",
      "color": this.colors.verygood,
      "value": 20
    }, {
      "y": "Very good",
      "x": "Good",
      "color": this.colors.verygood,
      "value": 20
    },
    
    {
      "y": "Critical",
      "x": "Medium",
      "color": this.colors.bad,
      "value": 20
    }, {
      "y": "Bad",
      "x": "Medium",
      "color": this.colors.bad,
      "value": 20
    }, {
      "y": "Medium",
      "x": "Medium",
      "color": this.colors.medium,
      "value": 20
    }, {
      "y": "Good",
      "x": "Medium",
      "color": this.colors.good,
      "value": 20
    }, {
      "y": "Very good",
      "x": "Medium",
      "color": this.colors.good,
      "value": 20
    },
    
    {
      "y": "Critical",
      "x": "Bad",
      "color": this.colors.critical,
      "value": 20
    }, {
      "y": "Bad",
      "x": "Bad",
      "color": this.colors.critical,
      "value": 20
    }, {
      "y": "Medium",
      "x": "Bad",
      "color": this.colors.bad,
      "value": 20
    }, {
      "y": "Good",
      "x": "Bad",
      "color": this.colors.medium,
      "value": 20
    }, {
      "y": "Very good",
      "x": "Bad",
      "color": this.colors.good,
      "value": 20
    },
    
    {
      "y": "Critical",
      "x": "Critical",
      "color": this.colors.critical,
      "value": 20
    }, {
      "y": "Bad",
      "x": "Critical",
      "color": this.colors.critical,
      "value": 20
    }, {
      "y": "Medium",
      "x": "Critical",
      "color": this.colors.critical,
      "value": 20
    }, {
      "y": "Good",
      "x": "Critical",
      "color": this.colors.bad,
      "value": 20
    }, {
      "y": "Very good",
      "x": "Critical",
      "color": this.colors.medium,
      "value": 20
    }
    ];

    this.chart.data = data;

  }

  showSpinner() {
    const opt1: Spinner = {
      bdColor: "rgba(51,51,51,0.8)",
      size: "medium",
      color: "#fff",
      type: "square-jelly-box"
    };

    this.spinner.show("mySpinner", opt1);
  }
}
