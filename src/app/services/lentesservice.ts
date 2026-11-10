import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LenteDTO } from '../models/LenteDTO';

@Injectable({ providedIn: 'root' })
export class Lentesservice {
  private apiURL = `${environment.base}/lentes`;

  constructor(private http: HttpClient) {}

  getListLentes(): Observable<LenteDTO[]> {
    return this.http.get<LenteDTO[]>(`${this.apiURL}/listarLentes`);
  }

  deleteLente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/eliminarLente/${id}`);
  }

  insertLente(lente: LenteDTO): Observable<LenteDTO> {
    return this.http.post<LenteDTO>(`${this.apiURL}/registrarLente`, lente);
  }

  listId(id: number): Observable<LenteDTO> {
    return this.http.get<LenteDTO>(`${this.apiURL}/buscarLentePorId/${id}`);
  }

  updateLente(lente: LenteDTO): Observable<LenteDTO> {
    return this.http.put<LenteDTO>(`${this.apiURL}/actualizarLente`, lente);
  }
}