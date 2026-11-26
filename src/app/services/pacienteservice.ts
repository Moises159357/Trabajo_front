import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PacienteDTO } from '../models/PacienteDTO';

@Injectable({
    providedIn: 'root',
})
export class Pacienteservice {
    private apiURL = `${environment.base}/api/paciente`

    constructor(private http: HttpClient){}

    getListPaciente(): Observable<PacienteDTO[]>{
        return this.http.get<PacienteDTO[]>(`${this.apiURL}/listarP`)
    }

    insertPaciente(p: PacienteDTO): Observable<PacienteDTO> {
        return this.http.post<PacienteDTO>(`${this.apiURL}/registrarP`, p)
    }

    listId(id: number): Observable<PacienteDTO> {
        return this.http.get<PacienteDTO>(`${this.apiURL}/buscarIDP/${id}`)
    }

    updatePaciente(p: PacienteDTO): Observable<PacienteDTO> {
        return this.http.put<PacienteDTO>(`${this.apiURL}/actualizarPaciente`, p)
    }

    deletePaciente(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/eliminarPaciente/${id}`)
    }
}
