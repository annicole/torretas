import { Component, OnInit, Inject } from '@angular/core';
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
  selector: 'app-nuevo-reg-pieza',
  templateUrl: './nuevo-reg-pieza.component.html',
  styleUrls: ['./nuevo-reg-pieza.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NuevoRegPiezaComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  pieza: [];
  token;
  date;
  idprogprod;


  constructor(
    private acumcalService: AcumcalService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoRegPiezaComponent>,
    private auth: AuthService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.form = this.formBuilder.group({
      acdef: ['',Validators.required],
      idprogprod: [],
      Feacdef: [],
      Umed: [],
    });
    this.token = this.auth.token;
    this.loadModalTexts();
    this.getPieza();
  }

  async getPieza() {
    try {
      let resp = await this.acumcalService.get(this.idprogprod, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.pieza = resp.response;
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
      //this.maquina = _maquina;
      const { Idacdef, Idprogprod, acdef, Feacdef, Umed} = obj;
      this.form.patchValue({ Idacdef, Idprogprod, acdef, Feacdef, Umed});
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
    this.form.value.Feacdef = this.date;
    try {
      let response;
      response = await this.acumcalService.create(this.form.value, this.token).toPromise();
      if (response.code == 200) {
        this.showAlert(this.alertSuccesText, true);
        this.getPieza();
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
        this.acumcalService.delete(obj.Idacdef, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getPieza();
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

}
