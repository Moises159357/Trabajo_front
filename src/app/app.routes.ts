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
import { Tratamientocomponent } from './components/tratamientocomponent/tratamientocomponent';
import { Intervencioncomponent } from './components/intervencioncomponent/intervencioncomponent';
import { IntervencionActualizarcomponent } from './components/intervencioncomponent/intervencion-actualizarcomponent/intervencion-actualizarcomponent';
import { IntervencionListarcomponent } from './components/intervencioncomponent/intervencion-listarcomponent/intervencion-listarcomponent';
import { IntervencionInsertarcomponent } from './components/intervencioncomponent/intervencion-insertarcomponent/intervencion-insertarcomponent';
import { TratamientoListarcomponent } from './components/tratamientocomponent/tratamiento-listarcomponent/tratamiento-listarcomponent';
import { TratamientoActualizarcomponent } from './components/tratamientocomponent/tratamiento-actualizarcomponent/tratamiento-actualizarcomponent';
import { TratamientoInsertarcomponent } from './components/tratamientocomponent/tratamiento-insertarcomponent/tratamiento-insertarcomponent';

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
        ]
    },

    {
        path:'intervencion',
        component: Intervencioncomponent,
        children:[
            {
                path:'',
                redirectTo:'listar',
                pathMatch: 'full',
            },
            {
                path:'listar',
                component: IntervencionListarcomponent,
            },
            {
                path:'editar/:id',
                component: IntervencionActualizarcomponent,
            },
            {
                path: 'insertar',
                component: IntervencionInsertarcomponent,
            },
        ]
    },

    {
        path:'tratamiento',
        component: Tratamientocomponent,
        children:[
            {
                path:'',
                redirectTo:'listar',
                pathMatch: 'full',
            },
            {
                path:'listar',
                component: TratamientoListarcomponent,
            },
            {
                path:'editar/:id',
                component: TratamientoActualizarcomponent,
            },
            {
                path: 'insertar',
                component: TratamientoInsertarcomponent,
            },
        ]
    },
];
