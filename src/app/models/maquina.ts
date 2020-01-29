import { Area} from './area';
import {TipoEquipo} from './tipoEquipo';

export class Maquina {
    idmaquina:number;
    maquina:string;
    idarea:number;
    descripcion:string;
    tipoequipo:number;
    torreta:number;
    Area:Area;
    TipoEquipo: TipoEquipo;

    constructor(){
        this.Area = new Area();
        this.TipoEquipo = new TipoEquipo();
    }    
}