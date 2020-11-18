import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { WoService } from '@app/services/wo.service';
import { WosubService } from '@app/services/wosub.service';
import Swal from 'sweetalert2';
import { Wo } from '@app/models/wo';
import { Wosub } from '@app/models/wosub';
import { Producto } from '@app/models/producto';
import { Empresa } from '@app/models/empresa';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { EmpresaService } from '../../../services/empresa.service';
import { ProductoService } from '../../../services/producto.service';
import { StatuswosubService } from '../../../services/statuswosub.service';

@Component({
  selector: 'app-nuevo-wo',
  templateUrl: './nuevo-wo.component.html',
  styleUrls: ['./nuevo-wo.component.scss'],
})

export class NuevoWoComponent implements OnInit {

  ide: string;
  id2: string;
  form: FormGroup;
  formc: FormGroup;
  submitted = false;
  wo: Wo = new Wo;
  token;
  idwo;
  status: string;
  total = 0;
  empresa: Empresa = new Empresa;
  producto: [];
  wosub: [];
  timp;
  statuswosub: [];

  constructor(
    private woService: WoService,
    private empresaService: EmpresaService,
    private productoService: ProductoService,
    private statuswosubService: StatuswosubService,
    private wosubService: WosubService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private activate: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.token = this.auth.token;
    this.idwo = this.activate.snapshot.paramMap.get('id');


    this.getWo();
    this.getStatuswosub('');
    this.getWosub();
    this.formc = this.formBuilder.group({
      idwo: ['', Validators.required],
      idempresa: ['', Validators.required],
      woasig: ['', Validators.required],
      ocliente: ['', Validators.required],

    });


    this.form = this.formBuilder.group({
      idwosub: [],
      idwo: [],
      descwosub: ['', Validators.required],
      puwosub: ['', Validators.required],
      idempresa: ['', Validators.required],
      idstwosub: ['', Validators.required],
      cantwosub: ['', Validators.required],
      idproducto: ['', Validators.required],
      nomemp: ['', Validators.required],
    });

  }

  async save() {
    try {
      this.form.value.descuentoemp = this.empresa.descuentoemp;
      this.form.value.idwo = this.idwo;
      let response = await this.wosubService.create(this.form.value, this.auth.token).toPromise();
      if (response.code == 200) {
        Swal.fire('Guardado', 'El registro ha sido guardado!', 'success');
        this.getWosub();
        this.submitted = false;
        this.form.reset({});
        console.log(this.form)
      }
    } catch (error) {
      Swal.fire('Error', 'No fue posible guardar el registro!', 'error');
    }
  }



  async getWo() {
    try {
      let resp = await this.woService.read(this.idwo, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.wo = resp.response;
        this.ide = this.wo.idempresa;
        this.getProducto();
      }
    } catch (e) {
    }
  }


  async getEmpresa() {
    try {
      let resp = await this.empresaService.getEmpresa(this.form.value.idempresa, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.empresa = resp.response;
      }
    } catch (e) {
    }
  }

  async getProducto() {
    console.log(this.ide);
    try {
      let resp = await this.productoService.get2(this.ide, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.producto = resp.response;
      }
    } catch (e) {
    }
  }

  async getStatuswosub(SearchValue: string) {
    try {
      let resp = await this.statuswosubService.get(SearchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.statuswosub = resp.response;
      }
    } catch (e) {
    }
  }

  async getWosub() {
    try {
      let resp = await this.wosubService.get(this.idwo, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.wosub = resp.response;
      }
    } catch (e) {
    }
  }


  delete(wosub) {
    this.wosubService.delete(wosub.idwosub, this.auth.token).subscribe(res => {
      if (res.code == 200) {
        Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
        this.getWosub();
      } else {
        Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
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

