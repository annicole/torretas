import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../../models/departamento';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoDepartamentoComponent } from '@app/pages/forms/nuevo-departamento/nuevo-departamento.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { NuevoUsuarioComponent } from '@app/pages/forms/nuevo-usuario/nuevo-usuario.component';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit {

  departamentos: Departamento[];
  page: number = 1;
  limit: number = 10;
  total: number;
  numberOfElemets = [
    { label: '20', value: '20' },
    { label: '25', value: '25' },
    { label: '30', value: '30' },
    { label: '35', value: '35' },
    { label: '40', value: '40' },
  ];
  constructor(private deptoService: DepartamentoService,
    private dialog: MatDialog, private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getDeptos("");
  }

  async getDeptos(searchValue) {
    try {
      let resp = await this.deptoService.getDepartamentos(searchValue).toPromise();
      if (resp.code == 200) {
        this.departamentos = resp.depto;
      }
    } catch (e) {
      console.log(e);
    }
  }

  selectPage(page) {
    this.page = page;
    this.showSpinner();
    this.getDeptos("");
  }

  selectOption(option) {
    this.limit = option.value;
    this.page = 1;
    this.showSpinner();
    this.getDeptos("");
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
      this.getDeptos("");
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
      this.getDeptos("");
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
            Swal.fire('Eliminado', 'El departamento ha sido eliminado correctamente', 'success');
            this.getDeptos("");
          } else {
            Swal.fire('Error', 'No fue posible eliminar el departamento', 'error');
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

  async onSearchChange(searchValue: string) {
    this.getDeptos(searchValue);
  }

  addUsuario(idDepto){
    const dialogRef = this.dialog.open(NuevoUsuarioComponent, {
      width: '50rem',
      data: {
        title: 'Agregar usuario',
        btnText: 'Agregar',
        alertSuccesText: 'Usuario creado!',
        alertErrorText: "No se puedo crear el usuario",
        modalMode: 'create',
        idDepto
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getDeptos("");
    });
  }
}