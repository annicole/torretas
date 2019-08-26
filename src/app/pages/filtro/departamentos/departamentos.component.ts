import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../../models/departamento';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoDepartamentoComponent } from '@app/pages/forms/nuevo-departamento/nuevo-departamento.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  departamentos: Departamento[];
  constructor(private deptoService: DepartamentoService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDeptos();
  }

  async getDeptos() {
    try {
      let resp = await this.deptoService.getDepartamentos().toPromise();
      if (resp.code == 200) {
        this.departamentos = resp.depto;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  addDepto() {
    const dialogRef = this.dialog.open(NuevoDepartamentoComponent, {
      width: '40rem',
      data: {
        title: 'Agregar departamento',
        btnText: 'Agregar',
        alertSuccesText: 'Departamento creado!',
        alertErrorText: "No se puedo crear el departamento",
        modalMode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getDeptos();
    });
  }

  updateDepto(depto) {
    const dialogRef = this.dialog.open(NuevoDepartamentoComponent, {
      width: '40rem',
      data: {
        title: 'Editar departamento',
        btnText: 'Editar',
        alertSuccesText: 'Departamento modificado correctamente',
        alertErrorText: "No se puedo modificar el departamento",
        modalMode: 'edit',
        depto
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getDeptos();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el departamento",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.deptoService.delete(id).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El Equipo ha sido eliminado correctamente', 'success');
            this.getDeptos();
          } else {
            Swal.fire('Error', 'No fue posible eliminar el equipo', 'error');
          }
        });
      }
    });
  }
}
