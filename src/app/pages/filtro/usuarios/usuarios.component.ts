import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoUsuarioComponent } from '@app/pages/forms/nuevo-usuario/nuevo-usuario.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[];
  constructor(private usuarioService: UsuarioService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getUsuarios('');
  }

  
  async getUsuarios(searchValue:string) {
    try {
      let resp = await this.usuarioService.getUsuarios(searchValue,'').toPromise();
      if (resp.code == 200) {
        this.usuarios = resp.usuario;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  addUsuario() {
    const dialogRef = this.dialog.open(NuevoUsuarioComponent, {
      width: '50rem',
      data: {
        title: 'Agregar usuario',
        btnText: 'Agregar',
        alertSuccesText: 'Usuario creado!',
        alertErrorText: "No se puedo crear el usuario",
        modalMode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getUsuarios('');
    });
  }

  updateUsuario(usuario) {
    const dialogRef = this.dialog.open(NuevoUsuarioComponent, {
      width: '40rem',
      data: {
        title: 'Editar usuario',
        btnText: 'Editar',
        alertSuccesText: 'Usuario modificado correctamente',
        alertErrorText: "No se puedo modificar el usuario",
        modalMode: 'edit',
        usuario
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getUsuarios('');
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el usuario",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.delete(id).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El usuario se ha sido eliminado correctamente', 'success');
            this.getUsuarios('');
          } else {
            Swal.fire('Error', 'No fue posible eliminar el usuario', 'error');
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
     this.getUsuarios(searchValue);
  }

}