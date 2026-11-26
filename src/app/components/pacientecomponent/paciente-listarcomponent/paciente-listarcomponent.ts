import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PacienteDTO } from '../../../models/PacienteDTO';
import { Pacienteservice } from '../../../services/pacienteservice';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-paciente-listarcomponent',
  styleUrl: './paciente-listarcomponent.css',
  templateUrl: './paciente-listarcomponent.html',
})
export class PacienteListarcomponent implements OnInit {
  displayedColumns: string[] = ['c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  dataSource: PacienteDTO[] = [];
  constructor(
    private sService: Pacienteservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.obtenerPaciente();
  }

  pacientePerfil: PacienteDTO | null = null;

  verPerfil(paciente: PacienteDTO) {
    this.pacientePerfil = paciente;
  }

  cerrarPerfil() {
    this.pacientePerfil = null;
  }

  obtenerPaciente() {
    this.sService.getListPaciente().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }

  idAEliminar: number | null = null;
  mostrarConfirmacion: boolean = false;

  confirmarEliminacion(id: number) {
    this.idAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion() {
    this.idAEliminar = null;
    this.mostrarConfirmacion = false;
  }

  ejecutarEliminacion() {
    if (this.idAEliminar === null) return;

    const id = this.idAEliminar;
    this.mostrarConfirmacion = false;
    this.idAEliminar = null;

    this.sService.deletePaciente(id).subscribe({
      next: () => {
        this.obtenerPaciente();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }
}
