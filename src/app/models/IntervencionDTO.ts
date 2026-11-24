export class IntervencionDTO {
    idIntervencion: number = 0;
    idVenta: number = 0;
    tipo: string = '';
    fecha: Date = new Date();
    descripcion: string = '';
    indicaciones: string = '';
}