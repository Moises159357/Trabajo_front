import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { CitasDTO } from '../../../models/CitasDTO';
import { Citaservice } from '../../../services/citaservice';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  selector: 'app-citas-buscarcomponent',
  styleUrl: './citas-buscarcomponent.css',
  templateUrl: './citas-buscarcomponent.html',
})
export class CitasBuscarcomponent implements OnInit {
  todasLasCitas: CitasDTO[] = [];
  dataSource: CitasDTO[] = [];
  seleccionadas = new Set<number>();

  // Columnas: selección, fecha, paciente, oftalmólogo, estado, motivo
  displayedColumns: string[] = ['select', 'fecha', 'paciente', 'oftalmologo', 'estado', 'motivo'];

  fechaDesde: string = '';
  fechaHasta: string = '';
  soloSeleccionadas: boolean = false;
  mensaje: string = '';

  constructor(
    private cS: Citaservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cS.getListCitas().subscribe({
      next: (data) => {
        this.todasLasCitas = data || [];
        this.dataSource = [...this.todasLasCitas];
        this.mensaje = this.dataSource.length === 0 ? 'No hay citas registradas.' : '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar citas:', error);
        this.mensaje = 'No se pudieron cargar las citas.';
        this.cdr.detectChanges();
      },
    });
  }

  buscarPorFechas(): void {
    if (!this.fechaDesde && !this.fechaHasta) {
      this.dataSource = [...this.todasLasCitas];
      this.mensaje = '';
      return;
    }

    this.dataSource = this.todasLasCitas.filter((cita) => {
      const fechaCita = this.normalizarFecha(cita.fechaCita);
      if (!fechaCita) return false;

      const cumpleDesde = !this.fechaDesde || fechaCita >= this.fechaDesde;
      const cumpleHasta = !this.fechaHasta || fechaCita <= this.fechaHasta;
      return cumpleDesde && cumpleHasta;
    });

    this.mensaje =
      this.dataSource.length === 0
        ? 'No se encontraron citas en el rango de fechas seleccionado.'
        : '';
  }

  limpiarFiltros(): void {
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.soloSeleccionadas = false;
    this.dataSource = [...this.todasLasCitas];
    this.mensaje = '';
  }

  toggleSeleccion(id: number): void {
    if (this.seleccionadas.has(id)) {
      this.seleccionadas.delete(id);
    } else {
      this.seleccionadas.add(id);
    }

    if (this.soloSeleccionadas) {
      this.aplicarFiltroSeleccion();
    }
  }

  toggleSoloSeleccionadas(): void {
    this.soloSeleccionadas = !this.soloSeleccionadas;
    if (this.soloSeleccionadas) {
      this.aplicarFiltroSeleccion();
    } else {
      this.buscarPorFechas();
    }
  }

  private aplicarFiltroSeleccion(): void {
    this.dataSource = this.todasLasCitas.filter((c) => this.seleccionadas.has(this.getIdCita(c)));
    this.mensaje = this.dataSource.length === 0 ? 'No hay citas marcadas con el checkbox.' : '';
  }

  getIdCita(cita: any): number {
    return cita?.idCitas ?? cita?.id ?? 0;
  }

  getNombrePaciente(cita: any): string {
    if (cita?.nombrePaciente) return cita.nombrePaciente;
    if (cita?.paciente?.nombre || cita?.paciente?.apellido) {
      return `${cita.paciente?.nombre ?? ''} ${cita.paciente?.apellido ?? ''}`.trim();
    }
    return `Paciente #${cita?.idPaciente ?? ''}`;
  }

  getNombreOftalmologo(cita: any): string {
    if (cita?.nombreOftalmologo) return cita.nombreOftalmologo;
    if (cita?.oftalmologo?.nombre || cita?.oftalmologo?.apellido) {
      return `${cita.oftalmologo?.nombre ?? ''} ${cita.oftalmologo?.apellido ?? ''}`.trim();
    }
    return `Oftalmólogo #${cita?.idOftalmologo ?? ''}`;
  }

  getClaseEstado(estado: string | undefined): string {
    const valor = (estado || '').toLowerCase().trim();
    if (valor.includes('complet') || valor.includes('confirmad') || valor.includes('atendid')) {
      return 'estado-completo';
    }
    if (valor.includes('cancel') || valor.includes('rechaz')) {
      return 'estado-cancelado';
    }
    return 'estado-proceso';
  }

  private normalizarFecha(fecha: any): string {
    if (!fecha) return '';
    return String(fecha).slice(0, 10); // Formato YYYY-MM-DD
  }
}
