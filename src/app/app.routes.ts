import { Routes } from '@angular/router';
import { PacienteComponent } from './components/pacientecomponent/pacientecomponent';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'pacientes', 
    pathMatch: 'full' 
  },
  { 
    path: 'pacientes',
    component: PacienteComponent
  }
  // Agrega aquí más rutas hijas o componentes según necesites
];