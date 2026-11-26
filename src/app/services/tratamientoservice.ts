import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TratamientoDTO } from '../models/TratamientoDTO';

@Injectable({
  providedIn: 'root',
})
export class Tratamientoservice {
  private apiURL = `${environment.base}/api/tratamientos`;

  constructor(private http: HttpClient) {}

  getListTratamientos(): Observable<TratamientoDTO[]> {
    return this.http.get<TratamientoDTO[]>(this.apiURL);
  }

  insertTratamiento(dto: TratamientoDTO): Observable<TratamientoDTO> {
    return this.http.post<TratamientoDTO>(`${this.apiURL}/registrar`, dto);
  }

  deleteTratamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/EliminarTratamiento/${id}`);
  }

  listId(id: number): Observable<TratamientoDTO> {
    return this.http.get<TratamientoDTO>(`${this.apiURL}/buscarPorID/${id}`);
  }

  updateTratamiento(dto: TratamientoDTO): Observable<TratamientoDTO> {
    return this.http.put<TratamientoDTO>(`${this.apiURL}/actualizar`, dto);
  }

  obtenerTratamientosPorEstado(estado: string) {
    return this.http.get<TratamientoDTO[]>(`${this.apiURL}/obtenerTratamientoPorEstado/${estado}`);
  }
}
