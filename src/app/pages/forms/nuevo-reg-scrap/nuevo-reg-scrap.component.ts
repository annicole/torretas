import { Component, OnInit, Inject } from '@angular/core';
import { AcumscrapService } from '@app/services/acumscrap.service';
import { AcumcalService } from '@app/services/acumcal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';

@Component({
  selector: 'app-nuevo-reg-scrap',
  templateUrl: './nuevo-reg-scrap.component.html',
  styleUrls: ['./nuevo-reg-scrap.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NuevoRegScrapComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  scrap: [];
  token;
  date;
  idprogprod;

  constructor(
    private acumscrapService: AcumscrapService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoRegScrapComponent>,
    private auth: AuthService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.form = this.formBuilder.group({
      acscrap: ['',Validators.required],
      Idprogprod: [],
      Umed: [],
    });
    this.token = this.auth.token;
    this.loadModalTexts();
    this.getScrap();
  }

  async getScrap() {
    try {
      let resp = await this.acumscrapService.get(this.idprogprod, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.scrap = resp.response;
      }
    } catch (e) {
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, obj } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;
    this.idprogprod = obj.idprogprod;

    if (obj) {
      const { Idacscrap, Idprogprod, acscrap, Feacsc, Umed} = obj;
      this.form.patchValue({  Idacscrap, Idprogprod, acscrap, Feacsc, Umed});
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
    this.form.value.Idprogprod = this.idprogprod;
    try {
      let response;
      response = await this.acumscrapService.create(this.form.value, this.token).toPromise();
      if (response.code == 200) {
        this.showAlert(this.alertSuccesText, true);
        this.getScrap();
        this.submitted = false;
        this.form.reset({});
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
        this.acumscrapService.delete(obj.Idacscrap, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getScrap();
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

}
