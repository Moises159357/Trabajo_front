import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { Recetasservice } from '../../../services/recetasservice';

@Component({
  selector: 'app-rinsertarcomponent',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './rinsertarcomponent.html',
  styleUrl: './rinsertarcomponent.css',
})
export class Rinsertarcomponent {
  formReceta: any;
  mensaje = '';

  constructor(private rS: Recetasservice, private fb: FormBuilder) {
    this.formReceta = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      indicaciones: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  insertarReceta(): void {
    if (this.formReceta.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const receta: RecetasDTO = {
      idReceta: 0,
      fechaInicio: this.formReceta.value.fechaInicio ?? '',
      fechaFin: this.formReceta.value.fechaFin ?? '',
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