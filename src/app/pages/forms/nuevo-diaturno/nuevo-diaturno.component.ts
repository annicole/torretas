import { Component, OnInit, Inject } from '@angular/core';
import { DiaTurnoService } from '@app/services/diaturno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nuevo-diaturno',
  templateUrl: './nuevo-diaturno.component.html',
  styleUrls: ['./nuevo-diaturno.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NuevoDiaTurnoComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  listaDiaturno: [];
  token;

  constructor(
    private diaturnoService: DiaTurnoService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoDiaTurnoComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tiempoefec: ['', Validators.required],
      duracion: ['', Validators.required],
      iddiaturno: [],
      idturno: [],
      diasem: [],
      hrenttur: [],
      tiposeg: [],
      diaturno: [],
    });
    this.token = this.auth.token;
    this.loadModalTexts();
    this.getDiaturno();
  }

  async getDiaturno() {
    try {
      let resp = await this.diaturnoService.get('',this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaDiaturno = resp.response;
      }
    } catch (e) {
    }
  }

  ToggleEfecD(a) {
    if (this.form.value.tiempoefec == false) {
      this.form.value.tiempoefec = 0;
      console.log(this.form.value.tiempoefec)
    } else {
      this.form.value.tiempoefec = this.form.value.duracion;
      console.log(this.form.value.tiempoefec)
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _diaturno } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_diaturno) {
      const { iddiaturno, idturno, diasem, hrenttur, duracion, tiempoefec, tiposeg, diaturno} = _diaturno;

      this.form.patchValue({ iddiaturno, idturno, diasem, hrenttur, duracion, tiempoefec, tiposeg, diaturno });
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response;
      response = await this.diaturnoService.update(this.form.value, this.token).toPromise();
      if (response.code == 200) {
        this.showAlert(this.alertSuccesText, true);
        this.closeModal();
      }
      else {
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      this.showAlert(e.error.message, false);
    }
  }

  closeModal() {
    this.dialogRef.close();
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
