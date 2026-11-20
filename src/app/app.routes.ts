import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Pacientecomponent } from './components/pacientecomponent/pacientecomponent';
import { PacienteListarcomponent } from './components/pacientecomponent/paciente-listarcomponent/paciente-listarcomponent';
import { Pacienteactualizarcomponent} from './components/pacientecomponent/paciente-actualizarcomponent/paciente-actualizarcomponent';
import { PacienteInsertarcomponent } from './components/pacientecomponent/paciente-insertarcomponent/paciente-insertarcomponent';
import { Oftalmologocomponent } from './components/oftalmologocomponent/oftalmologocomponent';
import { OftalListarcomponent } from './components/oftalmologocomponent/oftal-listarcomponent/oftal-listarcomponent';
import { OftalActualizarcomponent } from './components/oftalmologocomponent/oftal-actualizarcomponent/oftal-actualizarcomponent';
import { OftalInsertarcomponent } from './components/oftalmologocomponent/oftal-insertarcomponent/oftal-insertarcomponent';
import { Citascomponent } from './components/citascomponent/citascomponent';
import { CitasListarcomponent } from './components/citascomponent/citas-listarcomponent/citas-listarcomponent';
import { CitasActualizarcomponent } from './components/citascomponent/citas-actualizarcomponent/citas-actualizarcomponent';
import { CitasInsertarcomponent } from './components/citascomponent/citas-insertarcomponent/citas-insertarcomponent';
import { CitasBuscarcomponent } from './components/citascomponent/citas-buscarcomponent/citas-buscarcomponent';
import { Reportescomponent } from './components/reportescomponent/reportescomponent';
import { ReporteCitascomponent } from './components/reportescomponent/reporte-citascomponent/reporte-citascomponent';
import { Apiscomponent } from './components/apiscomponent/apiscomponent';
import { ProductoListarcomponent } from './components/apiscomponent/producto-listarcomponent/producto-listarcomponent';

export const routes: Routes = [
    {
        path:'',
        component: Homecomponent,
    },
    {
        path:'paciente',
        component: Pacientecomponent,
        children: [
            {
                path:'',
                redirectTo:'listar',
                pathMatch: 'full',
            },
            {
                path:'listar',
                component: PacienteListarcomponent,
            },
            {
                path:'editar/:id',
                component: Pacienteactualizarcomponent,
            },
            {
                path: 'insertar',
                component: PacienteInsertarcomponent,
            },
        ],
    },

    {
        path:'oftalmologo',
        component: Oftalmologocomponent,
        children: [
            {
                path:'',
                redirectTo:'listar',
                pathMatch: 'full',
            },
            {
                path:'listar',
                component: OftalListarcomponent,
            },
            {
                path:'editar/:id',
                component: OftalActualizarcomponent,
            },
            {
                path: 'insertar',
                component: OftalInsertarcomponent,
            },
        ]
    },

    {
        path:'citas',
        component: Citascomponent,
        children:[
            {
                path:'',
                redirectTo:'listar',
                pathMatch: 'full',
            },
            {
                path:'listar',
                component: CitasListarcomponent,
            },
            {
                path:'editar/:id',
                component: CitasActualizarcomponent,
            },
            {
                path: 'insertar',
                component: CitasInsertarcomponent,
            },
            {
                path: 'buscar',
                component: CitasBuscarcomponent
            }
        ]
    },

    {
        path: 'reportes',
        component: Reportescomponent,
        children: [
            {
                path: '',
                redirectTo: 'reportecitas',
                pathMatch: 'full',
            },
            {
                path: 'reportecitas',
                component: ReporteCitascomponent
            }
        ]
    },

    {
        path:'apis',
        component: Apiscomponent,
        children: [
            {
                path: '',
                redirectTo: 'productos',
                pathMatch: 'full',
            },
            {
                path: 'productos',
                component: ProductoListarcomponent,
            }
        ]
    }

];
