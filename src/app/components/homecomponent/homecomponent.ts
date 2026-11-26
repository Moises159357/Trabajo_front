import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Menucomponent],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css'
})
export class Homecomponent implements OnInit {
  // Estadísticas destacadas de la plataforma
  metricasPlataforma = [
    { valor: '100%', etiqueta: 'Recetas Digitales Encriptadas', icono: '📄' },
    { valor: '-75%', etiqueta: 'Tiempo de Espera en Clínica', icono: '⏱️' },
    { valor: '+1,240', etiqueta: 'Hojas de Papel Ahorradas', icono: '🌿' },
    { valor: '24/7', etiqueta: 'Triaje Preventivo con IA', icono: '🤖' }
  ];

  // Calculadora interactiva de impacto ecológico
  consultasAnuales: number = 4;

  // Pasos del flujo de atención
  pasosAtencion = [
    {
      numero: '01',
      titulo: 'Pre-Diagnóstico con IA',
      descripcion: 'Calibra tu cámara web a 50 cm y realiza el test de agudeza y fatiga visual desde casa.',
      color: 'medical'
    },
    {
      numero: '02',
      titulo: 'Reserva Inteligente',
      descripcion: 'Elige al oftalmólogo especialista y agenda tu cita en el horario que mejor se adapte a ti.',
      color: 'ecogreen'
    },
    {
      numero: '03',
      titulo: 'Receta PDF Zero-Papel',
      descripcion: 'Recibe tu diagnóstico y fórmula óptica con firma digital directamente en tu historial.',
      color: 'orange'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Cálculos dinámicos para la sección de Impacto Ecológico
  get hojasAhorradas(): number {
    return this.consultasAnuales * 4; // Promedio de 6 hojas por atención (historia, receta, indicaciones, comprobante)
  }

  get co2Evitado(): string {
    return (this.hojasAhorradas * 0.005).toFixed(2); // ~5g de CO2 por hoja A4 producida/impresa
  }

  navegarA(ruta: string): void {
    this.router.navigate([ruta]);
  }
}