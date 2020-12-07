import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoEmpresaComponent } from '@app/pages/forms/nuevo-empresa/nuevo-empresa.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '@app/services/auth.service';
import { EmpresaService } from '@app/services/empresa.service';
import { RelcompService } from '@app/services/relcomp.service';
import { ContempService } from '@app/services/contemp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from '../../../models/empresa';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  form: FormGroup;
  empresa: Empresa[];
  total: number = 0;
  listaRelcomp: [];
  activoemp = '1';
  status: string;
  s: number = 1; 
  statusr: any[] = [
    { activoem: 0, statuse: 'Todos'},
    { activoem: 1, statuse: 'Activo'},
    { activoem: 2, statuse: 'Inactivo'},
  ];

  listNav = [
    { "name": "Orden de manufactura", "router": "/OrdenManufactura" },
    { "name": "Clientes y proveedores", "router": "/empresa" },
  ]

  constructor(
    private empresaService: EmpresaService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private relcompService: RelcompService,
    private activatedRoute: ActivatedRoute,
    private contempService: ContempService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    
    this.getEmpresa();  
    this.StatusEmp('');
  }

  StatusEmp(activoem) {
    if (activoem == '0') {
      this.activoemp = '';
      this.getEmpresa();
      console.log('Todos')
    }
    else if (activoem == '1') {
      this.activoemp = '1';
      this.getEmpresa();
      console.log('Activo')

    } else if (activoem == '2') {
      this.activoemp = '0';
      this.getEmpresa();
      console.log('Inactivo')
    }  
  }


  async getEmpresa() {
    try {
      let resp = await this.empresaService.getEmpresa2(this.activoemp, this.auth.token).toPromise();
      console.log(resp)
      if (resp.code == 200) {
        this.empresa = resp.response;
        this.total = this.empresa.length;
      }
    } catch (e) {
    }
  }

  add() {
    this.router.navigate(['/empresa/add']);
    this.getEmpresa();
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar la empresa",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.empresaService.delete(id, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'La Empresa ha sido eliminada correctamente', 'success');
            this.getEmpresa();
          } else {
            Swal.fire('Error', 'No fue posible eliminar la empresa', 'error');
          }
        });
        this.contempService.deleteall(id, this.auth.token).subscribe(res => {
          console.log("se eliminaron")
          if (res.code == 200) {
           // Swal.fire('Eliminados', 'Los contactos se han eliminados', 'success');
          } else {
           // Swal.fire('Error', 'No fue posible eliminar los contactos', 'error');
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
