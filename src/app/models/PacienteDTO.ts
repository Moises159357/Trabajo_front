export class PacienteDTO {
  idPaciente: number = 0;
  dni: string = '';
  nombre: string = '';
  apellidos: string = '';
  genero: string = '';
  correo: string = '';
  direccion: string = '';
  telefono: string = '';
  fechaNacimiento: Date | string = new Date();
  fechaInscripcion: string = '';
}
