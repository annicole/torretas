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
import { interval } from 'rxjs';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import * as color from '@app/classes/Color';

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
  private chartHeap: ChartHeapMap = new ChartHeapMap();
  dataChart = [];
  filterByMachine: boolean = true;
  iconFilter: string = 'expand_less';
  showFilter: boolean = false;
  graficaForm: FormGroup;
  intervalTimer = interval(30000);
  intervalSubs;
  colorsChart = {
    "Apagado": am4core.color("#E9E9E9"),
    "Paro": am4core.color("#CB4848"),
    "Operando": am4core.color("#808080"),
    "En_Paro": am4core.color("#00FF00"),
    "Stand_by": am4core.color("#FF0000"),
    "Servicio": am4core.color("#B45A00"),
    "Materiales": am4core.color("#0000FF"),
    "Ingenieria": am4core.color("#0064C8"),
    "Produccion": am4core.color("#6400B4"),
    "Calidad": am4core.color("#B43C00")

  }
  estado = {
    0: "Apagado",
    1: "Paro",
    2: "Evento"
  }

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
      maquina: [''],
      area: ['']
    });
    if (this.activate.snapshot.paramMap.get('idMaquina') != '0') {
      this.graficaForm.value.maquina = this.activate.snapshot.paramMap.get('idMaquina');
    }
    this.getMaquinas();
    this.getAreas();
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
      let response = await this.areaService.getAreas("", this.auth.token).toPromise();
      if (response.code == 200) {
        this.areas = response.area;
      }
    } catch (e) {
      console.log(e);
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.iconFilter = (this.showFilter) ? 'expand_more' : 'expand_less';
  }

  async getDatosGrafica(mostartSpinner: boolean) {
    let arreglo;
    let tipo: string = "";
    let id;
    let bandera: boolean = false;
    let estado: string = "";
    try {
      this.dataChart = [];
      if (mostartSpinner) {
        this.showSpinner();
      }
      this.unsubscribeInterval();
      //this.disposeChart();
      if (this.graficaForm.value.maquina != '') {
        id = this.graficaForm.value.maquina;
        tipo = '0';
        bandera = true;
      } else if (this.graficaForm.value.area != '') {
        id = this.graficaForm.value.area;
        tipo = '1';
        bandera = true;
      }
      if (bandera) {
        let response = await this.graficaService.getGraficaEstadoR(id, tipo, this.auth.token).toPromise();
        if (response.code == 200) {
          arreglo = response.grafica;
          arreglo.forEach((element) => {
            let maquina = element["DESCRIPCION"];
            Object.keys(element).forEach(key => {
              if (['Operando', 'En_Paro', 'Stand_by', 'Servicio', 'Materiales', 'Ingenieria', 'Produccion', 'Calidad'].indexOf(key) >= 0) {
                if (element[key] !== null) {
                  estado = this.estado[element[key]];
                  this.dataChart.push({
                    sensor: key,
                    maquina: maquina,
                    estado: estado,
                    color: estado[key] == 2 ? color.colorsChart[key] : color.colorsChart[estado],
                    valor: 20,
                    estadoN: element[key],
                  });
                }
              }
            });
          });
          console.log(this.dataChart);
          if (this.chart) {
            console.log('actualizo');
            this.chart.data = this.dataChart;
            this.chart.validateData();
          } else {
            this.llenarGrafica();
          }
          this.intervalSubs = this.intervalTimer.subscribe(() => this.getDatosGrafica(false));
        } else {
          Swal.fire('Error', 'No existe información para la tabla', 'error');
        }
      }
      if (mostartSpinner)
        this.spinner.hide("mySpinner");
    } catch (e) {
      console.log(e);
      this.spinner.hide("mySpinner");
      Swal.fire('Error', 'Error al obtener los datos para las tabla', 'error');
    }
  }

  llenarGrafica() {
    this.chart = this.chartHeap.generateChart(this.dataChart, "chartdiv");
    this.chartHeap.generateSerie(this.chart);
  }

  filterTypeselected(type: boolean) {
    this.filterByMachine = type;
    const controlMaquina = this.graficaForm.controls['maquina'];
    const controlArea = this.graficaForm.controls['area'];
    if (type) {
      controlArea.setValidators(null);
      controlArea.setValue('');
    } else {
      controlMaquina.setValue('');
      controlMaquina.setValidators(null);
    }
    controlMaquina.updateValueAndValidity();
    controlArea.updateValueAndValidity();
    if (this.chart) {
      this.dataChart = [];
      //this.chart.dispose();
      this.unsubscribeInterval();
    }
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

  unsubscribeInterval() {
    if (this.intervalSubs) {
      this.intervalSubs.unsubscribe();
      console.log("unsubscribe");
    }
  }

  disposeChart() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  ngOnDestroy() {
    this.disposeChart();
    this.unsubscribeInterval();
  }
}
