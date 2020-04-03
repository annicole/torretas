import {EventoSensor} from './eventoSensor';

export class ConfiguracionModulo {
    idconfiguracion:number;
    entrada:string;
    tipoentrada:number;
    idevento:number;
    idperfil:number;
    Evento : EventoSensor;
    constructor(){
       this.Evento = new EventoSensor();
    }    
}