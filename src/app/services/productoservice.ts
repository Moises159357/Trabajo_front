import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { ProductoDTO, ProductosRespuesta } from '../models/ProductoDTO';

@Injectable({
    providedIn: 'root',
})
export class Productoservice {
    private apiURL = 'https://theoptikstore.com/products.json?limit=250'

  constructor(private http: HttpClient) {}

  getTodoCatalogoLentes(): Observable<ProductoDTO[]> {
    return this.http.get<any>(this.apiURL).pipe(
      map((res) =>
        res.products.map((item: any, index: number) => ({
          id: item.id || index + 1,
          title: item.title,
          brand: item.vendor || 'OpticVision',
          category: item.product_type || 'Eyewear',
          description: (item.body_html || '').replace(/<[^>]*>/g, ''), // Limpia etiquetas HTML
          price: Number(item.variants?.[0]?.price || 120),
          rating: Number((4.2 + (index % 8) * 0.1).toFixed(1)),
          thumbnail: item.images?.[0]?.src || '',
        }))
      )
    );
  }
}
