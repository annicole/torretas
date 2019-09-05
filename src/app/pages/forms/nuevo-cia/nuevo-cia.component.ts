import { Component, OnInit } from '@angular/core';
import { CiaService } from '../../../services/cia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cia } from '../../../models/cia';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-cia',
  templateUrl: './nuevo-cia.component.html',
  styleUrls: ['./nuevo-cia.component.css']
})
export class NuevoCiaComponent implements OnInit {

  cia: Cia = new Cia();
  ciaForm: FormGroup;
  submitted = false;
  formData:FormData= new FormData();
  constructor(private ciaService: CiaService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.cia.logotipo = new FormData();
    this.ciaForm = this.formBuilder.group({
      razon: ['', Validators.required],
      nombre: ['', Validators.required],
      rfc: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      cp: ['', Validators.required],
      eslogan: ['', Validators.nullValidator]
    });
  }

  get f() { return this.ciaForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.ciaForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response = await this.ciaService.create(this.cia).toPromise();
      if (response.code = 200) {
        Swal.fire('', 'Cia guardado correctamente', 'success');
        this.router.navigate(['']);
      }
      else {
        Swal.fire('Error', 'No fue posible guardar el cia', 'error');
      }
    } catch (e) {
      console.log(e);
      Swal.fire('Error', 'No fue posible guardar el cia', 'error');
    }
  }

  selectFile(file) {
     this.cia.logotipo= file;
  }
}
