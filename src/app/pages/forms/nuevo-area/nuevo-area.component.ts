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

@Component({
  selector: 'app-nuevo-area',
  templateUrl: './nuevo-area.component.html',
  styleUrls: ['./nuevo-area.component.scss']
})
export class NuevoAreaComponent implements OnInit {

  area: Area = new Area();
  areaForm: FormGroup;
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
    private ciaService: CiaService, private areaService: AreaService,
    private formBuilder: FormBuilder, private router: Router,
    public dialogRef: MatDialogRef<NuevoAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.areaForm = this.formBuilder.group({
      area: ['', Validators.required]
    });
    //this.getCias();
    this.area.idcia = 1;
    this.loadModalTexts();
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, area } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (area) {
      const { idarea, _area } = area;
      this.area.idarea = idarea;
      this.area.area = _area;
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
      let response = await this.areaService.create(this.area).toPromise();
      if (response.code = 200) {
        Swal.fire('', 'Área guardada correctamente', 'success');
        this.router.navigate(['']);
      }
      else {
        Swal.fire('Error', 'No fue posible guardar el área', 'error');
      }
    } catch (e) {
      console.log(e);
      Swal.fire('Error', 'No fue posible guardar el área', 'error');
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
