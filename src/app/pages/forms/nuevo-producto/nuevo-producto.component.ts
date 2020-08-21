import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '@app/services/producto.service';
import { UmService } from '@app/services/um.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NuevoProductoComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  listaUm: [];
  token;

  constructor(
    private productoService: ProductoService,
    private umService: UmService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoProductoComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      producto: [],
      desc_producto: ['', Validators.required],
      te_producto: ['', Validators.required],
      um_producto: [Validators.required],
      idproducto: []
    });
    this.token = this.auth.token;
    this.loadModalTexts();
    this.getUm();
  }

  async getUm() {
    try {
      let resp = await this.umService.get(this.token).toPromise();
      if (resp.code == 200) {
        this.listaUm = resp.response;
      }
    } catch (e) {
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _producto } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_producto) {
      console.log(_producto);
      const { idproducto, desc_producto, te_producto, producto } = _producto;
      const um_producto = _producto.Um.idum;
      this.form.patchValue({ idproducto, desc_producto, te_producto, um_producto, producto });
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
      response = await this.productoService.update(this.form.value, this.token).toPromise();
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
}
