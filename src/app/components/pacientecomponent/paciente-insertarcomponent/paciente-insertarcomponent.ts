import { Component } from '@angular/core';
import { Pacienteservice } from '../../../services/pacienteservice';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PacienteDTO } from '../../../models/PacienteDTO';
import { formatLocalDate } from '../../../utils/local-date';

@Component({
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-paciente-insertarcomponent',
  styleUrl: './paciente-insertarcomponent.css',
  templateUrl: './paciente-insertarcomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class PacienteInsertarcomponent {
  formPaciente: any;
  mensaje: string = '';

  constructor(
    private pS: Pacienteservice,
    private fb: FormBuilder,
  ) {
    this.formPaciente = fb.group({
      dni: ['', [Validators.required, Validators.maxLength(9)]],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.maxLength(30)]],
      genero: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(11)]],
      nacimiento: [new Date(), Validators.required],
      inscripcion: [new Date(), Validators.required],
    });
  }

  insertarPaciente() {
    if (this.formPaciente.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const fechaInscripcion = formatLocalDate(this.formPaciente.value.inscripcion);
    if (!fechaInscripcion) {
      this.mensaje = 'Seleccione una fecha de inscripción válida.';
      return;
    }

    const pac: PacienteDTO = {
      idPaciente: 0,
      dni: this.formPaciente.value.dni,
      nombre: this.formPaciente.value.nombre,
      apellidos: this.formPaciente.value.apellidos,
      genero: this.formPaciente.value.genero,
      correo: this.formPaciente.value.correo,
      direccion: this.formPaciente.value.direccion,
      telefono: this.formPaciente.value.telefono,
      fechaNacimiento: this.formPaciente.value.nacimiento,
      fechaInscripcion
    }
    this.pS.insertPaciente(pac).subscribe({
      next: (respuesta) => {
        this.mensaje = 'Paciente insertado correctamente!!!!'
        this.formPaciente.reset({
          nacimiento: new Date(),
          inscripcion: new Date()
        })
      }, error: (error) => {
        this.mensaje = 'Error al insertar el paciente: ' + error.message
      }
    })
  }
}
