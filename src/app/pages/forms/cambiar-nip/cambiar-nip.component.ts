import { string } from '@amcharts/amcharts4/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@app/classes/Dialog';
import { Usuario } from '@app/models/usuario';

@Component({
  selector: 'app-cambia-nip',
  templateUrl: './cambiar-nip.component.html',
  styleUrls: ['./cambiar-nip.component.scss']
})
export class CambiarNipComponent extends Dialog implements OnInit  {

  usuario: Usuario;
  CambiaNipForm: FormGroup;
  submitted = false;
  nip:string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CambiarNipComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }
  ngOnInit() {
    this.loadModalTexts();
    this.CambiaNipForm = this.formBuilder.group({
      nip:['',[Validators.required]],
      nip2:['',[Validators.required]]
    }, 
    { validator: [this.MustMatch('nip', 'nip2')] });//, { validator: this.MustMatch('nip', this.usuario.nip.toString()) }    { validator: this.MustMatch('nip')}
    
  }

  get f() { return this.CambiaNipForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.CambiaNipForm.invalid) {
      return;
    } else {
      console.log("cambiando")

    }
  }
  // async addUsuario(){
  //   const dialogRef = this.dialog.open(NuevoUsuarioComponent, {
  //     //width: '25rem',
  //     data: {
  //       title: 'Datos adicionales',
  //       btnText: 'Guardar',
  //       alertSuccesText: 'Usuario creado!',
  //       alertErrorText: "No se puedo crear el usuario",
  //       modalMode: 'create',
  //       username: this.data.username,
  //       Username_last: this.data.Username_last,
  //       iddep: this.data.iddep,
  //       idevento: this.data.idevento,
  //       tipousuario: this.data.tipousuario,
  //       usuario: this.usuario,
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(data => {
  //     this.closeModal();
  //   });
  // }

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
  if(usuario){
    const { username, id, email, password, celular, iddep, nip, activousr } = usuario;
      this.usuario =  new Usuario();
      this.usuario.iddep = iddep;
      this.usuario.username = username;
      this.usuario.celular = celular;
      this.usuario.email = email;
      this.usuario.id = id;
      this.usuario.nip = nip;
      this.usuario.activousr = activousr;
  }
  console.log(this.usuario);
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