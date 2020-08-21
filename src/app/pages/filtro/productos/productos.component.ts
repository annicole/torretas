import { Component, OnInit } from '@angular/core';
import { ProductoService } from '@app/services/producto.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";
import { NuevoProductoComponent } from '@app/pages/forms/nuevo-producto/nuevo-producto.component';
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{UmService} from '@app/services/um.service'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  listaProductos: [];
  form:FormGroup
  total: number;
  listaUm:[];
  submitted = false;
  listNav = [
    { "name": "Producto", "router": "/producto" },
    { "name": "Subensamble", "router": "/subensamble" },
    { "name": "Materia Prima", "router": "/materiaPrima" }
  ]
  constructor(private productoService: ProductoService,
    private dialog: MatDialog, private spinner: NgxSpinnerService,
    private auth: AuthService,private formBuilder:FormBuilder,private umService:UmService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      producto: ['',Validators.required],
      desc_producto: ['', Validators.required],
      te_producto: ['', Validators.required],
      um_producto: ['',Validators.required]
    });
    this.getProductos('');
    this.getUm();
  }

  async getProductos(searchValue: string) {
    try {
      let resp = await this.productoService.get(searchValue, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaProductos = resp.response;
        console.log(this.listaProductos)
        this.total = this.listaProductos.length;
      }
    } catch (e) {
    }
  }

  async getUm(){
    try {
      let resp = await this.umService.get( this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaUm = resp.response;
      }
    } catch (e) {
    }
  }

  onSearchChange(searchValue: string) {
    this.getProductos(searchValue);
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

  async save(){
    try {
      let response = await this.productoService.create(this.form.value,this.auth.token).toPromise();
      if (response.code == 200) {
        Swal.fire('Guardado', 'El registro ha sido guardado!', 'success');
        this.getProductos('');
        for (const key in this.form.controls) {
          this.form.get(key).setValue('');
         // this.form.get(key).updateValueAndValidity();
      }
      }
    } catch (error) {
      Swal.fire('Error', 'No fue posible guardar el registro!', 'error');
    }
  }

  update(producto) {
    const dialogRef = this.dialog.open(NuevoProductoComponent, {
      width: '40rem',
      data: {
        title: 'Editar producto: ' + producto.producto,
        btnText: 'Guardar',
        alertSuccesText: 'Producto modificado correctamente',
        alertErrorText: "No se puedo modificar el registro",
        modalMode: 'edit',
        _producto: producto
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getProductos('');
    });
  }

  delete(producto) {
    Swal.fire({
      title: '¿Desea eliminar el registro?', text: "",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.productoService.delete(producto.idproducto, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getProductos('');
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
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
