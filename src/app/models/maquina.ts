import { Area} from './area';

export class Maquina {
    idmaquina:number;
    maquina:string;
    idarea:number;
    descripcion:string;
    Area:Area;

    constructor(){
        this.Area = new Area();
    }    
}