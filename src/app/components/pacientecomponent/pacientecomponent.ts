import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PacienteService } from '../../services/pacienteservice';
import { Paciente } from '../../models/Paciente';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientecomponent.html',
  styleUrls: ['./pacientecomponent.css']
})
export class PacienteComponent implements OnInit {
  pacientes = signal<Paciente[]>([]);
  private pacienteService = inject(PacienteService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarPacientes();
    }
  }

  cargarPacientes() {
    this.pacienteService.listarPacientes().subscribe({
      next: (data) => {
        this.pacientes.set(data);
      },
      error: (err) => {
        console.error('Error al conectar con el backend:', err);
      }
    });
  }
}