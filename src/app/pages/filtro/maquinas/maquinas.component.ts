import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '@app/services/maquina.service';
import { AreaService } from '@app/services/area.service';
import { Maquina } from '@app/models/maquina';
import { Area } from '@app/models/area';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoMaquinaComponent } from '@app/pages/forms/nuevo-maquina/nuevo-maquina.component';
import { NuevoSensorComponent } from '@app/pages/forms/nuevo-sensor/nuevo-sensor.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.scss']
})
export class MaquinasComponent implements OnInit {

  maquinas: Maquina[];
  areas: Area[];
  selectedArea: string = '';
  total: number = 0;
  listNav = [
    { "name": "Equipos", "router": "/maquina" },
    { "name": "Área", "router": "/area" },
    { "name": "Tipo de equipo", "router": "/tipoEquipo" },
    { "name": "Modulo Interfaz", "router": "/moduloInterfaz" }
  ]
  constructor(private maquinaService: MaquinaService, private areaService: AreaService,
    private dialog: MatDialog, private spinner: NgxSpinnerService, private auth: AuthService) { }

  ngOnInit() {
    this.getMaquinas("");
    this.getAreas();
  }

  async getMaquinas(searchValue: string) {
    try {
      let resp = await this.maquinaService.getMaquinas(searchValue, (this.selectedArea != "") ? this.selectedArea : "", this.auth.token).toPromise();
      if (resp.code == 200) {
        this.maquinas = resp.maquina;
        this.total = this.maquinas.length;
      }
    } catch (e) {
    }
  }

  async getAreas() {
    try {
      let resp = await this.areaService.getAreas("", this.auth.token).toPromise();
      if (resp.code == 200) {
        this.areas = resp.area;
      }
    } catch (e) {
    }
  }

  addMaquina() {
    const dialogRef = this.dialog.open(NuevoMaquinaComponent, {
      width: '40rem',
      data: {
        title: 'Agregar equipo',
        btnText: 'Guardar',
        alertSuccesText: 'Equipo creado!',
        alertErrorText: "No se puedo crear el equipo",
        modalMode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getMaquinas("");
    });
  }

  updateMaquina(_maquina) {
    const dialogRef = this.dialog.open(NuevoMaquinaComponent, {
      width: '40rem',
      data: {
        title: 'Editar equipo',
        btnText: 'Guardar',
        alertSuccesText: 'Equipo modificado correctamente',
        alertErrorText: "No se puedo modificar el equipo",
        modalMode: 'edit',
        _maquina
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getMaquinas("");
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el equipo",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.maquinaService.delete(id, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El equipo ha sido eliminado correctamente', 'success');
            this.getMaquinas("");
          } else {
            Swal.fire('Error', 'No fue posible eliminar el equipo', 'error');
          }
        });
      }
    });
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

  onSearchChange(searchValue: string) {
    this.getMaquinas(searchValue);
  }

  searchByArea() {
    this.getMaquinas("");
  }

  addSensor(idMaquina) {
    const dialogRef = this.dialog.open(NuevoSensorComponent, {
      width: '40rem',
      data: {
        title: 'Agregar sensor',
        btnText: 'Agregar',
        alertSuccesText: 'Sensor creado!',
        alertErrorText: "No se puedo crear el sensor",
        modalMode: 'create',
        idMaquina
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getMaquinas("");
    });
  }

  loadPage(page) {
    this.maquinaService.changePage(page, this.auth.token);
  }
}
