import { Component, OnInit, Inject } from '@angular/core';
import { SkuMaquinaService } from '@app/services/sku-maquina.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
import { Dialog } from '@app/classes/Dialog';
import { AuthService } from '@app/services/auth.service';
import {MaquinaService} from '@app/services/maquina.service'
import {TipoEquipoService} from '@app/services/tipo-equipo.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion-equipo',
  templateUrl: './asignacion-equipo.component.html',
  styleUrls: ['./asignacion-equipo.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AsignacionEquipoComponent extends Dialog implements OnInit {

  form: FormGroup;
  submitted = false;
  listaSKU=[];
  listaEquipos=[];
  idProducto:number;
  prioridad;

  constructor(
    private formBuilder: FormBuilder,
    private skuService:SkuMaquinaService,
    public dialogRef: MatDialogRef<AsignacionEquipoComponent>,
    private auth: AuthService,private maquinaService:MaquinaService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idmaquina: ['',Validators.required],
      prioridad:[''],
      idproducto:['']
    });
    this.loadModalTexts();
    this.form.controls['idproducto'].setValue(this.idProducto);
    this.form.controls['prioridad'].setValue(1);
    this.getMaquinas();
    this.getSKU();
  }

  loadModalTexts() {
    const { title, alertErrorText, alertSuccesText, idproducto } = this.data;
    this.title = title;
    this.alertSuccesText = alertSuccesText;
    this.alertErrorText = alertErrorText;
    this.idProducto = idproducto;
  }

  closeModal() {
    this.dialogRef.close();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async getMaquinas() {
    try {
      let resp = await this.maquinaService.getMaquinas("",  "", this.auth.token).toPromise();
      if (resp.code == 200) {
        this.listaEquipos = resp.maquina;
      }
    } catch (e) {
    }
  }


  async getSKU() {
    try {
      let resp = await this.skuService.get(this.auth.token,this.idProducto).toPromise();
      if (resp.code == 200) {
        this.listaSKU = resp.response;
        let sku =  this.listaSKU[this.listaSKU.length-1];
        this.prioridad = sku.prioridad;
        this.form.controls['prioridad'].setValue(this.prioridad +1);
      }
    } catch (e) {
    }
  }

  async guardar() {
    try {
      let response;
      response = await this.skuService.create(this.form.value, this.auth.token).toPromise();
      if (response.code == 200) {      
        this.getSKU();
        this.submitted = false;
        this.form.reset({});
      }
      else {
        this.showAlert(this.alertErrorText, false);
      }
    } catch (e) {
      this.showAlert(e.error.message, false);
    }
  }

  async updateDown(obj){
    try {
      let response;
      response = await this.skuService.updateDown(obj, this.auth.token,obj.idskumaquina).toPromise();
      if (response.code == 200) {      
        this.getSKU();
      }
    } catch (e) {
      this.showAlert(e.error.message, false); 
    }
  }

  async updateUp(obj){
    try {
      let response;
      response = await this.skuService.updateUp(obj, this.auth.token,obj.idskumaquina).toPromise();
      if (response.code == 200) {      
        this.getSKU();
      }
    } catch (e) {
      this.showAlert(e.error.message, false); 
    }
  }

  delete(obj) {
    Swal.fire({
      title: '¿Desea eliminar el registro?', text: "",
      type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', confirmButtonText: 'Si!', cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.skuService.delete(obj, this.auth.token).subscribe(res => {
          if (res.code == 200) {
            Swal.fire('Eliminado', 'El registro ha sido borrado!', 'success');
            this.getSKU();
          } else {
            Swal.fire('Error', 'No fue posible borrar el registro!', 'error');
          }
        });
      }
    });
  }

}
