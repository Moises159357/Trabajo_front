import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequestDTO } from '../models/LoginRequestDTO';
import { LoginResponseDTO } from '../models/LoginResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestservice {
  // Ajusta '/api/auth/login' si tu LoginController usa otra ruta (ej. '/login' o '/login/OpticVision')
  private loginUrl = `${environment.base}/login/OpticVision`;
  private readonly tokenKey = 'opticvision_token';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(this.loginUrl, credentials).pipe(
      tap((res) => {
        const token = res.token || res.jwt || res.accessToken;
        if (token) {
          this.guardarToken(token);
        }
      })
    );
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.tokenKey);
  }
}