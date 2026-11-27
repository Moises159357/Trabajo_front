import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Detalle } from '../models/detalle.model';

@Injectable({ providedIn: 'root' })
export class DetallesService {
  private readonly apiUrl = `${environment.base}/detalles`;

  constructor(private readonly http: HttpClient) {}

  listar(): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${this.apiUrl}/listarDetalles`);
  }

  buscarPorId(id: number): Observable<Detalle> {
    return this.http.get<Detalle>(`${this.apiUrl}/buscarDetallePorId/${id}`);
  }

  buscarPorHistorial(idHistorial: number): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${this.apiUrl}/buscarPorHistorial/${idHistorial}`);
  }

  crear(detalle: Omit<Detalle, 'idDetalle'>): Observable<Detalle> {
    return this.http.post<Detalle>(`${this.apiUrl}/registrarDetalle`, detalle);
  }

  actualizar(detalle: Detalle): Observable<Detalle> {
    return this.http.put<Detalle>(`${this.apiUrl}/actualizarDetalle`, detalle);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminarDetalle/${id}`);
  }
}
