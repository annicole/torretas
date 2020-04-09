import { Component, OnInit, Inject } from '@angular/core';
import { ConfiguracionModuloService } from '@app/services/configuracion-modulo.service';
import { ColorService } from '@app/services/color.service';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/services/auth.service'
import { EventoSensor } from '@app/models/eventoSensor';
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
  lisConfiguracion = [];
  listEstacion = [];
  constructor(
    private configService: ConfiguracionModuloService,
    private activate: ActivatedRoute,
    private auth: AuthService, private colorService: ColorService,
  ) {
  }

  ngOnInit() {
    this.token = this.auth.token;
    this.listEstacion = Array(16).fill(null).map((x, i) => ({ 'estacion': i + 1 }));
    let idPerfil = this.activate.snapshot.paramMap.get('idPerfil');
    this.lisConfiguracion = Array(11).fill(null).map((x, i) => (
      {
        entrada: i + 1,
        tipoentrada: '',
        idevento: 0,
        idperfil: idPerfil,
        listEstacion: Array(16).fill(null).map((x, i) => ({ 'id': 'estacion_' + (i + 1), 'checked': false }))
      }
    ));
    console.log(this.lisConfiguracion);
    this.getEventos();
  }

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

  onFilterChange(eve: any, index) {
    console.log(this.lisConfiguracion)
  }

  trackByFn(index, item) {
    return index;
  }

  onChange(eve, index) {
    console.log(this.lisConfiguracion)
  }

  onEstacionChange(eve: any) {

    this.lisConfiguracion.forEach((key) => {
      key.listEstacion.forEach(estacion => {
        if (estacion.id === eve.id && estacion.checked) {
          estacion.checked = false;
        }
      })
    });
    eve.checked = !eve.checked;
    console.log(this.lisConfiguracion)
  }
}
