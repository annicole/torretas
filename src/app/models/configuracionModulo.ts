import { EventoSensor } from './eventoSensor';

export class ConfiguracionModulo {
    idconfiguracion: number;
    entrada: string;
    tipoentrada: number;
    idevento: number;
    idperfil: number;

    constructor(idPerfil){
        this.idconfiguracion = 0;
        this.entrada ="";
        this.tipoentrada =0;
        this.idevento =0;
        this.idperfil = idPerfil;
    }

}