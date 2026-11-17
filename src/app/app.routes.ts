import { Routes } from '@angular/router';
import { Recetascomponent } from './components/recetascomponent/recetascomponent';
import { Rlistarcomponent } from './components/recetascomponent/rlistarcomponent/rlistarcomponent';
import { Rinsertarcomponent } from './components/recetascomponent/rinsertarcomponent/rinsertarcomponent';
import { Ractualizarcomponent } from './components/recetascomponent/ractualizarcomponent/ractualizarcomponent';
import { Lentescomponent } from './components/lentescomponent/lentescomponent';
import { Llistarcomponent } from './components/lentescomponent/llistarcomponent/llistarcomponent';
import { Linsertarcomponent } from './components/lentescomponent/linsertarcomponent/linsertarcomponent';
import { Lactualizarcomponent } from './components/lentescomponent/lactualizarcomponent/lactualizarcomponent';
import { PacienteComponent } from './components/pacientecomponent/pacientecomponent';
import { Detallescomponent } from './components/detallescomponent/detallescomponent';
import { Dlistarcomponent } from './components/detallescomponent/dlistarcomponent/dlistarcomponent';
import { Dinsertarcomponent } from './components/detallescomponent/dinsertarcomponent/dinsertarcomponent';
import { Dactualizarcomponent } from './components/detallescomponent/dactualizarcomponent/dactualizarcomponent';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
  { path: 'pacientes', component: PacienteComponent },
  {
    path: 'detalles',
    component: Detallescomponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'listar' },
      { path: 'listar', component: Dlistarcomponent },
      { path: 'insertar', component: Dinsertarcomponent },
      { path: 'editar/:id', component: Dactualizarcomponent },
    ],
  },
  {
    path: 'recetas',
    component: Recetascomponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'listar' },
      { path: 'listar', component: Rlistarcomponent },
      { path: 'insertar', component: Rinsertarcomponent },
      { path: 'editar/:id', component: Ractualizarcomponent },
    ],
  },
  {
    path: 'lentes',
    component: Lentescomponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'listar' },
      { path: 'listar', component: Llistarcomponent },
      { path: 'insertar', component: Linsertarcomponent },
      { path: 'editar/:id', component: Lactualizarcomponent },
    ],
  },
  { path: '**', redirectTo: 'pacientes' },
];
