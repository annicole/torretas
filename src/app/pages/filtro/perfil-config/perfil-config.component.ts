import { Component, OnInit } from '@angular/core';
import { PerfilConfigService } from '@app/services/perfil-config.service';
import { PerfilConfig } from '@app/models/perfilConfig';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { NuevoPerfilconfigComponent } from '@app/pages/forms/nuevo-perfilconfig/nuevo-perfilconfig.component';
import { NuevoConfiguracionModuloComponent } from '@app/pages/forms/nuevo-configuracion-modulo/nuevo-configuracion-modulo.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-perfil-config',
  templateUrl: './perfil-config.component.html',
  styleUrls: ['./perfil-config.component.scss']
})
export class PerfilConfigComponent implements OnInit {

  lista: PerfilConfig[];
  total: number;
  listNav=[
    {"name":"Modulo Interfaz", "router":"/moduloInterfaz"},
    {"name":"Perfil configuración", "router":"/perfilConfig"}
  ]
  constructor(private perfilService: PerfilConfigService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getPerfil();
  }

  async getPerfil() {
    try {
      let resp = await this.perfilService.getPerfil(this.auth.token).toPromise();
      if (resp.code == 200) {
        this.lista = resp.perfilConfig;
        console.log(this.lista);
        this.total = this.lista.length;
      }
    } catch (e) {
      console.log(e);
    }
  }

  add() {
    const dialogRef = this.dialog.open(NuevoPerfilconfigComponent, {
      width: '40rem',
      data: {
        title: 'Agregar perfil configuración',
        btnText: 'Guardar',
        alertSuccesText: 'Perfil creado!',
        alertErrorText: "El perfil configuración ya existe",
        modalMode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getPerfil();
    });
  }

  update(perfil) {
    const dialogRef = this.dialog.open(NuevoPerfilconfigComponent, {
      width: '40rem',
      data: {
        title: 'Editar perfil configuración',
        btnText: 'Editar',
        alertSuccesText: 'Perfil configuración modificado correctamente',
        alertErrorText: "No se puedo modificar el modulo interfaz",
        modalMode: 'edit',
        _perfilConfig: perfil
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getPerfil();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el perfil configuración?",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.perfilService.delete(id, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El perfil configuración ha sido eliminado correctamente', 'success');
            this.getPerfil();
          } else {
            Swal.fire('Error', 'No fue posible eliminar el perfil', 'error');
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
