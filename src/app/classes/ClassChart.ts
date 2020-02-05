
import { Maquina } from '@app/models/maquina';
import { Area } from '@app/models/area';
import { MaquinaService } from '@app/services/maquina.service';
import { AreaService } from '@app/services/area.service';
import { FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

export abstract class ClassChart {

    showFilter: boolean = false;
    iconFilter: string = 'expand_less';
    areas: Area[];
    filterByMachine: boolean = true;
    graficaForm: FormGroup;
    submitted = false;
    maquinas: Maquina[];

    constructor(protected areaService: AreaService, protected maquinaService: MaquinaService, protected auth: AuthService,
        protected spinner: NgxSpinnerService) { }
    async getMaquinas() {
        try {
            let response = await this.maquinaService.getMaquinas("", "", this.auth.token).toPromise();
            if (response.code == 200) {
                this.maquinas = response.maquina;
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getAreas() {
        try {
            let response = await this.areaService.getAreas("", this.auth.token).toPromise();
            if (response.code == 200) {
                this.areas = response.area;
            }
        } catch (e) {
            console.log(e);
        }
    }

    toggleFilter() {
        this.showFilter = !this.showFilter;
        this.iconFilter = (this.showFilter) ? 'expand_more' : 'expand_less';
    }

    filterTypeselected(type: boolean) {
        this.filterByMachine = type;
        const controlMaquina = this.graficaForm.controls['maquina'];
        const controlArea = this.graficaForm.controls['area'];
        if (type) {
            controlArea.setValidators(null);
            controlArea.setValue('');
            controlMaquina.setValidators([Validators.required]);
        } else {
            controlMaquina.setValue('');
            controlMaquina.setValidators(null);
            controlArea.setValidators([Validators.required]);
        }
        controlMaquina.updateValueAndValidity();
        controlArea.updateValueAndValidity();
    }

    showSpinner() {
        const opt1: Spinner = {
            bdColor: "rgba(51,51,51,0.8)",
            size: "medium",
            color: "#fff",
            type: "square-jelly-box"
        };
        const opt2: Spinner = {
            bdColor: "rgba(100,149,237, .8)",
            size: "large",
            color: "white",
            type: "line-scale-party"
        };
        const opt3: Spinner = {
            bdColor: "rgba(156,220,145, .8)",
            size: "large",
            color: "white",
            type: "ball-clip-rotate-multiple"
        };

        this.spinner.show("mySpinner", opt1);
    }


} 