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

  usuario: Usuario = new Usuario();
  IngresaNipForm: FormGroup;
  submitted = false;
  nipaux:string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<IngresaNipComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
    if(this.usuario.nip == null){
      this.usuario.nip = 1234;
    }
  }
  ngOnInit() {
    this.IngresaNipForm = this.formBuilder.group({
      nip:['',[Validators.required]]
    },{ validator: this.MustMatch('nip')});//, { validator: this.MustMatch('nip', this.usuario.nip.toString()) }    { validator: this.MustMatch('nip')}
    this.loadModalTexts();
    console.log(this.usuario);
    console.log(this.data);
  }

  get f() { return this.IngresaNipForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.IngresaNipForm.invalid) {
      return;
    } else {
      if(this.nipaux == this.usuario.nip.toString()){
        this.addUsuario();
        this.closeModal();
      }
      
    }
  }
  addUsuario(){
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
      }
    });
  }
  MustMatch(matchingControlName: string) {
    const controlName = this.usuario.nip.toString(); 
    return (formGroup: FormGroup) => {
      const control = controlName;
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  loadModalTexts(): void {
  const { title, btnText, alertErrorText, alertSuccesText, modalMode} = this.data;
  this.title = title;
  this.btnText = btnText;
  this.alertSuccesText = alertSuccesText;
  this.alertErrorText = alertErrorText;
  this.modalMode = modalMode;

  }

}
