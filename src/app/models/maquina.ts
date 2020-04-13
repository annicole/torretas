import { Area} from './area';
import {TipoEquipo} from './tipoEquipo';
import {ModuloInterfaz} from './moduloInterfaz';

export class Maquina {
    idmaquina:number;
    maquina:string;
    idarea:number;
    descripcion:string;
    tipoequipo:number;
    idmodulo:number;
    Area:Area;
    TipoEquipo: TipoEquipo;
    ModuloInterfaz: ModuloInterfaz;

    constructor(){
        this.Area = new Area();
        this.TipoEquipo = new TipoEquipo();
        this.ModuloInterfaz = new ModuloInterfaz();
    }    
}