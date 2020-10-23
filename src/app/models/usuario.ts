import { Departamento} from './departamento';
import { EventoSensor } from './eventoSensor';

export class Usuario{
    username:string;
    email:string;
    password:string;
    create_time:Date;
    last_update:Date;
    celular:string;
    id:number;
    iddep:number;
    Departamento:Departamento;
    evento:EventoSensor;
    nip:number;
    
    constructor(){
        this.Departamento = new Departamento();
        this.evento = new EventoSensor();
    }  
}