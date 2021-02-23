import { Component, OnInit, Inject } from '@angular/core';
import { EventocausaService } from '@app/services/eventocausa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-nuevo-eventofalla',
  templateUrl: './nuevo-eventofalla.component.html',
  styleUrls: ['./nuevo-eventofalla.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NuevoEventoCausaComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  number;
  listaevento: [];
  token;
  idequipo;

  constructor(
    private eventocausaService: EventocausaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoEventoCausaComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      IDeventofalla: [],
      idtipo: [],
      Idevento: [],
      Codfalla: ['', Validators.required],
      Descfalla: ['', Validators.required],
    });
    this.token = this.auth.token;
    this.loadModalTexts();
    this.getEventoc();
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _eventoc, idevento, idequipo } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;
    this.number = idevento;
    this.idequipo = idequipo;
    
    if (_eventoc) {
      const { IDeventofalla, idtipo, Idevento, Codfalla, Descfalla} = _eventoc;

      this.form.patchValue({ IDeventofalla, idtipo, Idevento, Codfalla, Descfalla });
    }
  }

  async getEventoc() {
  
    try {
      let resp = await this.eventocausaService.get(this.idequipo, this.number,this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaevento = resp.response;
        console.log(this.listaevento)
      }
    } catch (e) {
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
    this.form.value.Idevento = this.number;
    this.form.value.idtipo = this.idequipo;
    try {
      let response;
      response = await this.eventocausaService.create(this.form.value, this.token).toPromise();
      if (response.code == 200) {
        this.showAlert(this.alertSuccesText, true);
       this.getEventoc();
      }
      else {
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      this.showAlert(e.error.message, false);
    }
  }

  delete(eventoc){
    this.eventocausaService.delete(eventoc.IDeventofalla, this.auth.token).subscribe(res => {
      if (res.code == 200) {
        Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
        this.getEventoc();
      } else {
        Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
