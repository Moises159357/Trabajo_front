import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IntervencionDTO } from "../models/IntervencionDTO";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class Intervencionservice {
        private apiURL = `${environment.base}/api/intervenciones`

        constructor(private http: HttpClient) {}

        getListIntervenciones(): Observable<IntervencionDTO[]> {
            return this.http.get<IntervencionDTO[]>(this.apiURL);
        }

        insertIntervencion(dto: IntervencionDTO): Observable<IntervencionDTO> {
            return this.http.post<IntervencionDTO>(`${this.apiURL}/registrar`, dto)
        }

        deleteIntervencion(id: number): Observable<void> {
            return this.http.delete<void>(`${this.apiURL}/EliminarIntervencion/${id}`)
        }
        
        listId(id: number): Observable<IntervencionDTO> {
            return this.http.get<IntervencionDTO>(`${this.apiURL}/buscarPorID/${id}`)
        }

        updateIntervencion(dto: IntervencionDTO): Observable<IntervencionDTO> {
            return this.http.put<IntervencionDTO>(`${this.apiURL}/actualizar`, dto)
        }

    


}