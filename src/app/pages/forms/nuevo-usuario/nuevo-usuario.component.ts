import { Component, OnInit, Inject } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { UsuarioService } from '../../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '../../../models/departamento';
import { Usuario } from '../../../models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NuevoUsuarioComponent extends Dialog implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  submitted = false;
  departamentos: Departamento[];
  enabledDepartamento:boolean=false;

  constructor(private deptoService: DepartamentoService, private formBuilder: FormBuilder,
    private router: Router, private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

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
    this.loadModalTexts();
  }

  async getDeptos() {
    try {
      let resp = await this.deptoService.getDepartamentos("").toPromise();
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

  loadModalTexts() {
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, usuario,idDepto } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;

    if (usuario) {
      const { username, id, email, password, celular, iddep } = usuario;
      this.usuario.iddep = iddep;
      this.usuario.username = username;
      this.usuario.celular = celular;
      this.usuario.email = email;
      this.usuario.id = id;
    }

    if(idDepto){
      this.enabledDepartamento = true;
      this.usuario.iddep = idDepto;
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
