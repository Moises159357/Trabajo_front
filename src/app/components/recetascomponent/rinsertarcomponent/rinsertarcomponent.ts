import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { Recetasservice } from '../../../services/recetasservice';
import { formatLocalDate } from '../../../utils/local-date';

@Component({
  selector: 'app-rinsertarcomponent',
  imports: [MatInputModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './rinsertarcomponent.html',
  styleUrl: './rinsertarcomponent.css',
})
export class Rinsertarcomponent {
  formReceta: any;
  mensaje = '';

  constructor(private rS: Recetasservice, private fb: FormBuilder) {
    this.formReceta = this.fb.group({
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      indicaciones: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  insertarReceta(): void {
    const fechaInicio = formatLocalDate(this.formReceta.value.fechaInicio);
    const fechaFin = formatLocalDate(this.formReceta.value.fechaFin);
    if (this.formReceta.invalid || !fechaInicio || !fechaFin) {
      this.mensaje = 'Seleccione fechas válidas y complete los demás campos.';
      return;
    }
    const receta: RecetasDTO = {
      idReceta: 0,
      fechaInicio,
      fechaFin,
      indicaciones: this.formReceta.value.indicaciones ?? '',
    };
    this.rS.insertReceta(receta).subscribe({
      next: () => {
        this.mensaje = 'Receta insertada correctamente.';
        this.formReceta.reset();
      },
      error: (error) => this.mensaje = 'Error al insertar la receta: ' + error.message,
    });
  }
}