
import { ChangeDetectorRef, Component } from '@angular/core';
import { IntervencionDTO } from '../../../models/IntervencionDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Intervencionservice } from '../../../services/intervencionservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { formatDate } from '@angular/common';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  selector: 'app-reporte-intervencionescomponent',
  imports: [
    BaseChartDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reporte-intervencionescomponent.html',
  styleUrl: './reporte-intervencionescomponent.css',
})
export class ReporteIntervencionescomponent {

  listaFecha: IntervencionDTO[] = [];
  listaTipo: IntervencionDTO[] = [];

  formFecha: FormGroup;
  formTipo: FormGroup;

  mensajeFecha: string = '';
  mensajeTipo: string = '';

  // Gráfico 1: Intervenciones por rango de fechas
  public chartType1: TipoGrafico = 'pie';

  public chartData1: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Cantidad de intervenciones',
        data: [],
        borderWidth: 1
      }
    ]
  };

  // Gráfico 2: Intervenciones por tipo
  public chartType2: TipoGrafico = 'bar';

  public chartData2: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Cantidad de intervenciones',
        data: [],
        borderWidth: 1
      }
    ]
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  constructor(
    private iS: Intervencionservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.formFecha = fb.group({
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required]
    });

    this.formTipo = fb.group({
      tipo: ['', Validators.required]
    });
  }

  // REPORTE 1: INTERVENCIONES POR RANGO DE FECHAS

  obtenerIntervencionesPorFecha(): void {

    this.listaFecha = [];
    this.mensajeFecha = '';

    if (this.formFecha.invalid) {
      this.mensajeFecha = 'Seleccione ambas fechas correctamente.';
      return;
    }

    if (this.formFecha.value.fechaInicio > this.formFecha.value.fechaFin) {
      this.mensajeFecha = 'La fecha inicial no puede ser mayor que la fecha final.';
      return;
    }

    const fechaInicio = formatDate(
      this.formFecha.value.fechaInicio, 'yyyy-MM-dd', 'en-US'
    );

    const fechaFin = formatDate(
      this.formFecha.value.fechaFin, 'yyyy-MM-dd', 'en-US'
    );

    this.iS.obtenerIntervencionesPorFecha(fechaInicio, fechaFin).subscribe({

      next: (data: IntervencionDTO[]) => {

        this.listaFecha = data;

        const conteoPorTipo: { [tipo: string]: number } = {};

        data.forEach(item => {
          conteoPorTipo[item.tipo] =
            (conteoPorTipo[item.tipo] || 0) + 1;
        });

        this.chartData1 = {
          labels: Object.keys(conteoPorTipo),
          datasets: [
            {
              label: 'Cantidad de intervenciones por tipo',
              data: Object.values(conteoPorTipo),
              backgroundColor: '#0f5c57',
              borderWidth: 1
            }
          ]
        };

        if (data.length === 0) {
          this.mensajeFecha = 'No se encontraron intervenciones en las fechas seleccionadas.';
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error al cargar:', error);
        this.listaFecha = [];
        this.mensajeFecha = 'Error al obtener el reporte.';
        this.cdr.detectChanges();
      }

    });
  }

  // REPORTE 2: INTERVENCIONES POR TIPO

  obtenerIntervencionesPorTipo(): void {

    this.listaTipo = [];
    this.mensajeTipo = '';

    if (this.formTipo.invalid) {
      this.mensajeTipo = 'Seleccione un tipo de intervención.';
      return;
    }

    const tipo = this.formTipo.value.tipo;

    this.iS.obtenerIntervencionesPorTipo(tipo).subscribe({

      next: (data: IntervencionDTO[]) => {

        this.listaTipo = data;

        const conteoPorMes: { [mes: string]: number } = {};

        data.forEach(item => {
          const mes = String(item.fecha).substring(0, 7);

          conteoPorMes[mes] =
            (conteoPorMes[mes] || 0) + 1;
        });

        const meses = Object.keys(conteoPorMes).sort();

        this.chartData2 = {
          labels: meses,
          datasets: [
            {
              label: 'Intervenciones de tipo ' + tipo,
              data: meses.map(mes => conteoPorMes[mes]),
              backgroundColor: '#10b981',
              borderColor: '#0f5c57',
              borderWidth: 2,
              pointRadius: 5
            }
          ]
        };

        if (data.length === 0) {
          this.mensajeTipo = 'No se encontraron intervenciones del tipo seleccionado.';
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error al cargar:', error);
        this.listaTipo = [];
        this.mensajeTipo = 'Error al obtener el reporte.';
        this.cdr.detectChanges();
      }

    });
  }

}
