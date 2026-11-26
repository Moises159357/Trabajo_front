import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OftalmologoDTO } from '../models/OftalmologoDTO';

@Injectable({
    providedIn: 'root'
})
export class Oftalmologoservice {

    private apiURL = `${environment.base}/api/oftalmologos`

    constructor(private http: HttpClient) { }

    getListOftalmologo(): Observable<OftalmologoDTO[]> {
        return this.http.get<OftalmologoDTO[]>(`${this.apiURL}/listar`)
    }

    insertOftalmologo(o: OftalmologoDTO): Observable<OftalmologoDTO> {
        return this.http.post<OftalmologoDTO>(`${this.apiURL}/registrar`, o)
    }

    listId(id: number): Observable<OftalmologoDTO> {
        return this.http.get<OftalmologoDTO>(`${this.apiURL}/buscarID/${id}`)
    }

    updateOftalmologo(o: OftalmologoDTO): Observable<OftalmologoDTO> {
        return this.http.put<OftalmologoDTO>(`${this.apiURL}/actualizar`, o)
    }

    deleteOftalmologo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/eliminar/${id}`)
    }

}
