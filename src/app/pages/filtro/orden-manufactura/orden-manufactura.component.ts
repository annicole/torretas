import { Component, OnInit } from '@angular/core';
import { WoService } from '@app/services/wo.service';
import { EmpresaService } from '@app/services/empresa.service';
import { ContempService } from '@app/services/contemp.service';
import { UsuarioService } from '@app/services/usuario.service';
import { StatuswoService } from '@app/services/statuswo.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
//import { NuevoWoComponent } from '@app/pages/forms/nuevo-wo/nuevo-wo.component';
import { NuevoStatuswoComponent } from '@app/pages/forms/nuevo-statuswo/nuevo-statuswo.component';
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Wo } from '@app/models/wo';


@Component({
  selector: 'app-orden-manufactura',
  templateUrl: './orden-manufactura.component.html',
  styleUrls: ['./orden-manufactura.component.scss']
})
export class OrdenManufacturaComponent implements OnInit {
  id: string;
  token;
  maxDate: string;
  wo: [];
  form: FormGroup
  total: 0;
  empresa: [];
  contemp: [];
  usuario: [];
  statuswo: [];
  submitted = false;
  listNav = [
    { "name": "Orden de manufactura", "router": "/OrdenManufactura" },
    { "name": "Clientes y proveedores", "router": "/empresa" },
  ]
  constructor(
    private woService: WoService,
    private empresaService: EmpresaService,
    private contempService: ContempService,
    private usuarioService: UsuarioService,
    private statuswoService: StatuswoService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private auth: AuthService, private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.maxDate = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    console.log(this.maxDate);

    this.form = this.formBuilder.group({
      idwo: [],
      idempresa: ['', Validators.required],
      idcontacto: ['', Validators.required],
      idempleado: ['', Validators.required],
      fechasol: ['', Validators.required],
      fechavenoc: ['',Validators.required],
      idstatuswo: ['', Validators.required],
      woasig: ['', Validators.required],
      ocliente: ['', Validators.required],
      status: [],
      brief: [],
      fecharecoc: [],
      fechatermoc: [],
      cotizacion: [],
    });
    this.getOrdenManufactura('');
    this.getEmpresa('');
    
    this.getUsuarios('');
    this.getStatuswo('');
  }

  
  onChange(event) {
    this.id = event.target.value
    console.log("el id: " +this.id)
    this.getContemp();
  } 

  async getOrdenManufactura(searchValue: string) {
    try {
      let resp = await this.woService.get(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.wo = resp.response;
        console.log(this.wo)
        this.total = this.wo.length;
      }
    } catch (e) {
    }
  }

  async getEmpresa(searchValue: string) {
    try {
      let resp = await this.empresaService.getEmpresa(searchValue,this.auth.token).toPromise();
      if (resp.code == 200) {
        this.empresa = resp.response;
      }
    } catch (e) {
    }
  }
  async getContemp() {
    try {
      let resp = await this.contempService.getContemp(this.id,this.auth.token).toPromise();
      if (resp.code == 200) {
        this.contemp = resp.rescontemp;
      }
    } catch (e) {
    }
  }

  async getUsuarios(searchValue: string) {
    try {
      let resp = await this.usuarioService.getUsuario(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.usuario = resp.usuario;
      }
    } catch (e) {
    }
  }

  async getStatuswo(searchValue: string) {
    try {
      let resp = await this.statuswoService.getStatuswo(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.statuswo = resp.response;
      }
    } catch (e) {
    }
  }

  onSearchChange(searchValue: string) {
    this.getOrdenManufactura(searchValue);

  }

  fechaChanged() {
    this.form.value.fechasol = this.maxDate;
    this.form.controls['fechasol'].setValue(this.maxDate);
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
      let response = await this.woService.create(this.form.value, this.auth.token).toPromise();
      if (response.code == 200) {
        Swal.fire('Guardado', 'El registro ha sido guardado!', 'success');
        this.getOrdenManufactura('');
        this.submitted = false;
        this.form.reset({});
      }
    } catch (error) {
      Swal.fire('Error', 'No fue posible guardar el registro!', 'error');
    }
  }

  /*
  update(wo) {
    const dialogRef = this.dialog.open(NuevoWoComponent, {
      width: '40rem',
      data: {
        title: 'Editar Orden de Manufactura: ' + wo.idwo,
        btnText: 'Guardar',
        alertSuccesText: 'Producto modificado correctamente',
        alertErrorText: "No se puedo modificar el registro",
        modalMode: 'edit',
        _wo: wo
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getOrdenManufactura('');
    });
  } */

  delete(wo) {
    Swal.fire({
      title: '¿Desea eliminar el registro?', text: "",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.woService.delete(wo.idwo, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getOrdenManufactura('');
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

  newStatuswo() {
    const dialogRef = this.dialog.open(NuevoStatuswoComponent, {
      width: '30rem',
      data: {
        title: 'Nuevo status',
        btnText: 'Guardar',
        alertSuccesText: 'Agregado correctamente!',
        alertErrorText: "No se puedo guardar el registro!",
        modalMode: 'new'
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getStatuswo('');
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
