import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-funcion-usu',
  templateUrl: './funcion-usu.component.html',
  styleUrls: ['./funcion-usu.component.scss']
})
export class  FuncionUsuComponent extends Dialog implements OnInit {

  formFuncusu: FormGroup;
  submitted = false;
  listaFuncusu: [];
  token;
  id: number;
  
  constructor(
    // private funcusuService: CatalogoFuncionesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FuncionUsuComponent>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    super(); 
  }

  ngOnInit() {
    this.formFuncusu = this.formBuilder.group({
      funcusu: ['',Validators.required],
    });
    this.token = this.auth.token;
    this.loadModalTexts();
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, id } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;
    this.id = id
  }

  closeModal() {
    this.dialogRef.close();
  }
}
