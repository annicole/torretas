import { Component, OnInit } from '@angular/core';
import { AreaService } from '@app/services/area.service';
import { Area } from '@app/models/area';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoAreaComponent } from '@app/pages/forms/nuevo-area/nuevo-area.component';
import { NgxSpinnerService } from "ngx-spinner";
import { NuevoMaquinaComponent } from '@app/pages/forms/nuevo-maquina/nuevo-maquina.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: Area[];
  total: number = 0;
  token;
  constructor(private areaService: AreaService, private auth: AuthService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAreas("");
    this.token = this.auth.token;
  }

  async getAreas(searchValue: string) {
    try {
      let resp = await this.areaService.getAreas(searchValue, this.token).toPromise();
      if (resp.code == 200) {
        this.areas = resp.area
        this.total = this.areas.length;
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
        this.areaService.delete(id, this.token).subscribe(res => {
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
