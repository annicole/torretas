import { Component, OnInit, Inject } from '@angular/core';
import { DepartamentoService } from '@app/services/departamento.service';
import { UsuarioService } from '@app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '@app/models/departamento';
import { Usuario } from '@app/models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NuevoUsuarioComponent extends Dialog implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  submitted = false;
  departamentos: Departamento[];
  enabledDepartamento:boolean=false;
  token;

  constructor(private deptoService: DepartamentoService, private formBuilder: FormBuilder,
     private usuarioService: UsuarioService, private auth: AuthService,
    public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
    const disabled = this.data.idDepto ? true : false;
    this.usuarioForm = this.formBuilder.group({
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.min(6)]],
      password2: ['', Validators.required],
      celular: ['', [Validators.min(5)]],
      iddep: [{ value: '', disabled: disabled }, Validators.required]
    }, { validator: this.MustMatch('password', 'password2') });
    this.token= this.auth.token;
    this.getDeptos();
    this.loadModalTexts();
  }

  async getDeptos() {
    try {
      let resp = await this.deptoService.getDepartamentos("",this.token).toPromise();
      if (resp.code == 200) {
        this.departamentos = resp.depto;
      }
    } catch (e) {
    }
  }


  get f() { return this.usuarioForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.usuarioForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response = await this.usuarioService.create(this.usuario,this.token).toPromise();
      if (response.code = 200) {
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

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, usuario,idDepto } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (usuario) {
      const { username, id, email, password, celular, iddep, nip } = usuario;
      this.usuario.iddep = iddep;
      this.usuario.username = username;
      this.usuario.celular = celular;
      this.usuario.email = email;
      this.usuario.id = id;
      this.usuario.nip = nip;
    }

    if(idDepto){
      this.enabledDepartamento = true;
      this.usuario.iddep = idDepto;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
