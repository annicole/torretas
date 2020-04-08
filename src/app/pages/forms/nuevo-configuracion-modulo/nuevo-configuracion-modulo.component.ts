import { Component, OnInit, Inject } from '@angular/core';
import { ConfiguracionModuloService } from '@app/services/configuracion-modulo.service';
import { ColorService } from '@app/services/color.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service'
import { EventoSensor } from '@app/models/eventoSensor';
import { ConfiguracionModulo } from '@app/models/configuracionModulo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-configuracion-modulo',
  templateUrl: './nuevo-configuracion-modulo.component.html',
  styleUrls: ['./nuevo-configuracion-modulo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NuevoConfiguracionModuloComponent implements OnInit {

  submitted = false;
  token;
  listEventos: EventoSensor[];
  lisConfiguracion: Array<ConfiguracionModulo>;
  listEstacion;
  constructor(
    private configService: ConfiguracionModuloService,
    private formBuilder: FormBuilder,private activate: ActivatedRoute,
    private auth: AuthService, private colorService: ColorService,
  ) {
  }

  ngOnInit() {
    this.token = this.auth.token;
    this.listEstacion = Array(16).fill(null).map((x, i) => i + 1);
    this.lisConfiguracion = Array(11).fill(new ConfiguracionModulo(this.activate.snapshot.paramMap.get('idPerfil')));
    console.log(this.lisConfiguracion);
    this.getEventos();
  }

  /*loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;
  }*/

  async getEventos() {
    try {
      let resp = await this.colorService.getColors(this.token).toPromise();
      if (resp.code == 200) {
        this.listEventos = resp.eventos;
      }
    } catch (e) {
      console.log(e);
    }
  }

 /* async guardar() {
    try {
      let response;
      /*switch (this.modalMode) {
        case 'create': response = await this.configService.create('', this.token).toPromise();
          break;
        case 'edit': response = await this.perfilService.update(this.form.value, this.token).toPromise();
          break;
      }
      if (response.code == 200) {
        this.showAlert(this.alertSuccesText, true);
        this.closeModal();
      }
      else {
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      console.log(e);
      this.showAlert(e.error.message, false);
    }
  }*/

  onFilterChange(eve: any,item) {
    item.tipoentrada = eve;
    console.log(item)
  }

  trackByFn(index, item) {
    return index;
  }

  onChange(eve,conf){
    conf.idevento = eve;
    console.log(conf)
  }
}
