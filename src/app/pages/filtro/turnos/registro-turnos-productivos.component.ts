import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnosProductivosService } from '@app/services/turnos-productivos.service';
import { Turnos } from '../../../models/turnos';

@Component({
  selector: 'app-registro-turnos-productivos',
  templateUrl: './registro-turnos-productivos.component.html',
  styleUrls: ['./registro-turnos-productivos.component.scss']
})
export class TurnosProductivosComponent implements OnInit {

  form: FormGroup;
  total: number;
  submitted = false;
  listaTurnos: Turnos[];
  NumTurno = [];
  listNav = [
    { "name": "Control de Producción", "router": "/control" },
  ]
  constructor(
    private turnosproductivosService: TurnosProductivosService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private auth: AuthService, private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idturno: [],
      turno: ['', Validators.required],
      numturno: ['', [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
    });
    
    this.getTurnos('');
  }

  async getTurnos(searchValue: string) {
    try {
      let resp = await this.turnosproductivosService.get(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaTurnos = resp.response;
        console.log(this.listaTurnos)
        this.total = this.listaTurnos.length;
        let i;
        for (i = 1; i < 1000; i++) {
           this.NumTurno.push({ id: i });
        }

        for (i = 1; i < 1000; i++) {
          this.NumTurno.filter(t =>t.id == this.listaTurnos[i].numturno);
        }

        let filtered =  this.NumTurno.filter(t =>
          t.id != this.listaTurnos[i].numturno);
        console.log('Después de filtrar')
        filtered.forEach(t => console.log(t.id));

      }
    } catch (e) {
    }
  }

  onSearchChange(searchValue: string) {
    this.getTurnos(searchValue);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    console.log(this.form)
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.save();
    }
  }

  async save() {
    try {
      let response = await this.turnosproductivosService.create(this.form.value, this.auth.token).toPromise();
      if (response.code == 200) {
        Swal.fire('Guardado', 'El registro ha sido guardado!', 'success');
        this.getTurnos('');
        this.submitted = false;
        this.form.reset({});
      }
    } catch (error) {
      Swal.fire('Error', 'No fue posible guardar el registro!', 'error');
    }
  }

  update() {
  
  }

  delete(turnos) {
    Swal.fire({
      title: '¿Desea eliminar el turno?', text: "",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.turnosproductivosService.delete(turnos.idturno, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El turno ha sido borrado!', 'success');
            this.getTurnos('');
          } else {
            Swal.fire('Error', 'No fue posible borrar el turno!', 'error');
          }
        });
      }
    });
  }

  showSpinner() {
    const opt1: Spinner = {
      bdColor: "rgba(51,51,51,0.8)",
      size: "medium",
      color: "#fff",
      type: "square-jelly-box"
    };
    this.spinner.show("mySpinner", opt1);
  }

}