import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RespiradorService } from '@app/services/respirador.service';
import { AuthService } from '@app/services/auth.service';

export interface Registro {
  cpresion: string,
  ctexalacion: string,
  ctinalacion: string,
  cbpm: number,
  cflujo: number,
  crelacion: number,
  eencendido: number,
  eflujo: string,
  eoxigeno: string,
  eoximetro: number,
  epresion: string,
  eritmoc: number,
  ns: string,
  eerror: number
}

@Component({
  selector: 'app-respirador',
  templateUrl: './respirador.component.html',
  styleUrls: ['./respirador.component.scss']
})
export class RespiradorComponent implements OnInit {
  listInfo = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;
  listNav = [
    { "name": "Respiradores", "router": "/respirador" },
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private auth: AuthService,
    private respiradorService: RespiradorService) {
  }

  ngOnInit() {
    this.getInfoRespirador();
    this.dataSource = new MatTableDataSource<Registro>(this.listInfo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getInfoRespirador() {
    try {
      let resp = await this.respiradorService.getInfoRespirador('0', this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listInfo = resp.respirador;
        console.log(this.listInfo);
      }
    } catch (e) {
      console.log(e);
    }
  }

}
