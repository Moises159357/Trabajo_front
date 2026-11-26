import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitasDTO } from '../../../models/CitasDTO';
import { Citaservice } from '../../../services/citaservice';

@Component({
  imports: [
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-citas-insertarcomponent',
  styleUrl: './citas-insertarcomponent.css',
  templateUrl: './citas-insertarcomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class CitasInsertarcomponent {
  formCitas: any;
  mensaje: string = '';

  constructor(
    private cS: Citaservice,
    private fb: FormBuilder,
  ) {
    this.formCitas = fb.group({
      fecha: [new Date(), Validators.required],
      estado: ['Pendiente', [Validators.required]],
      motivo: ['', [Validators.required, Validators.maxLength(80)]],
      paciente: [0, [Validators.required, Validators.min(1)]],
      oftalmologo: [0, [Validators.required, Validators.min(1)]],
    });
  }

  insertarCitas() {
    if (this.formCitas.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const cita: CitasDTO = {
      idCitas: 0,
      fechaCita: this.formCitas.value.fecha.toISOString().split('T')[0],
      estado: this.formCitas.value.estado,
      motivoCita: this.formCitas.value.motivo,
      idPaciente: this.formCitas.value.paciente,
      idOftalmologo: this.formCitas.value.oftalmologo,
    };
    this.cS.insertCitas(cita).subscribe({
      next: (respuesta) => {
        this.mensaje = 'Cita insertada correctamente!!!!';
        this.formCitas.reset({
          paciente: 0,
          oftalmologo: 0,
        });
      },
      error: (error) => {
        this.mensaje = 'Error al insertar la cita: ' + error.message;
      },
    });
  }
}
