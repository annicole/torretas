import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../../services/sensor.service';
import { Sensor } from '../../../models/sensor';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoSensorComponent } from '@app/pages/forms/nuevo-sensor/nuevo-sensor.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.scss']
})
export class SensoresComponent implements OnInit {

  sensores:Sensor[];

  constructor(private sensorService: SensorService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getSensores();
  }

  async getSensores() {
    try {
      let resp = await this.sensorService.getSensores().toPromise();
      if (resp.code == 200) {
        this.sensores = resp.sensor;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  addSensor() {
    const dialogRef = this.dialog.open(NuevoSensorComponent, {
      width: '70rem',
      data: {
        title: 'Agregar sensor',
        btnText: 'Agregar',
        alertSuccesText: 'Sensor creado!',
        alertErrorText: "No se puedo crear el sensor",
        modalMode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getSensores();
    });
  }

  updateSensor(sensor) {
    const dialogRef = this.dialog.open(NuevoSensorComponent, {
      width: '70rem',
      data: {
        title: 'Editar sensor',
        btnText: 'Editar',
        alertSuccesText: 'Sensor modificado correctamente',
        alertErrorText: "No se puedo modificar el sensor",
        modalMode: 'edit',
        sensor
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getSensores();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el sensor",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.sensorService.delete(id).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El sensor ha sido eliminado correctamente', 'success');
            this.getSensores();
          } else {
            Swal.fire('Error', 'No fue posible eliminar el sensor', 'error');
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

  async onSearchChange(searchValue : string ) {  
    
  }

}
