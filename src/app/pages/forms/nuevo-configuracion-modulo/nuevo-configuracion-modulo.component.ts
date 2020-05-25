import { Component, OnInit, Inject } from '@angular/core';
import { ConfiguracionModuloService } from '@app/services/configuracion-modulo.service';
import { ColorService } from '@app/services/color.service';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/services/auth.service'
import { EventoSensor } from '@app/models/eventoSensor';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

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
  validate = true;
  messageError;
  listNav=[
    {"name":"Perfil configuración", "router":"/perfilConfig"},
    {"name":"Agregar configuración", "router":"/configuracionModulo"}
  ]
  constructor(
    private configService: ConfiguracionModuloService,
    private activate: ActivatedRoute, private router: Router,
    private auth: AuthService, private colorService: ColorService,
  ) {
  }

  ngOnInit() {
    this.token = this.auth.token;
    this.listEstacion = Array(16).fill(null).map((x, i) => ({ 'estacion': i + 1 }));
    let idPerfil = this.activate.snapshot.paramMap.get('idPerfil');
    this.listNav[1].router ="/configuracionModulo/" + idPerfil;
    this.lisConfiguracion = Array(11).fill(null).map((x, i) => (
      {
        entrada: i + 1,
        tipoentrada: '',
        idevento: '',
        idperfil: idPerfil,
        listEstacion: Array(16).fill(null).map((x, i) => ({ 'id': 'estacion_' + (i + 1), 'checked': false }))
      }
    ));
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

  onSubmit() {
    this.submitted = true;
    this.validate = true;
    this.lisConfiguracion.forEach((key) => {
      if (key.tipoentrada === '' || key.idevento === '') {
        this.validate = false;
      }
    });
    if (!this.validate) {
      this.messageError = "¡Error! Los campos tipo entrada y evento no deben estar vacíos.";
      return;
    } else {
      this.guardar();
    }
  }
  
  async guardar() {
    try {
      let response = await this.configService.create(this.lisConfiguracion, this.token).toPromise();

      if (response.code == 200) {
        Swal.fire('Se guardó correctamente la configuración!', '', 'success');
        this.router.navigate(['/perfilConfig']);
      }
      else {
        this.validate = false;
      }
    } catch (e) {
      console.log(e);
      this.messageError = "Error al guardar la configuración!"
      this.validate = false;
    }
  }

  onFilterChange(eve: any, index, key: string) {
    //la entrada 1 es igual a  9
    //Entrada 2 igual 10
    //Entrada 3 igual 11
    let indexChange;
    switch (index) {
      case 0:
        indexChange = 8;
        break;
      case 1:
        indexChange = 9;
        break;
      case 2:
        indexChange = 10;
        break;
    }
    if (indexChange !== undefined) {
      let objectConfig = this.lisConfiguracion[indexChange];
      objectConfig[key] = eve;
    }
  }

  trackByFn(index, item) {
    return index;
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
  }
}
