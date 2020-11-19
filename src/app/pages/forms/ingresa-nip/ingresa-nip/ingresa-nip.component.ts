import { string } from '@amcharts/amcharts4/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@app/classes/Dialog';
import { Usuario } from '@app/models/usuario';
import { NuevoUsuarioComponent } from '../../nuevo-usuario/nuevo-usuario.component';

@Component({
  selector: 'app-ingresa-nip',
  templateUrl: './ingresa-nip.component.html',
  styleUrls: ['./ingresa-nip.component.scss']
})
export class IngresaNipComponent extends Dialog implements OnInit  {

  usuario: Usuario;
  IngresaNipForm: FormGroup;
  submitted = false;
  nip:string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IngresaNipComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }
  ngOnInit() {
    this.loadModalTexts();
    console.log(this.data);
    this.IngresaNipForm = this.formBuilder.group({
      nip:['',[Validators.required]]
    });//, { validator: this.MustMatch('nip', this.usuario.nip.toString()) }    { validator: this.MustMatch('nip')}
    
    console.log("dentro de Oni ingresanip")
    console.log(this.usuario);
  }

  get f() { return this.IngresaNipForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.IngresaNipForm.invalid) {
      return;
    } else {


      if(this.usuario == null){
        if(this.nip == "1234"){
          this.addUsuario();
          this.closeModal();
        }else{
          this.showAlert(this.alertErrorText, false)
        }
      }else {
        if(this.nip == this.usuario.nip.toString()){
          this.addUsuario();
          this.closeModal();
        }else{
          this.showAlert(this.alertErrorText, false)
        }
      }


    }
  }
  addUsuario(){
    console.log("dentro de Adusuario ingresanip")
    console.log(this.usuario);
    const dialogRef = this.dialog.open(NuevoUsuarioComponent, {
      //width: '25rem',
      data: {
        title: 'Datos adicionales',
        btnText: 'Guardar',
        alertSuccesText: 'Usuario creado!',
        alertErrorText: "No se puedo crear el usuario",
        modalMode: 'create',
        username: this.data.username,
        Username_last: this.data.Username_last,
        iddep: this.data.iddep,
        idevento: this.data.idevento,
        tipousuario: this.data.tipousuario,
        usuario: this.usuario,
      }
    });
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
  if(usuario){
    const { nombre, id, email, password, celular, iddep, nip } = usuario;
      this.usuario.iddep = iddep;
      this.usuario.username = nombre;
      this.usuario.celular = celular;
      this.usuario.email = email;
      this.usuario.id = id;
      this.usuario.nip = nip;
  }
  }

}
