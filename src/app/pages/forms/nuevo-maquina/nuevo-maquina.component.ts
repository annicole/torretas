import { Component, OnInit, Inject } from '@angular/core';
import { MaquinaService } from '../../../services/maquina.service';
import { AreaService } from '../../../services/area.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Maquina } from '../../../models/maquina';
import { Area } from '../../../models/area';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';

@Component({
  selector: 'app-nuevo-maquina',
  templateUrl: './nuevo-maquina.component.html',
  styleUrls: ['./nuevo-maquina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NuevoMaquinaComponent extends Dialog implements OnInit {

  maquina: Maquina = new Maquina();
  maquinaForm: FormGroup;
  submitted = false;
  areas: Area[];

  constructor(private maquinaService: MaquinaService, private areaService: AreaService,
    private formBuilder: FormBuilder, private router: Router, public dialogRef: MatDialogRef<NuevoMaquinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
    this.maquinaForm = this.formBuilder.group({
      maquina: ['', Validators.required],
      idarea: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.getAreas();
    this.loadModalTexts();
  }

  async getAreas() {
    try {
      let resp = await this.areaService.getAreas().toPromise();
      console.log(resp);
      if (resp.code == 200) {
        this.areas = resp.area;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
    }
  }

  get f() { return this.maquinaForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.maquinaForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response;
      switch (this.modalMode) {
        case 'create': response = await this.maquinaService.create(this.maquina).toPromise();
          break;
        case 'edit': response = await this.maquinaService.update(this.maquina).toPromise();
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
      this.showAlert(this.alertErrorText, false);
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _maquina } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_maquina) {
      const { idmaquina, maquina, idarea, area, descripcion } = _maquina;
      this.maquina.idmaquina = idmaquina;
      this.maquina.maquina = maquina;
      this.maquina.idarea = idarea;
      this.maquina.area = area;
      this.maquina.descripcion = descripcion;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
