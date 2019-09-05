import { Component, OnInit, Inject } from '@angular/core';
import { AreaService } from '../../../services/area.service';
import { CiaService } from '../../../services/cia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../../models/area';
import { Cia } from '../../../models/cia';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';

@Component({
  selector: 'app-nuevo-area',
  templateUrl: './nuevo-area.component.html',
  styleUrls: ['./nuevo-area.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class NuevoAreaComponent extends Dialog implements OnInit {

  area: Area = new Area();
  areaForm: FormGroup;
  submitted = false;
  cias: Cia[];

  constructor(
    private ciaService: CiaService, private areaService: AreaService,
    private formBuilder: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<NuevoAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      super();
    }

  ngOnInit() {
    this.areaForm = this.formBuilder.group({
      area: ['', Validators.required]
    });
    //this.getCias();
    this.area.idcia = 1;
    this.loadModalTexts();
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _area } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_area) {
      const { idarea, area } = _area;
      this.area.idarea = idarea;
      this.area.area = area;
    }
  }

  async getCias() {
    try {
      let resp = await this.ciaService.getCias().toPromise();
      if (resp.code == 200) {
        this.cias = resp.cia;
      }
    } catch (e) {
      console.log(e);
    }
  }

  get f() { return this.areaForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.areaForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response;
      switch (this.modalMode) {
        case 'create': response = await this.areaService.create(this.area).toPromise();
          break;
        case 'edit': response = await this.areaService.update(this.area).toPromise();
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

  closeModal() {
    this.dialogRef.close();
  }

}
