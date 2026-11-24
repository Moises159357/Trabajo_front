import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LenteDTO } from '../../../models/LenteDTO';
import { Lentesservice } from '../../../services/lentesservice';

@Component({
  selector: 'app-linsertarcomponent',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './linsertarcomponent.html',
  styleUrl: './linsertarcomponent.css',
})
export class Linsertarcomponent {
  formLente: any;
  mensaje = '';

  constructor(private lS: Lentesservice, private fb: FormBuilder) {
    this.formLente = this.fb.group({
      modelo: ['', [Validators.required, Validators.maxLength(50)]],
      marca: ['', [Validators.required, Validators.maxLength(50)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  insertarLente(): void {
    if (this.formLente.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const lente: LenteDTO = {
      idLente: 0,
      modelo: this.formLente.value.modelo ?? '',
      marca: this.formLente.value.marca ?? '',
      precio: Number(this.formLente.value.precio),
    };
    this.lS.insertLente(lente).subscribe({
      next: () => {
        this.mensaje = 'Lente insertado correctamente.';
        this.formLente.reset({ precio: 0 });
      },
      error: (error) => this.mensaje = 'Error al insertar el lente: ' + error.message,
    });
  }
}