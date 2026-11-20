import { Routes } from '@angular/router';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';

export const routes: Routes = [
  { path: '', component: Iniciocomponent },
  { path: 'inicio', component: Iniciocomponent },
  // Aquí irás agregando tus siguientes rutas (ej. pacientes, citas, etc.)
  { path: '**', redirectTo: '' }
];