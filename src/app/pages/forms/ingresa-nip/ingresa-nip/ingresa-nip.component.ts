import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Dialog } from '@app/classes/Dialog';
import { Usuario } from '@app/models/usuario';

@Component({
  selector: 'app-ingresa-nip',
  templateUrl: './ingresa-nip.component.html',
  styleUrls: ['./ingresa-nip.component.scss']
})
export class IngresaNipComponent extends Dialog implements OnInit  {

  usuario: Usuario = new Usuario();
  IngresaNipForm: FormGroup;
  submitted = false;
  

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
    this.IngresaNipForm = this.formBuilder.group({
      nip:['',Validators.required]
    });
  }

  get f() { return this.IngresaNipForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.IngresaNipForm.invalid) {
      return;
    } else {
      //this.guardar();
    }
  }
  closeModal(): void {
    
  }

  loadModalTexts(): void {
  const { title, btnText, alertErrorText, alertSuccesText, modalMode, usuario,idDepto } = this.data;
  this.title = title;
  this.btnText = btnText;
  this.alertSuccesText = alertSuccesText;
  this.alertErrorText = alertErrorText;
  this.modalMode = modalMode;
  
  }

}
