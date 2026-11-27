import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Detalle } from '../../../models/detalle.model';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { ReporteLenteDTO } from '../../../models/ReporteLenteDTO';
import { DetallesService } from '../../../services/detallesservice';
import { Recetasservice } from '../../../services/recetasservice';

interface ReporteReceta {
  receta: RecetasDTO;
  totalDetalles: number;
}

@Component({
  imports: [BaseChartDirective],
  selector: 'app-reporte-detallescomponent',
  styleUrl: './reporte-detallescomponent.css',
  templateUrl: './reporte-detallescomponent.html',
})
export class ReporteDetallescomponent implements OnInit {
  detalles: Detalle[] = [];
  lentes: ReporteLenteDTO[] = [];
  recetas: ReporteReceta[] = [];

  cargandoDetalles = true;
  cargandoLentes = true;
  cargandoRecetas = true;
  errorDetalles = '';
  errorLentes = '';
  errorRecetas = '';

  chartDataDetalles: ChartData<'bar'> = { labels: [], datasets: [] };
  chartDataLentes: ChartData<'doughnut'> = { labels: [], datasets: [] };
  chartDataRecetas: ChartData<'bar'> = { labels: [], datasets: [] };
  private recetasBase: RecetasDTO[] | null = null;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' },
    },
  };

  constructor(
    private readonly detallesService: DetallesService,
    private readonly recetasService: Recetasservice,
  ) {}

  ngOnInit(): void {
    this.cargarDetalles();
    this.cargarLentesMasUsados();
    this.cargarRecetas();
  }

  private cargarDetalles(): void {
    this.detallesService.listar().subscribe({
      next: (detalles) => {
        this.detalles = detalles;
        const conteoPorHistorial = new Map<number, number>();
        detalles.forEach((detalle) => {
          conteoPorHistorial.set(
            detalle.idHistorial,
            (conteoPorHistorial.get(detalle.idHistorial) ?? 0) + 1,
          );
        });

        const historiales = [...conteoPorHistorial.entries()].sort((a, b) => b[1] - a[1]);
        this.chartDataDetalles = {
          labels: historiales.map(([idHistorial]) => `Historial ${idHistorial}`),
          datasets: [
            {
              label: 'Detalles registrados',
              data: historiales.map(([, total]) => total),
              borderWidth: 1,
            },
          ],
        };
        this.cargandoDetalles = false;
        this.actualizarReporteRecetas();
      },
      error: (error: unknown) => {
        console.error('Error al cargar reporte de detalles:', error);
        this.errorDetalles = 'No se pudo cargar el reporte de detalles.';
        this.cargandoDetalles = false;
        this.actualizarReporteRecetas();
      },
    });
  }

  private cargarLentesMasUsados(): void {
    this.detallesService.lentesMasUsados().subscribe({
      next: (lentes) => {
        this.lentes = lentes;
        this.chartDataLentes = {
          labels: lentes.map((lente) => `${lente.marca} ${lente.modelo}`.trim()),
          datasets: [
            {
              label: 'Detalles asociados',
              data: lentes.map((lente) => lente.totalDetalles),
              borderWidth: 1,
            },
          ],
        };
        this.cargandoLentes = false;
      },
      error: (error: unknown) => {
        console.error('Error al cargar reporte de lentes más usados:', error);
        this.errorLentes = 'No se pudo cargar el reporte de lentes más usados.';
        this.cargandoLentes = false;
      },
    });
  }

  private cargarRecetas(): void {
    this.recetasService.getListRecetas().subscribe({
      next: (recetas) => {
        this.recetasBase = recetas;
        this.actualizarReporteRecetas();
      },
      error: (error: unknown) => {
        console.error('Error al cargar reporte de recetas:', error);
        this.errorRecetas = 'No se pudo cargar el reporte de recetas.';
        this.cargandoRecetas = false;
      },
    });
  }

  private actualizarReporteRecetas(): void {
    if (this.recetasBase === null || this.cargandoDetalles) {
      return;
    }

    if (this.errorDetalles) {
      this.errorRecetas = 'No se pudieron cargar los detalles asociados a las recetas.';
      this.cargandoRecetas = false;
      return;
    }

    const detallesPorReceta = new Map<number, number>();
    this.detalles.forEach((detalle) => {
      detallesPorReceta.set(
        detalle.idReceta,
        (detallesPorReceta.get(detalle.idReceta) ?? 0) + 1,
      );
    });

    this.recetas = this.recetasBase
      .map((receta) => ({
        receta,
        totalDetalles: detallesPorReceta.get(receta.idReceta) ?? 0,
      }))
      .sort((a, b) => b.totalDetalles - a.totalDetalles);
    this.chartDataRecetas = {
      labels: this.recetas.map(({ receta }) => `Receta ${receta.idReceta}`),
      datasets: [
        {
          label: 'Detalles asociados',
          data: this.recetas.map(({ totalDetalles }) => totalDetalles),
          borderWidth: 1,
        },
      ],
    };
    this.cargandoRecetas = false;
  }
}
