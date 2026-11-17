export class Paciente {
  idPaciente: number = 0;
  dni: string= '';
  nombre: string='';
  apellidos: string='';
  genero: string='';
  correo: string='';
  direccion: string='';
  telefono: string='';
  fechaNacimiento: Date = new Date();
  fechaInscripcion: Date = new Date();
}