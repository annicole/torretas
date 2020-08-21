import { Component, OnInit } from '@angular/core';
import { MateriaprimaService } from '@app/services/materiaprima.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { NuevoMateriapComponent } from '@app/pages/forms/nuevo-materiap/nuevo-materiap.component';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.scss']
})
export class MateriaPrimaComponent implements OnInit {

  
  lista: [];
  total: number;
  listNav = [
    { "name": "Producto", "router": "/producto" },
    { "name": "Subensamble", "router": "/subensamble" },
    { "name": "Materia Prima", "router": "/materiaPrima" }
  ]
  constructor(private service: MateriaprimaService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProductos('');
  }

  async getProductos(searchValue: string) {
    try {
      let resp = await this.service.get(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.lista = resp.response;
        console.log(this.lista)
        this.total = this.lista.length;
      }
    } catch (e) {
    }
  }

  onSearchChange(searchValue: string) {
    this.getProductos(searchValue);
  }

  add() {

  }

  update(obj) {
    const dialogRef = this.dialog.open(NuevoMateriapComponent, {
      width: '40rem',
      data: {
        title: 'Editar producto: ' + obj.subensamble,
        btnText: 'Guardar',
        alertSuccesText: 'Producto modificado correctamente',
        alertErrorText: "No se puedo modificar el registro",
        modalMode: 'edit',
        _materia: obj
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getProductos('');
    });
  }

  delete(modulo) {
    Swal.fire({
      title: 'Desactivar modulo interfaz', text: "¿Desea eliminar el registro?",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        modulo.activo = 0;
        this.service.update(modulo, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getProductos('');
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
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

}
