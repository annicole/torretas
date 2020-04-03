import { Component, OnInit, Inject } from '@angular/core';
import { ModuloInterfazService } from '@app/services/modulo-interfaz.service';
import { PerfilConfigService } from '@app/services/perfil-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuloInterfaz } from '@app/models/moduloInterfaz';
import { PerfilConfig } from '@app/models/perfilConfig';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-nuevo-modulo',
  templateUrl: './nuevo-modulo.component.html',
  styleUrls: ['./nuevo-modulo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NuevoModuloComponent extends Dialog implements OnInit {

  modulo: ModuloInterfaz = new ModuloInterfaz();
  form: FormGroup;
  submitted = false;
  listaPerfil: PerfilConfig[];
  token;

  constructor(
    private moduloService: ModuloInterfazService,
    private perfilService: PerfilConfigService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoModuloComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      serial: ['', Validators.required],
      idperfil: ['', Validators.required]
    });
    this.getPerfiles();
    this.token = this.auth.token;
    this.loadModalTexts();
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _modulo } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_modulo) {
      this.modulo = _modulo;
    }
  }

  async getPerfiles() {
    try {
      let resp = await this.perfilService.getPerfil(this.token).toPromise();
      if (resp.code == 200) {
        this.listaPerfil = resp.perfilConfig;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
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
      switch (this.modalMode) {
        case 'create': response = await this.moduloService.create(this.modulo, this.token).toPromise();
          break;
        case 'edit': response = await this.moduloService.update(this.modulo, this.token).toPromise();
          break;
      }
      if (response.code = 200) {
        this.showAlert(this.alertSuccesText, true);
        this.closeModal();
      }
      else {
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      console.log(e);
      this.showAlert(e.error.message, false);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
