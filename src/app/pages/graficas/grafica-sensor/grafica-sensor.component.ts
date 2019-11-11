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
  private chartHeap: ChartHeapMap = new ChartHeapMap();
  dataChart = [];
  filterByMachine: boolean = true;
  iconFilter: string = 'expand_less';
  showFilter: boolean = false;
  graficaForm: FormGroup;
  colorsChart = {
    0: am4core.color("#E9E9E9"),
    1: am4core.color("#61CA56"),
    2: am4core.color("#CB4848")
  }
  estado = {
    0: "Apagado",
    1: "Evento",
    2: "Paro"
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

  async getDatosGrafica() {
    let arreglo;
    let tipo: string = "";
    let id;
    try {
      this.dataChart =[];
      this.showSpinner();
      if (this.graficaForm.value.maquina != '' && this.graficaForm.value.maquina != '-1') {
        id = this.graficaForm.value.maquina;
        tipo = '0';
      } else if (this.graficaForm.value.area != '') {
        id = this.graficaForm.value.area;
        tipo = '1';
      } else {
        id = "-1";
      }
      let response = await this.graficaService.getGraficaEstadoR(id, tipo, this.auth.token).toPromise();
      if (response.code == 200) {
        arreglo = response.grafica;
        arreglo.forEach((element) => {
          let maquina = element["DESCRIPCION"];
          Object.keys(element).forEach(key => {
            if (key.substring(0, 3) === 'edo') {
              if(element[key] !== null){
              this.dataChart.push({
                sensor: key,
                maquina: maquina,
                estado: this.estado[element[key]],
                color: this.colorsChart[element[key]],
                valor: 20,
                estadoN: element[key],
              });
            }
            }
          });
        });
        console.log(this.dataChart);
        this.llenarGrafica();
      }else{
        Swal.fire('Error', 'No existe información para la gráfica', 'error');
      }
      this.spinner.hide("mySpinner");
    } catch (e) {
      console.log(e);
      this.spinner.hide("mySpinner");
      Swal.fire('Error', 'Error al obtener los datos para las gráficas', 'error');
    }
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
      this.chart.dispose();
    }
  }

  llenarGrafica() {
    this.chart = this.chartHeap.generateChar(this.dataChart, "chartdiv");
    this.chartHeap.generateSerie(this.chart);
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

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
