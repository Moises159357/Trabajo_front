import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Detalle } from '../../../models/detalle.model';
import { LenteDTO } from '../../../models/LenteDTO';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { DetallesService } from '../../../services/detalles.service';
import { Lentesservice } from '../../../services/lentesservice';
import { Recetasservice } from '../../../services/recetasservice';

@Component({
  selector: 'app-dactualizarcomponent',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './dactualizarcomponent.html',
  styleUrl: './dactualizarcomponent.css',
})
export class Dactualizarcomponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly idDetalle: number;
  recetas: RecetasDTO[] = [];
  lentes: LenteDTO[] = [];
  cargando = true;
  detalleCargado = false;
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
    route: ActivatedRoute,
    private readonly detallesService: DetallesService,
    private readonly recetasService: Recetasservice,
    private readonly lentesService: Lentesservice,
  ) {
    this.idDetalle = Number(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (!Number.isInteger(this.idDetalle) || this.idDetalle <= 0) {
      this.error = 'El ID del detalle no es válido.';
      this.cargando = false;
      return;
    }

    forkJoin({
      detalle: this.detallesService.buscarPorId(this.idDetalle),
      recetas: this.recetasService.getListRecetas(),
      lentes: this.lentesService.getListLentes(),
    }).subscribe({
      next: ({ detalle, recetas, lentes }) => {
        this.recetas = recetas;
        this.lentes = lentes;
        this.formulario.setValue({
          idHistorial: detalle.idHistorial,
          idReceta: detalle.idReceta,
          idTratamiento: detalle.idTratamiento,
          idIntervencion: detalle.idIntervencion,
          idLente: detalle.idLente,
          observaciones: detalle.observaciones ?? '',
        });
        this.detalleCargado = true;
        this.cargando = false;
      },
      error: (error: HttpErrorResponse) => {
        this.error = `No se pudieron cargar los datos del detalle: ${this.mensajeError(error)}`;
        this.cargando = false;
      },
    });
  }

  guardar(): void {
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid || this.guardando) {
      return;
    }

    const valores = this.formulario.getRawValue();
    const detalle: Detalle = {
      idDetalle: this.idDetalle,
      idHistorial: valores.idHistorial,
      idReceta: valores.idReceta,
      idTratamiento: valores.idTratamiento,
      idIntervencion: valores.idIntervencion,
      idLente: valores.idLente,
      observaciones: valores.observaciones.trim() || null,
    };

    this.guardando = true;
    this.error = '';
    this.mensaje = '';
    this.detallesService.actualizar(detalle).subscribe({
      next: () => {
        this.guardando = false;
        this.mensaje = 'Detalle actualizado correctamente.';
      },
      error: (error: HttpErrorResponse) => {
        this.guardando = false;
        this.error = `No se pudo actualizar el detalle: ${this.mensajeError(error)}`;
      },
    });
  }

  private mensajeError(error: HttpErrorResponse): string {
    return error.error?.message ?? error.message;
  }
}
