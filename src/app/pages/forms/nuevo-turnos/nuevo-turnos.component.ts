import { Component, OnInit, Inject, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { NuevoDiaTurnoComponent } from '@app/pages/forms/nuevo-diaturno/nuevo-diaturno.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import Swal from 'sweetalert2';
import { TurnosProductivosService } from '@app/services/turnos-productivos.service';
import { DiaTurnoService } from '@app/services/diaturno.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nuevo-turnos',
  templateUrl: './nuevo-turnos.component.html',
  styleUrls: ['./nuevo-turnos.component.scss'],
})
export class NuevoTurnosComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  listaDiaturnos: any = [];
  anterior;
  token;
  idurl;
  checked: Boolean;
  NumT: any[];
  NumC: any[];
  diaturn: Date;
  diaturn2: Date;

  listNav = [
    { "name": "Turnos Productivos", "router": "/TurnosProductivos" },
  ]

  DiaSemana: any[] = [
    { id: 1, dia: 'Lunes' },
    { id: 2, dia: 'Martes' },
    { id: 3, dia: 'Miercoles' },
    { id: 4, dia: 'Jueves' },
    { id: 5, dia: 'Viernes' },
    { id: 6, dia: 'Sabado' },
    { id: 7, dia: 'Domingo' },
  ];

  DiaSemana2: any[] = [
    { id: 1, dia: 'Lunes' },
    { id: 2, dia: 'Martes' },
    { id: 3, dia: 'Miercoles' },
    { id: 4, dia: 'Jueves' },
    { id: 5, dia: 'Viernes' },
    { id: 6, dia: 'Sabado' },
    { id: 7, dia: 'Domingo' },
  ];

    DiaTurno: any[] = [
      { id: 1},
      { id: 2},
      { id: 3},
      { id: 4},
      { id: 5},
      { id: 6},
      { id: 7},
    ];

  TipoSegmento: any[] = [
    { id: 1, segmento: 'Unico' },
    { id: 2, segmento: 'Inicial' },
    { id: 3, segmento: 'Intermedio' },
    { id: 4, segmento: 'Final' },
  ];


  constructor(
    private turnosproductivosService: TurnosProductivosService,
    private diaturnoService: DiaTurnoService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private activate: ActivatedRoute,
    private datePipe: DatePipe, 
  ) {
  }

  ngOnInit() {
    this.idurl = this.activate.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      iddiaturno: [],
      idturno: [],
      diasem: ['', Validators.required],
      hrenttur: ['', Validators.required],
      diasemter: ['', Validators.required],
      hrentturter: ['', Validators.required],
      duracion: [],
      tiempoefec: [0, Validators.required],
      tiposeg: ['', Validators.required],
      diaturno: ['', Validators.required],
    });
    this.token = this.auth.token;
    this.getDiaturno();
    console.log(this.form.value.tiempoefec)
  }

  ngAfterContentChecked() {

  }

  async getDiaturno() {
    try {
      let resp = await this.diaturnoService.get(this.idurl, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaDiaturnos = resp.response;
        this.form.value.tiempoefec = 0;
        let anteriord = this.listaDiaturnos.length - 1;
        this.NormalizaDia(this.listaDiaturnos);
        this.NormalizaDia2(this.listaDiaturnos);
        this.NormalizaSeg(this.listaDiaturnos);
        this.NormalizaTiempo(this.listaDiaturnos);
        console.log(this.listaDiaturnos)
        /*
        let secDiff = Math.floor((this.listaDiaturnos[0].hrenttur) / 10);
        let v = this.listaDiaturnos[0].hrenttur.replace(':', '');
        v = v.replace(':', '')
        let d = this.listaDiaturnos[0].duracion;

        var horas = v.substring(0, 2);
        console.log(horas)
        let minutos = v.substring(2, 4);
        console.log(minutos)
        let segundos = v.substring(4, 6);

        var h = Number(horas);
        var m = Number(minutos);
        var s = Number(segundos);

        let i;
        for (i = 0; i < this.listaDiaturnos.length; i++) {
          this.NumT = this.DiaTurno.filter(t => t.id !== this.listaDiaturnos[i].diaturno);
          this.NumC = this.NumT;
          this.DiaTurno = this.NumC;
        }*/
        
      }
    } catch (e) {
    }
  }

  DiaChange(dia) {
    if (dia == '1') {
      this.form.value.diasem = 1;
    }
    else if (dia == '2') {
      this.form.value.diasem = 2;
    }
    else if (dia == '3') {
      this.form.value.diasem = 3;
    }
    else if (dia == '4') {
      this.form.value.diasem = 4;
    }
    else if (dia == '5') {
      this.form.value.diasem = 5;
    }
    else if (dia == '6') {
      this.form.value.diasem = 6;
    }
    else if (dia == '7') {
      this.form.value.diasem = 7;
    }
  }

  DiaChange2(dia) {
    if (dia == '1') {
      this.form.value.diasemter = 1;
    }
    else if (dia == '2') {
      this.form.value.diasemter = 2;
    }
    else if (dia == '3') {
      this.form.value.diasemter = 3;
    }
    else if (dia == '4') {
      this.form.value.diasemter = 4;
    }
    else if (dia == '5') {
      this.form.value.diasemter = 5;
    }
    else if (dia == '6') {
      this.form.value.diasemter = 6;
    }
    else if (dia == '7') {
      this.form.value.diasemter = 7;
    }
  }

  DiaTurnoChange(diat) {
    if (diat == '1') {
      this.form.value.diaturno = 1;
    }
    else if (diat == '2') {
      this.form.value.diaturno = 2;
    }
    else if (diat == '3') {
      this.form.value.diaturno = 3;
    }
    else if (diat == '4') {
      this.form.value.diaturno = 4;
    }
    else if (diat == '5') {
      this.form.value.diaturno = 5;
    }
    else if (diat == '6') {
      this.form.value.diaturno = 6;
    }
    else if (diat == '7') {
      this.form.value.diaturno = 7;
    }
  }

  SegmentoChange(segmento) {
    if (segmento == '1') {
      this.form.value.tiposeg = 1;
    }
    else if (segmento == '2') {
      this.form.value.tiposeg = 2;
    }
    else if (segmento == '3') {
      this.form.value.tiposeg = 3;
    }
    else if (segmento == '4') {
      this.form.value.tiposeg = 4;
    }
  }


  NormalizaDia(turnos: Array<any>) {
    for (const turno of turnos) {
      if(turno.diasem === 1) {
        turno.nombre_dia = 'Lunes'
      }
      if (turno.diasem === 2) {
        turno.nombre_dia = 'Martes'
      }
      if (turno.diasem === 3) {
        turno.nombre_dia = 'Miercoles'
      }
      if (turno.diasem === 4) {
        turno.nombre_dia = 'Jueves'
      }
      if (turno.diasem === 5) {
        turno.nombre_dia = 'Viernes'
      }
      if (turno.diasem === 6) {
        turno.nombre_dia= 'Sabado'
      }
      if (turno.diasem === 7) {
        turno.nombre_dia = 'Domingo'
      }
    }
  }

  NormalizaDia2(turnos: Array<any>) {
    for (const turno of turnos) {
      if (turno.diasemter === 1) {
        turno.nombre_dia2 = 'Lunes'
      }
      if (turno.diasemter === 2) {
        turno.nombre_dia2 = 'Martes'
      }
      if (turno.diasemter === 3) {
        turno.nombre_dia2 = 'Miercoles'
      }
      if (turno.diasemter === 4) {
        turno.nombre_dia2 = 'Jueves'
      }
      if (turno.diasemter === 5) {
        turno.nombre_dia2 = 'Viernes'
      }
      if (turno.diasemter === 6) {
        turno.nombre_dia2 = 'Sabado'
      }
      if (turno.diasemter === 7) {
        turno.nombre_dia2 = 'Domingo'
      }
    }
  }

  NormalizaSeg(segmentos: Array<any>) {
    for (const segmento of segmentos) {
      if (segmento.tiposeg === 1) {
        segmento.nombre_seg = 'Unico'
      }
      if (segmento.tiposeg === 2) {
        segmento.nombre_seg = 'Inicial'
      }
      if (segmento.tiposeg === 3) {
        segmento.nombre_seg = 'Intermedio'
      }
      if (segmento.tiposeg === 4) {
        segmento.nombre_seg = 'Final'
      }
    }
  }


  NormalizaTiempo(tiempos: Array<any>) {
    for (const tiempo of tiempos) {
      if (tiempo.tiempoefec === 1) {
        tiempo.efec = 'Efectivo';
      }
      if (tiempo.tiempoefec === 0) {
        tiempo.efec = 'No Efectivo';
      }
    }
  }

  ToggleEfec() {
    if (this.form.value.tiempoefec == false) {
      this.form.value.tiempoefec = 0;
      console.log(this.form.value.tiempoefec)
    } else {
      this.form.value.tiempoefec = 1;
      console.log(this.form.value.tiempoefec)
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.save();
    }
  }

  async save() {
 
    try {
      this.form.value.idturno = this.idurl;
      let response = await this.diaturnoService.create(this.form.value, this.auth.token).toPromise();
      if (response.code == 200) {
        Swal.fire('Guardado', 'El registro ha sido guardado!', 'success');
        this.getDiaturno();
        this.submitted = false;
        this.form.reset({});
        this.form.value.tiempoefec = 0;
      }
    } catch (error) {
      Swal.fire('Error', 'No fue posible guardar el registro!', 'error');
    }
  }

update(diaturno) {
  const dialogRef = this.dialog.open(NuevoDiaTurnoComponent, {
    width: '15rem',
  data: {
    title: 'Tiempo efectivo: ',
    btnText: 'Guardar',
    alertSuccesText: 'Tiempo efectivo modificado correctamente',
    alertErrorText: "No se puedo modificar el registro",
    modalMode: 'edit',
    _diaturno: diaturno
  }
});

dialogRef.afterClosed().subscribe(data => {
  this.getDiaturno();
});
} 

  delete(obj) {
    Swal.fire({
      title: '¿Desea eliminar el registro?', text: "",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.diaturnoService.delete(obj.iddiaturno, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getDiaturno();
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

}
