
import { ChangeDetectorRef, Component } from '@angular/core';
import { TratamientoDTO } from '../../../models/TratamientoDTO';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Tratamientoservice } from '../../../services/tratamientoservice';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  selector: 'app-reporte-tratamientoscomponent',
  imports: [
    BaseChartDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './reporte-tratamientoscomponent.html',
  styleUrl: './reporte-tratamientoscomponent.css',
})
export class ReporteTratamientoscomponent {

  listaEstado: TratamientoDTO[] = [];

  formEstado: FormGroup;

  mensajeEstado: string = '';

  public chartType: TipoGrafico = 'doughnut';

  public chartData: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Cantidad de tratamientos',
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
    }
  };

  constructor(
    private tS: Tratamientoservice,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.formEstado = fb.group({
      estado: ['', Validators.required]
    });
  }

  obtenerTratamientosPorEstado(): void {

    this.listaEstado = [];
    this.mensajeEstado = '';

    if (this.formEstado.invalid) {
      this.mensajeEstado = 'Seleccione un estado de tratamiento.';
      return;
    }

    const estado = this.formEstado.value.estado;

    this.tS.obtenerTratamientosPorEstado(estado).subscribe({

      next: (data: TratamientoDTO[]) => {

        this.listaEstado = data;

        const conteoPorTipo: { [tipo: string]: number } = {};

        data.forEach(item => {
          conteoPorTipo[item.tipo] =
            (conteoPorTipo[item.tipo] || 0) + 1;
        });

        this.chartData = {
          labels: Object.keys(conteoPorTipo),
          datasets: [
            {
              label: 'Tratamientos en estado ' + estado,
              data: Object.values(conteoPorTipo),
              backgroundColor: [
                '#0f5c57',
                '#10b981',
                '#13314c',
                '#60a5fa',
                '#f59e0b',
                '#94a3b8'
              ],
              borderWidth: 1
            }
          ]
        };

        if (data.length === 0) {
          this.mensajeEstado = 'No se encontraron tratamientos del estado seleccionado.';
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error al cargar:', error);
        this.listaEstado = [];
        this.mensajeEstado = 'Error al obtener el reporte.';
        this.cdr.detectChanges();
      }

    });
  }

}
