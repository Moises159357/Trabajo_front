import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecetasDTO } from '../models/RecetasDTO';

@Injectable({ providedIn: 'root' })
export class Recetasservice {
  private apiURL = `${environment.base}/api/recetas`;

  constructor(private http: HttpClient) {}

  getListRecetas(): Observable<RecetasDTO[]> {
    return this.http.get<RecetasDTO[]>(this.apiURL);
  }

  deleteReceta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  insertReceta(receta: RecetasDTO): Observable<RecetasDTO> {
    return this.http.post<RecetasDTO>(`${this.apiURL}/registrar`, receta);
  }

  listId(id: number): Observable<RecetasDTO> {
    return this.http.get<RecetasDTO>(`${this.apiURL}/buscarPorID/${id}`);
  }

  updateReceta(receta: RecetasDTO): Observable<RecetasDTO> {
    return this.http.put<RecetasDTO>(`${this.apiURL}/actualizar`, receta);
  }
}