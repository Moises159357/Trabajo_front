
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tratamientoservice } from '../../../services/tratamientoservice';
import { TratamientoDTO } from '../../../models/TratamientoDTO';
import { formatLocalDate } from '../../../utils/local-date';

@Component({
  selector: 'app-tratamiento-insertarcomponent',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tratamiento-insertarcomponent.html',
  styleUrl: './tratamiento-insertarcomponent.css',
})
export class TratamientoInsertarcomponent {

  formTratamiento: any
  mensaje: string = ''

  constructor(
    private tS: Tratamientoservice,
    private fb: FormBuilder
  ) {
    this.formTratamiento = fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      duracionDias: [0, [Validators.required, Validators.min(1)]],
      estado: ['', Validators.required],
      fechaRegistro: [new Date(), Validators.required],
      indicaciones: ['', Validators.required]
    })
  }

  insertarTratamiento() {
    if (this.formTratamiento.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.'
      return
    }

    const fechaRegistro = formatLocalDate(this.formTratamiento.value.fechaRegistro);
    if (!fechaRegistro) {
      this.mensaje = 'Seleccione una fecha de registro válida.';
      return;
    }

    const tra: TratamientoDTO = {
      idTratamiento: 0,
      nombre: this.formTratamiento.value.nombre,
      tipo: this.formTratamiento.value.tipo,
      duracionDias: this.formTratamiento.value.duracionDias,
      estado: this.formTratamiento.value.estado,
      fechaRegistro,
      indicaciones: this.formTratamiento.value.indicaciones
    }

    this.tS.insertTratamiento(tra).subscribe({
      next: (respuesta) => {
        this.mensaje = 'Tratamiento insertado correctamente!!!!'
        this.formTratamiento.reset({
          duracionDias: 0,
          fechaRegistro: new Date()
        })
      },
      error: (error) => {
        this.mensaje = 'Error al insertar el tratamiento: ' + error.message
      }
    })
  }
}
