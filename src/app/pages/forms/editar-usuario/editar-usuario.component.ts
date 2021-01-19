import { Component, OnInit, Inject } from '@angular/core';
import { DepartamentoService } from '@app/services/departamento.service';
import { UsuarioService } from '@app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '@app/models/departamento';
import { Usuario } from '@app/models/usuario';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import { CambiarContrComponent } from '../cambiar-contr/cambiar-contr.component';
import { CambiarNipComponent } from '../cambiar-nip/cambiar-nip.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditarUsuarioComponent extends Dialog implements OnInit {

  usuario: Usuario = new Usuario();
  usuarioForm: FormGroup;
  submitted = false;
  departamentos: Departamento[];
  enabledDepartamento:boolean=false;
  token;
  tipousuario: string;
  sistema:boolean = false;
  auxnip2:string = '';
  auxpassword2:string = '';
  statusUsu: string;

  constructor(private deptoService: DepartamentoService, private formBuilder: FormBuilder,
     private usuarioService: UsuarioService, private auth: AuthService,private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    super();
  }

  ngOnInit() {
    const disabled = this.data.idDepto ? true : false;
    this.loadModalTexts();
    if(this.sistema){
      this.usuarioForm = this.formBuilder.group({
        nip: ['', Validators.required,],
        nip2:['', Validators.required,],
        password: ['', [Validators.required,Validators.min(6)]],
        password2: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        celular: ['',],
        activousu: ['', Validators.required],
      }, 
      { validator: [this.MustMatch('password', 'password2'), this.MustMatch('nip', 'nip2')] });
    }else{
      this.usuarioForm = this.formBuilder.group({
        nip: ['', Validators.required,],
        nip2:['', Validators.required,],
        correo: ['', [Validators.required, Validators.email]],
        celular: ['',],
        activoemp: ['', Validators.required],
      }, 
      { validator: [this.MustMatch('nip', 'nip2')] });
    }
    this.token= this.auth.token;
    this.getDeptos();

  }

  async getDeptos() {
    try {
      let resp = await this.deptoService.getDepartamentos("",this.token).toPromise();
      if (resp.code == 200) {
        this.departamentos = resp.depto;
      }
    } catch (e) {
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
      let response = await this.usuarioService.create(this.usuario,this.token).toPromise();
      if (response.code = 200) {
        this.showAlert(this.alertSuccesText, true);
        this.closeModal();
      }
      else {
      console.log('AlertError');
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      console.log('error');
      this.showAlert(e.error.message, false);
    }
  }

  updatePassword() {
    const dialogRef = this.dialog.open(CambiarContrComponent, {
      //width: '25rem',
      data: {
        title: 'Cambiar Contraseña',
        btnText: 'Cambiar',
        alertSuccesText: 'Entraste!',
        alertErrorText: "No se puede actualizar el usuario",
        modalMode: 'create',
        // username:usuario.username,
        // Username_last:usuario.Username_last,
        // iddep:usuario.iddep,
        // idevento:usuario.idevento,
        usuario:this.usuario,
        tipousuario:'sistema',
        //status: usuario.activousr,
      }
    });
  }
  updateNip() {
    const dialogRef = this.dialog.open(CambiarNipComponent, {
      //width: '25rem',
      data: {
        title: 'Cambiar NIP',
        btnText: 'Cambiar',
        alertSuccesText: 'Entraste!',
        alertErrorText: "No se puede actualizar el usuario",
        modalMode: 'create',
        // username:usuario.username,
        // Username_last:usuario.Username_last,
        // iddep:usuario.iddep,
        // idevento:usuario.idevento,
        usuario:this.usuario,
        tipousuario:'sistema',
        //status: usuario.activousr,
      }
    });
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
    const { title, btnText, alertErrorText, alertSuccesText, modalMode, username, Username_last, iddep, idevento, tipousuario,usuario,idDepto, } = this.data;
    this.title = title;
    this.btnText = btnText;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.modalMode = modalMode;
    this.usuario.username = username;
    this.usuario.Username_last = Username_last;
    this.usuario.iddep = parseInt(iddep);
    this.usuario.idevento = parseInt(idevento);  
    this.tipousuario=tipousuario;
    this.usuario = usuario;
    if(tipousuario){
      this.sistema=true;
    }
    if(idDepto){
      this.enabledDepartamento = true;
      this.usuario.iddep = idDepto;
    }
    console.log(this.usuario)
  }

  closeModal() {
    this.dialogRef.close();
  }
  

  ToggleStatusUsu() {
    console.log(this.usuarioForm.value.activousu)
    if (this.usuarioForm.value.activousu == 1) {
      this.statusUsu = 'Activo';
      console.log('Activo')
    } else {
      this.statusUsu = 'Inactivo';
      this.usuarioForm.value.activoemp = 0;
      console.log('Inactivo')
    }
  }

}
