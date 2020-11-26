import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NuevoEmpresaComponent } from '@app/pages/forms/nuevo-empresa/nuevo-empresa.component';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '@app/services/auth.service';
import { EmpresaService } from '@app/services/empresa.service';
import { RelcompService } from '@app/services/relcomp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  empresa: Empresa[];
  total: number = 0;
  listaRelcomp: [];
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
    private router: Router,
  ) { }

  ngOnInit() {
    this.getEmpresa("");
  }

  async getEmpresa(searchValue: string) {
    try {
      let resp = await this.empresaService.getEmpresa(searchValue, this.auth.token).toPromise();
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
    this.getEmpresa("");
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el equipo",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.empresaService.delete(id, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'La Empresa ha sido eliminada correctamente', 'success');
            this.getEmpresa("");
          } else {
            Swal.fire('Error', 'No fue posible eliminar la empresa', 'error');
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

  onSearchChange(searchValue: string) {
    this.getEmpresa(searchValue);
  }
}
