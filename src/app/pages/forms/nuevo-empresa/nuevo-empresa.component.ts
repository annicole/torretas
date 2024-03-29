import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { NuevoContempComponent } from '@app/pages/forms/nuevo-contemp/nuevo-contemp.component';
import { NuevoRelcompComponent } from '@app/pages/forms/nuevo-relacion/nuevo-relacion.component'
import { NuevoCondpagoComponent } from '@app/pages/forms/nuevo-condpago/nuevo-condpago.component'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { EmpresaService } from '@app/services/empresa.service';
import { RelcompService } from '@app/services/relcomp.service';
import { PaisService } from '@app/services/pais.service';
import { EstadoService } from '@app/services/estado.service';
import { CiudadService } from '@app/services/ciudad.service';
import { CondpagoService } from '@app/services/condpago.service';
import { ContempService } from '@app/services/contemp.service';
import Swal from 'sweetalert2';
import { Empresa } from '@app/models/empresa';
import { Contemp } from '@app/models/contemp';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nuevo-empresa',
  templateUrl: './nuevo-empresa.component.html',
  styleUrls: ['./nuevo-empresa.component.scss'],
})

export class NuevoEmpresaComponent implements OnInit {

  @Input() private contemps;

  id: string;
  id2: string;
  form: FormGroup;
  formc: FormGroup;
  submitted = false;
  relcomp: [];
  pais: [];
  estado: [];
  ciudad: [];
  condpago: [];
  contemp: [];
  statusemp: string;
  contem: Contemp = new Contemp;
  token;
  idempresa;
  empresa: Empresa = new Empresa;
  status: string;
  total = 0;
  idp: string;
  ide: string;

  constructor(
    private empresaService: EmpresaService,
    private relcompService: RelcompService,
    private paisService: PaisService,
    private estadoService: EstadoService,
    private ciudadService: CiudadService,
    private condpagoService: CondpagoService,
    private contempService: ContempService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private activate: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.token = this.auth.token;
    this.idempresa = this.activate.snapshot.paramMap.get('id');
    this.status = this.activate.snapshot.paramMap.get('status');
    this.getRelcomp();
    this.getPais('');
    this.getCondpago();
    this.getContemp();

    if (this.status === null) {
      
    } else if (this.status === 'edit') {
      this.getEmpresa();
      this.getContemp();
     // this.ToggleStatus();
    }
  
    this.formc = this.formBuilder.group({
      idcontemp: [],
      idempresa: [],
      nomcontemp: ['', Validators.required],
      depcontemp: ['', Validators.required],
      puestocontemp: ['', Validators.required],
      pbxcontemp: [],
      extcontemp: [],
      movcontemp: [],
      emailcontemp: [],
    });

    this.form = this.formBuilder.group({
      idempresa: [],
      nomemp: ['', Validators.required],
      nombcortemp: ['', Validators.required],
      calleemp: [''],
      numextemp: [''],
      numintemp: [''],
      colemp: [''],
      cpemp: [''],
      idpais: [''],
      idestado: [''],
      idciudad: [''],
      pbx1emp: [''],
      pbx2emp: [''],
      webemp: [''],
      idrelacion: ['', Validators.required],
      descuentoemp: [''],
      nomchequeemp: [''],
      numfiscalemp: [''],
      taxemp: [''],
      idcondpago: [''],
      activoemp: ['', Validators.required],
    });
  }

  onChange(event) {
    this.id = event.target.value
    console.log("el id: " + this.id)
    this.getEstado();
  }

  onChange2(event) {
    this.id2 = event.target.value
    console.log("el id2: " + this.id2)
    this.getCiudad();
  } 

  async getContemp() {
    try {
      let resp = await this.contempService.getContemp(this.idempresa, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.contemp = resp.rescontemp;
        this.total = this.contemp.length;
      }
    } catch (e) {
    }
  }

  get g() { return this.formc.controls; }

  get statusG() {
    if (this.status == 'edit')
      return this.status
  }

  onSubmitContemp() {
    this.submitted = true;
    if (this.status == null) {
      Swal.fire('', 'No existe la empresa, debes guardar una primero', 'error');
    } else if (this.formc.invalid) {
      return;
    } else {
      this.saveContemp();
    }
  }


  async saveContemp() {
      try {
        this.formc.value.idempresa = this.idempresa;
        let response = await this.contempService.create(this.formc.value, this.token).toPromise();
        if (response.code = 200) {
          Swal.fire('Guardado', 'Contacto guardado correctamente', 'success');
          this.getContemp();
          this.submitted = false;
          this.formc.reset({});
        }
      } catch (e) {
        Swal.fire('', 'No fue posible guardar el contacto', 'error');
      }
  }

  editar(contemp) {
    const dialogRef = this.dialog.open(NuevoContempComponent, {
      width: '40rem',
      data: {
        title: 'Editar Contacto: ' + contemp.nomcontemp,
        btnText: 'Guardar',
        alertSuccesText: 'Contacto modificado correctamente',
        alertErrorText: "No se puedo modificar el registro",
        modalMode: 'edit',
        _contemp: contemp
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getContemp();
    });
  }

  async getRelcomp() {
    try {
      let resp = await this.relcompService.get(this.token).toPromise();
      if (resp.code == 200) {
        this.relcomp = resp.response;
      }
    } catch (e) {
    }
  }


  async getPais(searchValue: string) {
    try {
      let resp = await this.paisService.get(searchValue,this.token).toPromise();
      if (resp.code == 200) {
        this.pais = resp.response;
      }
    } catch (e) {
    }
  }

  async getEstadoe(searchValue: string) {
    try {
      let resp = await this.estadoService.get(searchValue, this.token).toPromise();
      if (resp.code == 200) {
        this.estado = resp.response;
      }
    } catch (e) {
    }
  }

  async getCiudade(searchValue: string) {
    try {
      let resp = await this.ciudadService.get(searchValue, this.token).toPromise();
      if (resp.code == 200) {
        this.ciudad = resp.response;
      }
    } catch (e) {
    }
  }

  async getEstado() {
    try {
      let resp = await this.estadoService.get(this.id,this.token).toPromise();
      if (resp.code == 200) {
        this.estado = resp.response;
      }
    } catch (e) {
    }
  }

  async getCiudad() {
    try {
      let resp = await this.ciudadService.get(this.id2,this.token).toPromise();
      if (resp.code == 200) {
        this.ciudad = resp.response;
      }
    } catch (e) {
    }
  }

  async getCondpago() {
    try {
      let resp = await this.condpagoService.get(this.token).toPromise();
      if (resp.code == 200) {
        this.condpago = resp.response;
      }
    } catch (e) {
    }
  }

  async getEmpresa() {
    try {
      console.log(this.idempresa)
      let resp = await this.empresaService.read(this.idempresa, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.empresa = resp.empresa;
        this.idp = this.empresa.idpais.toString();
        this.ide = this.empresa.idestado.toString();
        this.getEstadoe(this.idp)
        this.getCiudade(this.ide)
      }
    } catch (e) {
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.update();
    }
  }

   update() {
    try {
      let response;
      switch (this.status) {
        case null:
          response = this.empresaService.create(this.empresa, this.token).toPromise();
          console.log(this.empresa)
          if (response.code = 200) {
            Swal.fire('Guardada', 'Empresa guardada correctamente', 'success');
            this.router.navigate(['/']);
           
          }
          else {
            Swal.fire('Error', 'No fue posible guardar la empresa', 'error');
          }
          break;

        case 'edit': response = this.empresaService.update(this.empresa, this.token)
          .subscribe(
            res => {
              console.log(res)
              this.empresa = res;
              this.getEmpresa();
            }
          )
          if (response.code = 200) {
            Swal.fire('', 'Empresa actualizada correctamente', 'success');
            this.getEmpresa();
          }
          else {
            Swal.fire('Error', 'No fue posible actualizar la empresa', 'error');
          }

          break;
      }
    }
    catch (e) {
      Swal.fire('Error', 'No fue posible actualizar la empresa', 'error');
    }

  }

  deleteContemp(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el equipo",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.contempService.delete(id, this.auth.token).subscribe(res => {
          console.log("se elimino")
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El Contacto ha sido eliminado correctamente', 'success');
            this.getContemp();
          } else {
            Swal.fire('Error', 'No fue posible eliminar la empresa', 'error');
          }
        });
      }
    });
  }

  newRelcomp() {
    const dialogRef = this.dialog.open(NuevoRelcompComponent, {
      width: '30rem',
      data: {
        title: 'Nueva relación comercial',
        btnText: 'Guardar',
        alertSuccesText: 'Agregado correctamente!',
        alertErrorText: "No se puedo guardar el registro!",
        modalMode: 'new'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getRelcomp();
    });
  }

  newCondpago() {
    const dialogRef = this.dialog.open(NuevoCondpagoComponent, {
      width: '30rem',
      data: {
        title: 'Nueva condición de pago',
        btnText: 'Guardar',
        alertSuccesText: 'Agregado correctamente!',
        alertErrorText: "No se puedo guardar el registro!",
        modalMode: 'new'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getRelcomp();
    });
  }


  ToggleStatusEmp() {
    console.log(this.form.value.activoemp)
    if (this.form.value.activoemp == 1) {
      this.statusemp = 'Activo';
      console.log('Activo')
    } else {
      this.statusemp = 'Inactivo';
      this.form.value.activoemp = 0;
      console.log('Inactivo')
    }
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
