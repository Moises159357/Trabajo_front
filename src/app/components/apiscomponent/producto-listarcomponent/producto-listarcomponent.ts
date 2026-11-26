import { Component } from '@angular/core';
import { ChangeDetectorRef, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Productoservice } from '../../../services/productoservice';
import { ProductoDTO } from '../../../models/ProductoDTO';

@Component({
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  selector: 'app-producto-listarcomponent',
  styleUrl: './producto-listarcomponent.css',
  templateUrl: './producto-listarcomponent.html',
})
export class ProductoListarcomponent implements OnInit {
  todosLentes: ProductoDTO[] = [];
  lentesFiltrados: ProductoDTO[] = [];

  constructor(
    private pS: Productoservice,
    private cdr: ChangeDetectorRef,
  ) {}

  secciones = [
    { id: 'todos', label: 'Todos los Lentes' },
    { id: 'sol', label: 'Gafas de Sol' },
    { id: 'monturas', label: 'Monturas y Estilo' },
    { id: 'destacados', label: 'Mejor Puntuados (4.5★+)' },
  ];
  seccionActiva: string = 'todos';

  textoBusqueda: string = '';

  // Compaginador
  paginaActual: number = 1;
  tamanoPagina: number = 4;

  ngOnInit(): void {
    this.pS.getTodoCatalogoLentes().subscribe({
      next: (lentes) => {
        this.todosLentes = lentes;
        this.aplicarFiltros();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error al cargar los lentes:', err);
      },
    });
  }

  cambiarSeccion(seccionId: string): void {
    this.seccionActiva = seccionId;
    this.paginaActual = 1;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.paginaActual = 1;
    const consulta = this.textoBusqueda.trim().toLowerCase();

    this.lentesFiltrados = this.todosLentes.filter((lente) => {
      // 1. Filtro por sección
      let coincideSeccion = true;
      const tituloDesc = `${lente.title} ${lente.description}`.toLowerCase();

      if (this.seccionActiva === 'sol') {
        coincideSeccion =
          lente.category === 'sunglasses' ||
          tituloDesc.includes('sun') ||
          tituloDesc.includes('uv');
      } else if (this.seccionActiva === 'monturas') {
        coincideSeccion =
          tituloDesc.includes('classic') ||
          tituloDesc.includes('frame') ||
          tituloDesc.includes('black') ||
          tituloDesc.includes('tortoise') ||
          tituloDesc.includes('green');
      } else if (this.seccionActiva === 'destacados') {
        coincideSeccion = (lente.rating || 0) >= 4.5;
      }

      // 2. Filtro por texto del buscador
      const coincideTexto =
        !consulta ||
        lente.title?.toLowerCase().includes(consulta) ||
        lente.brand?.toLowerCase().includes(consulta) ||
        lente.description?.toLowerCase().includes(consulta);

      return coincideSeccion && coincideTexto;
    });
  }

  get lentesPaginados(): ProductoDTO[] {
    const inicio = (this.paginaActual - 1) * this.tamanoPagina;
    return this.lentesFiltrados.slice(inicio, inicio + this.tamanoPagina);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.lentesFiltrados.length / this.tamanoPagina));
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }
}
