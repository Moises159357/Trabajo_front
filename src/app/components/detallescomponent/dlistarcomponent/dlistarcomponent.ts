import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Detalle } from '../../../models/detalle.model';
import { LenteDTO } from '../../../models/LenteDTO';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { DetallesService } from '../../../services/detallesservice';
import { Lentesservice } from '../../../services/lentesservice';
import { Recetasservice } from '../../../services/recetasservice';

@Component({
  selector: 'app-dlistarcomponent',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterLink],
  templateUrl: './dlistarcomponent.html',
  styleUrl: './dlistarcomponent.css',
})
export class Dlistarcomponent implements OnInit {
  readonly displayedColumns = [
    'historial',
    'receta',
    'tratamiento',
    'intervencion',
    'lente',
    'observaciones',
    'acciones',
  ];

  detalles: Detalle[] = [];
  recetas: RecetasDTO[] = [];
  lentes: LenteDTO[] = [];
  cargando = false;
  error = '';

  constructor(
    private readonly detallesService: DetallesService,
    private readonly recetasService: Recetasservice,
    private readonly lentesService: Lentesservice,
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarDetalles();
  }

  cargarCatalogos(): void {
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

  cargarDetalles(): void {
    this.cargando = true;
    this.error = '';
    this.detallesService.listar().subscribe({
      next: (detalles) => {
        this.detalles = detalles;
        this.cargando = false;
      },
      error: (error: HttpErrorResponse) => {
        this.error = `No se pudieron cargar los detalles: ${this.mensajeError(error)}`;
        this.cargando = false;
      },
    });
  }

  nombreReceta(id: number): string {
    const receta = this.recetas.find((item) => item.idReceta === id);
    return receta
      ? `#${receta.idReceta} · ${receta.fechaInicio} – ${receta.fechaFin}`
      : `Receta #${id}`;
  }

  nombreLente(id: number): string {
    const lente = this.lentes.find((item) => item.idLente === id);
    return lente ? `${lente.modelo} (${lente.marca})` : `Lente #${id}`;
  }

  eliminar(detalle: Detalle): void {
    if (!window.confirm(`¿Eliminar el detalle #${detalle.idDetalle}?`)) {
      return;
    }

    this.error = '';
    this.detallesService.eliminar(detalle.idDetalle).subscribe({
      next: () => this.cargarDetalles(),
      error: (error: HttpErrorResponse) => {
        this.error = `No se pudo eliminar el detalle: ${this.mensajeError(error)}`;
      },
    });
  }

  private mensajeError(error: HttpErrorResponse): string {
    return error.error?.message ?? error.message;
  }
}
