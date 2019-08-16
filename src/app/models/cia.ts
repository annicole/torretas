export class Cia {
    idcia:number;
    razon:string;
    nombre:string;
    rfc:string;
    calle:string;
    numero:string;
    colonia:string;
    ciudad:string;
    oais:string;
    cp:string;
    eslogan:string;
    logotipo:FormData;
    constructor(){
        this.logotipo = new FormData();
    }
}
