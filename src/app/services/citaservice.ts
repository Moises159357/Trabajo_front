import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CitasDTO } from '../models/CitasDTO';
import { HttpClient } from '@angular/common/http';
import { ReporteCitasDTO } from '../models/ReporteCitasDTO';

@Injectable({
  providedIn: 'root',
})
export class Citaservice {
  private apiURL = `${environment.base}/citas`;

  constructor(private http: HttpClient) {}

  getListCitas(): Observable<CitasDTO[]> {
    return this.http.get<CitasDTO[]>(`${this.apiURL}/listarCitas`);
  }

  insertCitas(c: CitasDTO): Observable<CitasDTO> {
    return this.http.post<CitasDTO>(`${this.apiURL}/registrarCitas`, c);
  }

  listId(id: number): Observable<CitasDTO> {
    return this.http.get<CitasDTO>(`${this.apiURL}/buscarCitasPorId/${id}`);
  }

  updateCitas(c: CitasDTO): Observable<CitasDTO> {
    return this.http.put<CitasDTO>(`${this.apiURL}/actualizarCitas`, c);
  }

  deleteCitas(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/EliminarLaCita/${id}`);
  }

  getTotalCitasPorPaciente() {
    return this.http.get<ReporteCitasDTO[]>(`${this.apiURL}/totalCitasPorPaciente`);
  }

  getOftalmologoFrecuente() {
    return this.http.get<ReporteCitasDTO[]>(`${this.apiURL}/oftalmologoFrecuente`);
  }
}