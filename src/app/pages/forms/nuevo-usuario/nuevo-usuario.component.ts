import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../../../models/departamento';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  submitted = false;
  departamentos: Departamento[];
  constructor(private deptoService: DepartamentoService, private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioForm = this.formBuilder.group({
      username: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      celular: ['', Validators.required],
      iddep: ['', Validators.required]
    }, { validator: this.MustMatch('password', 'password2') });
    this.getDeptos();
  }

  async getDeptos() {
    try {
      let resp = await this.deptoService.getDepartamentos().toPromise();
      if (resp.code == 200) {
        this.departamentos = resp.depto;
        console.log(resp);
      }
    } catch (e) {
      console.log(e);
    }
  }


  get f() { return this.usuarioForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.usuarioForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response = await this.usuarioService.create(this.usuario).toPromise();
      if (response.code = 200) {
        Swal.fire('', 'Usuario guardado correctamente', 'success');
        this.router.navigate(['']);
      }
      else {
        Swal.fire('Error', 'No fue posible guardar el usuario', 'error');
      }
    } catch (e) {
      console.log(e);
      Swal.fire('Error', 'No fue posible guardar el usuario', 'error');
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
