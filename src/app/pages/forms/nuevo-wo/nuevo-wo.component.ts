import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { WoService } from '@app/services/wo.service';
import Swal from 'sweetalert2';
import { Wo } from '@app/models/wo';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-nuevo-wo',
  templateUrl: './nuevo-wo.component.html',
  styleUrls: ['./nuevo-wo.component.scss'],
})

export class NuevoWoComponent implements OnInit {

  id: string;
  id2: string;
  form: FormGroup;
  formc: FormGroup;
  submitted = false;

  wo: Wo = new Wo;
  token;
  idempresa;
  status: string;
  total = 0;


  constructor(
    private woService: WoService,

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
    console.log(this.status)
    if (this.status === null) {
      
    } else if (this.status === 'edit') {

    }

    this.form = this.formBuilder.group({
      idwo: ['', Validators.required],
   

    });

  }

     /*
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



  get g() { return this.formc.controls; }

  onSubmitContemp() {
    this.submitted = true;
    if (this.formc.invalid) {
      return;
    } else {
      this.saveContemp();
    }
  }

  async saveContemp() {
    try {
      let response;
      this.formc.value.idempresa = this.idempresa;
       response = this.contempService.create(this.formc.value, this.token).toPromise();
          console.log(this.formc)
          if (response.code = 200) {
            Swal.fire('', 'Contacto guardada correctamente', 'success');

            this.getContemp();
          }
          else {
            Swal.fire('Error', 'No fue posible guardar el contacto', 'error');
          }
      }catch (e) {
        Swal.fire('Error', 'No fue posible actualizar el contacto', 'error');
      }
  }

  editar(contemp) {
    const dialogRef = this.dialog.open(NuevoContempComponent, {
      width: '55rem',
      data: {
        title: 'Editar producto: ' + contemp.nomcontemp,
        btnText: 'Guardar',
        alertSuccesText: 'Producto modificado correctamente',
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
        console.log("Pais?: " + resp)
        this.estado = resp.response;
      }
    } catch (e) {
    }
  }

  async getCiudade(searchValue: string) {
    try {
      let resp = await this.ciudadService.get(searchValue, this.token).toPromise();
      if (resp.code == 200) {
        console.log("Ciudad?: " + resp)
        this.ciudad = resp.response;
      }
    } catch (e) {
    }
  }

  async getEstado() {
    try {
      let resp = await this.estadoService.get(this.id,this.token).toPromise();
      if (resp.code == 200) {
        console.log("Pais?: " + resp)
        this.estado = resp.response;
      }
    } catch (e) {
    }
  }

  async getCiudad() {
    try {
      let resp = await this.ciudadService.get(this.id2,this.token).toPromise();
      if (resp.code == 200) {
        console.log("Ciudad?: " + resp)
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

      }
    } catch (e) {
      Swal.fire('Error', 'No se pudo obtener la empresa', 'error');
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
        case null: response = this.empresaService.create(this.empresa, this.token).toPromise();
          console.log(this.empresa)
          if (response.code = 200) {
            Swal.fire('', 'Empresa guardada correctamente', 'success');
            this.router.navigate(['/empresa']);
            this.getEmpresa();
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
            this.router.navigate(['/empresa']);
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
  */

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
