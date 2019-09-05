import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../services/area.service';
import { Area } from '../../../models/area';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoAreaComponent } from '@app/pages/forms/nuevo-area/nuevo-area.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { NuevoMaquinaComponent } from '@app/pages/forms/nuevo-maquina/nuevo-maquina.component';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: Area[];
  constructor(private areaService: AreaService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAreas("");
  }

  async getAreas(searchValue: string) {
    try {
      let resp = await this.areaService.getAreas(searchValue).toPromise();
      if (resp.code == 200) {
        this.areas = resp.area
      }
    } catch (e) {
      console.log(e);
    }
  }

  addArea() {
    const dialogRef = this.dialog.open(NuevoAreaComponent, {
      width: '40rem',
      data: {
        title: 'Agregar área',
        btnText: 'Agregar',
        alertSuccesText: 'Área creada!',
        alertErrorText: "No se puedo crear el área",
        modalMode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getAreas("");
    });
  }

  addMaquina(idArea) {
    const dialogRef = this.dialog.open(NuevoMaquinaComponent, {
      width: '40rem',
      data: {
        title: 'Agregar máquina',
        btnText: 'Agregar',
        alertSuccesText: 'Máquina creada!',
        alertErrorText: "No se puedo crear la máquina",
        modalMode: 'create',
        idArea
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getAreas("");
    });
  }


  updateArea(_area) {
    const dialogRef = this.dialog.open(NuevoAreaComponent, {
      width: '40rem',
      data: {
        title: 'Editar área',
        btnText: 'Editar',
        alertSuccesText: 'Área modificada correctamente',
        alertErrorText: "No se puedo modificar el departamento",
        modalMode: 'edit',
        _area
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getAreas("");
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el departamento",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.areaService.delete(id).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El área ha sido eliminado correctamente', 'success');
            this.getAreas("");
          } else {
            Swal.fire('Error', 'No fue posible eliminar el área', 'error');
          }
        });
      }
    });
  }

  async onSearchChange(searchValue: string) {
    this.getAreas(searchValue);
  }
}
