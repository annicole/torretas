import { Component, OnInit } from '@angular/core';
import { CiaService } from '@app/services/cia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cia } from '@app/models/cia';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nuevo-cia',
  templateUrl: './nuevo-cia.component.html',
  styleUrls: ['./nuevo-cia.component.css']
})
export class NuevoCiaComponent implements OnInit {

  cia: Cia = new Cia();
  ciaForm: FormGroup;
  submitted = false;
  formData:FormData;
  token;
  constructor(private ciaService: CiaService, private formBuilder: FormBuilder, 
    private router: Router,private auth: AuthService) { }

  ngOnInit() {
    this.cia.logotipo = new FormData();
    this.formData = new FormData();
    this.getCia();
    this.token= this.auth.token;
    this.ciaForm = this.formBuilder.group({
      razon: ['', Validators.required],
      nombre: ['', Validators.required],
      rfc: ['', Validators.required],
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      cp: ['', Validators.required],
      eslogan: ['', Validators.nullValidator]
    });
  }

  async getCia(){
    try{
      const response= await this.ciaService.readCia(1,this.token).toPromise();
      if (response.code = 200) {
        this.cia = response.cia
      }
    }catch(e){
      Swal.fire('Error', 'No se pudo obtener la empresa', 'error');
    }
  }

  get f() { return this.ciaForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.ciaForm.invalid) {
      return;
    } else {
      this.guardar();
    }
  }

  async guardar() {
    try {
      let response = await this.ciaService.createImage(this.formData).toPromise();
      //let response = await this.ciaService.update(this.cia,this.token).toPromise();
      if (response.code = 200) {
        Swal.fire('', 'Empresa guardada correctamente', 'success');
        this.router.navigate(['']);
      }
      else {
        Swal.fire('Error', 'No fue posible guardar la empresa', 'error');
      }
    } catch (e) {
      Swal.fire('Error', 'No fue posible guardar la empresa', 'error');
    }
  }

  selectFile(file) {
     this.cia.logotipo= file;
     console.log(file);
     this.formData.append('picture', file, file.name);
  }
}
