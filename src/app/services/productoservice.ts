import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductosRespuesta } from '../models/ProductoDTO';

@Injectable({
    providedIn: 'root',
})
export class Productoservice {
    private apiURL = 'https://dummyjson.com/products'

  constructor(private http: HttpClient) { }

  getGafas(): Observable<ProductosRespuesta> {
    return this.http.get<ProductosRespuesta>(`${this.apiURL}/category/sunglasses`)
  }
}
