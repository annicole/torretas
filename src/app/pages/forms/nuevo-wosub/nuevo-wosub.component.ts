import { Component, OnInit, Inject } from '@angular/core';
import { WosubService } from '@app/services/wosub.service';
import { StatuswosubService } from '@app/services/statuswosub.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-Wosub',
  templateUrl: './nuevo-Wosub.component.html',
  styleUrls: ['./nuevo-Wosub.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NuevoWosubComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  wosub: [];
  statuswosub: [];
  token;

  constructor(
    private wosubService: WosubService,
    private statuswosubService: StatuswosubService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoWosubComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idwosub: [],
      cantwosub: ['',Validators.required],
      idstwosub: ['',Validators.required],
    });
    this.token = this.auth.token;
    this.loadModalTexts();
    this.getStatuswosub('');
  }

  async getWosub(searchValue: string) {
    try {
      let resp = await this.wosubService.get(searchValue,this.auth.token).toPromise();
      if (resp.code == 200) {
        this.wosub = resp.response;
      }
    } catch (e) {
    }
  }

  async getStatuswosub(searchValue: string) {
    try {
      let resp = await this.statuswosubService.get(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.statuswosub = resp.response;
      }
    } catch (e) {
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _wosub } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_wosub) {
      const { idwosub, cantwosub} = _wosub;
      const idstwosub = _wosub.Statuswosub.idstwosub;
      this.form.patchValue({ idwosub, cantwosub, idstwosub});
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
      response = await this.wosubService.create(this.form.value, this.token).toPromise();
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
        this.wosubService.delete(obj.idwo, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getWosub('');
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

}
