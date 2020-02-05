import { Component, OnInit } from '@angular/core';
import { TipoEquipoService } from '@app/services/tipo-equipo.service';
import { TipoEquipo } from '@app/models/tipoEquipo';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/services/auth.service';
import { NuevoTipoEquipoComponent } from '@app/pages/forms/nuevo-tipo-equipo/nuevo-tipo-equipo.component';

@Component({
  selector: 'app-tipo-equipo',
  templateUrl: './tipo-equipo.component.html',
  styleUrls: ['./tipo-equipo.component.scss']
})
export class TipoEquipoComponent implements OnInit {

  tipos :TipoEquipo[];
  total:number =0;
  constructor(private tipoService: TipoEquipoService, 
    private dialog: MatDialog, private auth: AuthService) { }

  ngOnInit() {
    this.getTipos("");
  }

  async getTipos(searchValue: string) {
    try {
      let resp = await this.tipoService.getTipos(this.auth.token).toPromise();
      if (resp.code == 200) {
        this.tipos = resp.tipo_equipos;
        this.total = this.tipos.length;
      }
    } catch (e) {
      console.log(e);
    }
  }

  onSearchChange(searchValue: string) {
   // this.getTipos(searchValue);
    console.log(searchValue);
  }

  add(){
      const dialogRef = this.dialog.open(NuevoTipoEquipoComponent, {
        width: '30rem',
        data: {
          title: 'Agregar tipo de equipo',
          btnText: 'Agregar',
          alertSuccesText: 'Tipo de equipo creado!',
          alertErrorText: "No se puedo crear el tipo de equipo",
          modalMode: 'create'
        }
      });
  
      dialogRef.afterClosed().subscribe(data => {
        this.getTipos("");
      });

  }

  update(_tipo) {
    const dialogRef = this.dialog.open(NuevoTipoEquipoComponent, {
      width: '30rem',
      data: {
        title: 'Editar tipo de equipo',
        btnText: 'Editar',
        alertSuccesText: 'Tipo de equipo modificado correctamente',
        alertErrorText: "No se puedo modificar el tipo de equipo",
        modalMode: 'edit',
        _tipo
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getTipos("");
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el tipo",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.tipoService.delete(id,this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El tipo ha sido eliminado correctamente', 'success');
            this.getTipos("");
          } else {
            Swal.fire('Error', 'No fue posible eliminar el tipo', 'error');
          }
        });
      }
    });
  }


}
