import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReporteCitasDTO } from '../../../models/ReporteCitasDTO';
import { Citaservice } from '../../../services/citaservice';

type TipoGrafico = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

@Component({
  imports: [BaseChartDirective],
  selector: 'app-reporte-citascomponent',
  styleUrl: './reporte-citascomponent.css',
  templateUrl: './reporte-citascomponent.html',
})
export class ReporteCitascomponent implements OnInit {
  listaCitasPaciente: ReporteCitasDTO[] = [];
  listaOftalFrecuente: ReporteCitasDTO[] = [];

  // --- GRÁFICO 1: Total de citas por paciente (Barras) ---
  public chartType1: TipoGrafico = 'bar';
  public chartData1: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Total de citas',
        data: [],
        borderWidth: 1,
      },
    ],
  };

  // --- GRÁFICO 2: Oftalmólogo frecuente por paciente (Circular / Pie) ---
  public chartType2: TipoGrafico = 'pie';
  public chartData2: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Citas con oftalmólogo frecuente',
        data: [],
        borderWidth: 1,
      },
    ],
  };

  // --- GRÁFICO 3 (EXTRA): Total de citas agrupadas por Oftalmólogo (Dona) ---
  public chartType3: TipoGrafico = 'doughnut';
  public chartData3: ChartData<TipoGrafico> = {
    labels: [],
    datasets: [
      {
        label: 'Citas atendidas',
        data: [],
        borderWidth: 1,
      },
    ],
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  constructor(
    private cS: Citaservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.obtenerTotalCitasPorPaciente();
    this.obtenerOftalmologoFrecuente();
  }

  obtenerTotalCitasPorPaciente(): void {
    this.cS.getTotalCitasPorPaciente().subscribe({
      next: (data: ReporteCitasDTO[]) => {
        this.listaCitasPaciente = data;
        this.chartData1 = {
          labels: data.map((item) => item.nombre),
          datasets: [
            {
              label: 'Total de citas por paciente',
              data: data.map((item) => item.totalCitas),
              borderWidth: 1,
            },
          ],
        };
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar reporte 1:', error);
      },
    });
  }

  obtenerOftalmologoFrecuente(): void {
    this.cS.getOftalmologoFrecuente().subscribe({
      next: (data: ReporteCitasDTO[]) => {
        this.listaOftalFrecuente = data;

        // 1. Llenamos el Gráfico 2 (Paciente + Oftalmólogo)
        this.chartData2 = {
          labels: data.map((item) => `${item.nombre} (${item.oftalmologoFrecuente})`),
          datasets: [
            {
              label: 'Citas frecuentes',
              data: data.map((item) => item.totalCitas),
              borderWidth: 1,
            },
          ],
        };

        // 2. Calculamos el Gráfico 3 (Agrupando y sumando citas por cada Oftalmólogo)
        const conteoPorOftalmologo: { [doctor: string]: number } = {};

        data.forEach((item) => {
          const doctor = item.oftalmologoFrecuente || 'Sin asignar';
          conteoPorOftalmologo[doctor] = (conteoPorOftalmologo[doctor] || 0) + item.totalCitas;
        });

        this.chartData3 = {
          labels: Object.keys(conteoPorOftalmologo),
          datasets: [
            {
              label: 'Total de citas por oftalmólogo',
              data: Object.values(conteoPorOftalmologo),
              borderWidth: 1,
            },
          ],
        };

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar reporte 2 y 3:', error);
      },
    });
  }
}
