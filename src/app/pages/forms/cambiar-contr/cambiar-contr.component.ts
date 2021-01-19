import { string } from '@amcharts/amcharts4/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@app/classes/Dialog';
import { Usuario } from '@app/models/usuario';
import { AuthService } from '@app/services/auth.service';
import { UsuarioService } from '@app/services/usuario.service';

@Component({
  selector: 'app-cambiar-contr',
  templateUrl: './cambiar-contr.component.html',
  styleUrls: ['./cambiar-contr.component.scss']
})
export class CambiarContrComponent extends Dialog implements OnInit  {

  usuario: Usuario;
  contra: string;
  token;
  CambiaContrForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<CambiarContrComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }
  ngOnInit() {
    this.usuario =  new Usuario();
    this.loadModalTexts();
    this.CambiaContrForm = this.formBuilder.group({
      password:['',[Validators.required]],
      password2:['',[Validators.required]]
    }, 
    { validator: [this.MustMatch('password', 'password2')] });//, { validator: this.MustMatch('nip', this.usuario.nip.toString()) }    { validator: this.MustMatch('nip')}
    
  }

  get f() { return this.CambiaContrForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.CambiaContrForm.invalid) {
      return;
    } else {
      this.usuario.password = this.contra;
      console.log(this.usuario);
      this.guardar();
    }
  }
  async guardar() {
    try {
      let response = await this.usuarioService.update(this.usuario,this.token).toPromise();
      if (response.code = 200) {
        this.showAlert(this.alertSuccesText, true);
        this.closeModal();
      }
      else {
      console.log('AlertError');
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      console.log('error');
      this.showAlert(e.error.message, false);
    }
  }


  closeModal(): void {
    this.dialogRef.close();
  }

  loadModalTexts(): void {
  const { title, btnText, alertErrorText, alertSuccesText, modalMode, usuario} = this.data;
  this.title = title;
  this.btnText = btnText;
  this.alertSuccesText = alertSuccesText;
  this.alertErrorText = alertErrorText;
  this.modalMode = modalMode;
  this.usuario = usuario;
  
  //console.log(this.usuario);
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

}
