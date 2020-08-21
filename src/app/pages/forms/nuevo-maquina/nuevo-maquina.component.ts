import { Component, OnInit, Inject } from '@angular/core';
import { MaquinaService } from '@app/services/maquina.service';
import { AreaService } from '@app/services/area.service';
import { TipoEquipoService } from '@app/services/tipo-equipo.service';
import { ModuloInterfazService } from '@app/services/modulo-interfaz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Maquina } from '@app/models/maquina';
import { Area } from '@app/models/area';
import { TipoEquipo } from '@app/models/tipoEquipo';
import { ModuloInterfaz } from '@app/models/moduloInterfaz';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';

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
  tipos: TipoEquipo[];
  moduloInterfaz: ModuloInterfaz[];
  token;

  constructor(private maquinaService: MaquinaService, private areaService: AreaService,
    private formBuilder: FormBuilder, private router: Router, public dialogRef: MatDialogRef<NuevoMaquinaComponent>,
    private auth: AuthService, private tipoService: TipoEquipoService, private moduloService: ModuloInterfazService,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
    const disabled = this.data.idArea ? true : false;
    this.maquinaForm = this.formBuilder.group({
      maquina: ['', Validators.required],
      idarea: [{ value: '', disabled: disabled }, Validators.required],
      tipoequipo: ['', Validators.required],
      idmodulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      idmaquina: ['']
    });
    this.token = this.auth.token;
    this.getAreas();
    this.loadModalTexts();
    this.getTipos();
    this.getModulo();
  }

  async getAreas() {
    try {
      let resp = await this.areaService.getAreas("", this.token).toPromise();
      if (resp.code == 200) {
        this.areas = resp.area;
      }
    } catch (e) {
    }
  }

  async getTipos() {
    try {
      let resp = await this.tipoService.getTipos(this.token).toPromise();
      if (resp.code == 200) {
        this.tipos = resp.tipo_equipos;
      }
    } catch (error) {
    }
  }

  async getModulo() {
    try {
      let resp = await this.moduloService.getModuloInterfaz('',this.token).toPromise();
      if (resp.code == 200) {
        this.moduloInterfaz = resp.moduloI;
      }
    } catch (error) {    }
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
        case 'create': response = await this.maquinaService.create(this.maquinaForm.value, this.token).toPromise();
          break;
        case 'edit': response = await this.maquinaService.update(this.maquinaForm.value, this.token).toPromise();
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
      this.showAlert(e.error.message, false);
    }
  }

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, _maquina, idArea } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (_maquina) {
      //this.maquina = _maquina;
      const { idmaquina, descripcion, idarea, tipoequipo, idmodulo, maquina } = _maquina;
      this.maquinaForm.patchValue({ idmaquina, descripcion, idarea, tipoequipo, idmodulo, maquina });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
