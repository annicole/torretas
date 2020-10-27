import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@app/classes/Dialog';
import { IngresaNipComponent } from '@app/pages/forms/ingresa-nip/ingresa-nip/ingresa-nip.component';

@Component({
  selector: 'app-catalogo-funciones',
  templateUrl: './catalogo-funciones.component.html',
  styleUrls: ['./catalogo-funciones.component.css']
})
export class CatalogoFuncionesComponent extends Dialog implements OnInit {
  
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CatalogoFuncionesComponent>,
    //private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
    this.loadModalTexts();
  }

  onSubmit(){
    console.log("Submitted");
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
  }
}
