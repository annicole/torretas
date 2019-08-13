import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { Departamento } from '../../../models/departamento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  departamentos: Departamento[];
  constructor(private deptoService: DepartamentoService) { }

  ngOnInit() {
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

  delete(id: string) {
    Swal.fire({
      title: '¿Estas seguro?', text: "Desea eliminar el departamento",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {

    });
  }
}
