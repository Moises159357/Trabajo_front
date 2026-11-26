import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { Citaservice } from '../../../services/citaservice';
import { Pacienteservice } from '../../../services/pacienteservice';
import { Oftalmologoservice } from '../../../services/oftalmologoservice';
import { PacienteDTO } from '../../../models/PacienteDTO';
import { OftalmologoDTO } from '../../../models/OftalmologoDTO';

@Component({
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-citas-listarcomponent',
  styleUrl: './citas-listarcomponent.css',
  templateUrl: './citas-listarcomponent.html',
})
export class CitasListarcomponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  dataSource: any[] = [];

  pacientesMap: { [id: number]: string } = {};
  oftalmologosMap: { [id: number]: string } = {};

  constructor(
    private cS: Citaservice,
    private cdr: ChangeDetectorRef,
    private pS: Pacienteservice,
    private oS: Oftalmologoservice,
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
    this.cargarPacientes();
    this.cargarOftalmologos();
  }

  obtenerCitas() {
    this.cS.getListCitas().subscribe({
      next: (data) => {
        //console.log('Cita:', data); // <-- Aquí adentro de next
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }

  cargarPacientes() {
    this.pS.getListPaciente().subscribe({
      next: (lista: PacienteDTO[]) => {
        lista.forEach((p) => {
          this.pacientesMap[p.idPaciente] = `${p.nombre} ${p.apellidos}`;
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error al cargar pacientes:', err);
      },
    });
  }

  cargarOftalmologos() {
    this.oS.getListOftalmologo().subscribe({
      next: (lista: OftalmologoDTO[]) => {
        lista.forEach((o: any) => {
          const id = o.idOftalmologo;
          this.oftalmologosMap[id] = `${o.nombres} ${o.apellidos}`;
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error al cargar oftalmólogos:', err);
      },
    });
  }

  idCitaAEliminar: number | null = null;
  mostrarConfirmacion: boolean = false;

  confirmarEliminacion(id: number) {
    this.idCitaAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion() {
    this.idCitaAEliminar = null;
    this.mostrarConfirmacion = false;
  }

  ejecutarEliminacion() {
    if (this.idCitaAEliminar === null) return;

    const id = this.idCitaAEliminar;
    this.mostrarConfirmacion = false;
    this.idCitaAEliminar = null;

    this.cS.deleteCitas(id).subscribe({
      next: () => {
        this.obtenerCitas();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }

  obtenerNombrePaciente(idPaciente: number): string {
    return this.pacientesMap[idPaciente] || `ID: ${idPaciente}`;
  }

  obtenerNombreOftalmologo(idOftalmologo: number): string {
    return this.oftalmologosMap[idOftalmologo] || `ID: ${idOftalmologo}`;
  }
}
