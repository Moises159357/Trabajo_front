import { Routes } from '@angular/router';
import { Recetascomponent } from './components/recetascomponent/recetascomponent';
import { Rlistarcomponent } from './components/recetascomponent/rlistarcomponent/rlistarcomponent';
import { Rinsertarcomponent } from './components/recetascomponent/rinsertarcomponent/rinsertarcomponent';
import { Ractualizarcomponent } from './components/recetascomponent/ractualizarcomponent/ractualizarcomponent';
import { Lentescomponent } from './components/lentescomponent/lentescomponent';
import { Llistarcomponent } from './components/lentescomponent/llistarcomponent/llistarcomponent';
import { Linsertarcomponent } from './components/lentescomponent/linsertarcomponent/linsertarcomponent';
import { Lactualizarcomponent } from './components/lentescomponent/lactualizarcomponent/lactualizarcomponent';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'recetas' },
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
	{ path: '**', redirectTo: 'recetas' },
];
