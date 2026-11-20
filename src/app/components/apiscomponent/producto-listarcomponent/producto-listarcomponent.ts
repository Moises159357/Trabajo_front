import { Component } from '@angular/core';
import { ChangeDetectorRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Productoservice } from '../../../services/productoservice'; 
import { ProductoDTO } from '../../../models/ProductoDTO';

@Component({
  imports: [MatCardModule],
  selector: 'app-producto-listarcomponent',
  styleUrl: './producto-listarcomponent.css',
  templateUrl: './producto-listarcomponent.html',
})
export class ProductoListarcomponent implements OnInit{
  productos: ProductoDTO[]=[];

  constructor(private pS: Productoservice, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pS.getGafas().subscribe({
      next: data => {
        this.productos = data.products;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
      }
    });
  }
}
