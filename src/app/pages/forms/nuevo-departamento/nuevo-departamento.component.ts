import { Component, OnInit, Inject } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { CiaService } from '../../../services/cia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../../../models/departamento';
import { Cia } from '../../../models/cia';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-nuevo-departamento',
  templateUrl: './nuevo-departamento.component.html',
  styleUrls: ['./nuevo-departamento.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class NuevoDepartamentoComponent implements OnInit {

  departamento: Departamento = new Departamento();
  departamentoForm: FormGroup;
  submitted = false;
  cias: Cia[];
  alertMessage: String; 
  alertSuccess: Boolean;
  title: String;
  btnText: String;
  alertSuccesText: String;
  alertErrorText: String;
  modalMode: String;

  constructor(
    private ciaService: CiaService,
    private deptoService: DepartamentoService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NuevoDepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.departamentoForm = this.formBuilder.group({
      departamento: ['', Validators.required],
    });
    this.departamento.idcia = 1;
    // this.getCias();
    this.loadModalTexts();
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, depto } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (depto) {
      const { iddep, departamento } = depto;
      this.departamento.departamento = departamento;
      this.departamento.iddep = iddep;
    }
  }

  async getCias() {
    try {
      let resp = await this.ciaService.getCias().toPromise();
      if (resp.code == 200) {
        this.cias = resp.cia;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  get f() { return this.departamentoForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.departamentoForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response;
      switch (this.modalMode) {
        case 'create': response = await this.deptoService.create(this.departamento).toPromise();
          break;
        case 'edit': response = await this.deptoService.update(this.departamento).toPromise();
          break;
      }
      if (response.code = 200) {
        this.showAlert(this.alertSuccesText, true);
      }
      else {
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      console.log(e);
      this.showAlert(this.alertErrorText, false);
    }
  }

  showAlert(message, isSuccess) {
    this.alertMessage = message;
    this.alertSuccess = isSuccess;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
