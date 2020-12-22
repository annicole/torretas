import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import Swal from 'sweetalert2';
import { TurnosProductivosService } from '@app/services/turnos-productivos.service';
import { DiaTurnoService } from '@app/services/diaturno.service';

@Component({
  selector: 'app-nuevo-turnos',
  templateUrl: './nuevo-turnos.component.html',
  styleUrls: ['./nuevo-turnos.component.scss'],
})
export class NuevoTurnosComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  listaDiaturnos: [];
  token;
  DiaSemana: any[] = [
    { id: 1, dia: 'Lunes' },
    { id: 2, dia: 'Martes' },
    { id: 3, dia: 'Miercoles' },
    { id: 4, dia: 'Jueves' },
    { id: 5, dia: 'Viernes' },
    { id: 6, dia: 'Sabado' },
    { id: 7, dia: 'Domingo' },
  ];
  TipoSegmento: any[] = [
    { id: 1, segmento: 'Unico' },
    { id: 2, segmento: 'Inicial' },
    { id: 3, segmento: 'Intermedio' },
    { id: 4, segmento: 'Final' },
  ];


  constructor(
    private turnosproductivosService: TurnosProductivosService,
    private diaturnoService: DiaTurnoService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      iddiaturno: [],
      idturno: ['',Validators.required],
      diasem: ['',Validators.required],
      hrenttur: ['',Validators.required],
      duracion: ['',Validators.required],
      tiempoefec: ['',Validators.required],
      tiposeg: ['',Validators.required],

    });
    this.token = this.auth.token;
    this.getDiaturno();
  }

  async getDiaturno() {
    try {
      let resp = await this.diaturnoService.get('',this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaDiaturnos = resp.response;
      }
    } catch (e) {
    }
  }

  DiaChange(dia) {
    if (dia == '1') {
      this.form.value.diasem = 1;
    }
    else if (dia == '2') {
      this.form.value.diasem = 2;
    }
    else if (dia == '3') {
      this.form.value.diasem = 3;
    }
    else if (dia == '4') {
      this.form.value.diasem = 4;
    }
    else if (dia == '5') {
      this.form.value.diasem = 5;
    }
    else if (dia == '6') {
      this.form.value.diasem = 6;
    }
    else if (dia == '7') {
      this.form.value.diasem = 7;
    }
  }

  SegmentoChange(segmento) {
    if (segmento == '1') {
      this.form.value.tiposeg = 1;
    }
    else if (segmento == '2') {
      this.form.value.tiposeg = 2;
    }
    else if (segmento == '3') {
      this.form.value.tiposeg = 3;
    }
    else if (segmento == '4') {
      this.form.value.tiposeg = 4;
    }
  }

  ToggleTiempoEfec(a) {
    console.log(a)
    console.log(this.form.value.tiempoefec)
    if (this.form.value.tiempoefec == this.form.value.duracion) {
      a = true;
      console.log('Activo')
    }
    else {
      a = false
      this.form.value.tiempoefec = 0;
      console.log('Inactivo')
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
     // this.guardar();
    }
  }

  delete(obj) {
    Swal.fire({
      title: '¿Desea eliminar el registro?', text: "",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.diaturnoService.delete(obj.iddiaturno, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getDiaturno();
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

}
