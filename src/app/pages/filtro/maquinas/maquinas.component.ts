import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '../../../services/maquina.service';
import { Maquina } from '../../../models/maquina';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoMaquinaComponent } from '@app/pages/forms/nuevo-maquina/nuevo-maquina.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styleUrls: ['./maquinas.component.scss']
})
export class MaquinasComponent implements OnInit {

  maquinas:Maquina[];
  constructor(private maquinaService: MaquinaService,
    private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getMaquinas();
  }

 async getMaquinas(){
   try{
    let resp = await this.maquinaService.getMaquinas().toPromise();
    if (resp.code == 200) {
      this.maquinas = resp.maquina;
      console.log(resp);
    }
   }catch(e){
     console.log(e);
   }
 }

 addMaquina() {
  const dialogRef = this.dialog.open(NuevoMaquinaComponent, {
    width: '40rem',
    data: {
      title: 'Agregar máquina',
      btnText: 'Agregar',
      alertSuccesText: 'Máquina creada!',
      alertErrorText: "No se puedo crear la máquina",
      modalMode: 'create'
    }
  });

  dialogRef.afterClosed().subscribe(data => {
    this.getMaquinas();
  });
}

updateMaquina(_maquina) {
  const dialogRef = this.dialog.open(NuevoMaquinaComponent, {
    width: '40rem',
    data: {
      title: 'Editar máquina',
      btnText: 'Editar',
      alertSuccesText: 'Máquina modificada correctamente',
      alertErrorText: "No se puedo modificar la máquina",
      modalMode: 'edit',
      _maquina
    }
  });

  dialogRef.afterClosed().subscribe(data => {
    this.getMaquinas();
  });
}

delete(id: number) {
  Swal.fire({
    title: '¿Estas seguro?', text: "Desea eliminar el departamento",
    type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
  }).then((result) => {
    if (result.value) {
      this.maquinaService.delete(id).subscribe(res => {
        if (res.code == 200) {
          Swal.fire('Eliminado', 'El departamento ha sido eliminado correctamente', 'success');
          this.getMaquinas();
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

async onSearchChange(searchValue : string ) {  
  
}
}
