import { Maquina } from './maquina';
import {Color} from './color';

export class Sensor {
    idsensor:number;
    sensor:string;
    idmaquina:number;
    color:number;
    intermitente:number=1;
    tipo:number;
    Maquina:Maquina;
    Color:Color;
    constructor(){
        this.Maquina= new Maquina();
        this.Color = new Color();
    }
}
