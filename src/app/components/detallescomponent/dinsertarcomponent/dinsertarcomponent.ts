import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LenteDTO } from '../../../models/LenteDTO';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { DetallesService } from '../../../services/detallesservice';
import { Lentesservice } from '../../../services/lentesservice';
import { Recetasservice } from '../../../services/recetasservice';

@Component({
  selector: 'app-dinsertarcomponent',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './dinsertarcomponent.html',
  styleUrl: './dinsertarcomponent.css',
})
export class Dinsertarcomponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  recetas: RecetasDTO[] = [];
  lentes: LenteDTO[] = [];
  guardando = false;
  error = '';
  mensaje = '';

  readonly formulario = this.fb.nonNullable.group({
    idHistorial: [0, [Validators.required, Validators.min(1)]],
    idReceta: [0, [Validators.required, Validators.min(1)]],
    idTratamiento: [0, [Validators.required, Validators.min(1)]],
    idIntervencion: [0, [Validators.required, Validators.min(1)]],
    idLente: [0, [Validators.required, Validators.min(1)]],
    observaciones: ['', [Validators.maxLength(800)]],
  });

  constructor(
    private readonly detallesService: DetallesService,
    private readonly recetasService: Recetasservice,
    private readonly lentesService: Lentesservice,
  ) {}

  ngOnInit(): void {
    forkJoin({
      recetas: this.recetasService.getListRecetas(),
      lentes: this.lentesService.getListLentes(),
    }).subscribe({
      next: ({ recetas, lentes }) => {
        this.recetas = recetas;
        this.lentes = lentes;
      },
      error: (error: HttpErrorResponse) => {
        this.error = `No se pudieron cargar las recetas y los lentes: ${this.mensajeError(error)}`;
      },
    });
  }

  guardar(): void {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid || this.guardando) {
      return;
    }

    const valores = this.formulario.getRawValue();
    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.detallesService.crear({
      idHistorial: valores.idHistorial,
      idReceta: valores.idReceta,
      idTratamiento: valores.idTratamiento,
      idIntervencion: valores.idIntervencion,
      idLente: valores.idLente,
      observaciones: valores.observaciones,
    }).subscribe({
      next: () => {
        this.guardando = false;
        this.formulario.reset({
          idHistorial: 0,
          idReceta: 0,
          idTratamiento: 0,
          idIntervencion: 0,
          idLente: 0,
          observaciones: '',
        });
        this.mensaje = 'Detalle creado correctamente.';
      },
      error: (error: HttpErrorResponse) => {
        this.guardando = false;
        this.error = `No se pudo crear el detalle: ${this.mensajeError(error)}`;
      },
    });
  }

  private mensajeError(error: HttpErrorResponse): string {
    return error.error?.message ?? error.message;
  }
}
