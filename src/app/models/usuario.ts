import { Departamento} from './departamento';

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

    constructor(){
        this.Departamento = new Departamento();
    }  
}