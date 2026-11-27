import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Intervencionservice } from '../../../services/intervencionservice';
import { IntervencionDTO } from '../../../models/IntervencionDTO';
import { formatLocalDate } from '../../../utils/local-date';

@Component({
  selector: 'app-intervencion-insertarcomponent',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './intervencion-insertarcomponent.html',
  styleUrl: './intervencion-insertarcomponent.css',
})
export class IntervencionInsertarcomponent {
  formIntervencion: any;
  mensaje: string = '';

  constructor(
    private iS: Intervencionservice,
    private fb: FormBuilder,
  ) {
    this.formIntervencion = fb.group({
      idVenta: [0, [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      descripcion: ['', Validators.required],
      indicaciones: [''],
    });
  }

  insertarIntervencion() {
    console.log('Se presionó el botón Guardar');

    if (this.formIntervencion.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      this.formIntervencion.markAllAsTouched();

      console.log('Formulario inválido:', this.formIntervencion.errors);
      console.log('Campos:', this.formIntervencion.value);

      return;
    }

    const fecha = formatLocalDate(this.formIntervencion.value.fecha);
    if (!fecha) {
      this.mensaje = 'Seleccione una fecha válida para la intervención.';
      return;
    }

    const int: IntervencionDTO = {
      idIntervencion: 0,
      idVenta: this.formIntervencion.value.idVenta,
      tipo: this.formIntervencion.value.tipo,
      fecha,
      descripcion: this.formIntervencion.value.descripcion,
      indicaciones: this.formIntervencion.value.indicaciones,
    };

    console.log('Datos enviados al backend:', int);

    this.mensaje = 'Registrando intervención...';

    this.iS.insertIntervencion(int).subscribe({
      next: (respuesta) => {
        console.log('Respuesta del backend:', respuesta);

        this.mensaje = 'Intervención insertada correctamente!!!!';

        this.formIntervencion.reset({
          idVenta: 0,
          fecha: new Date(),
          indicaciones: '',
        });
      },

      error: (error) => {
        console.error('ERROR COMPLETO:', error);
        console.error('Código HTTP:', error.status);
        console.error('Respuesta del servidor:', error.error);

        this.mensaje =
          'Error al registrar: HTTP ' +
          error.status +
          ' - ' +
          (error.error?.message || error.message);
      },
    });
  }
}
