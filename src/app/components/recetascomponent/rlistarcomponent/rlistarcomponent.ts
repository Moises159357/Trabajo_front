import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { Recetasservice } from '../../../services/recetasservice';

@Component({
  selector: 'app-rlistarcomponent',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './rlistarcomponent.html',
  styleUrl: './rlistarcomponent.css',
})
export class Rlistarcomponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: RecetasDTO[] = [];

  constructor(private rService: Recetasservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerRecetas();
  }

  obtenerRecetas(): void {
    this.rService.getListRecetas().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }

  eliminarReceta(id: number): void {
    this.rService.deleteReceta(id).subscribe({
      next: () => this.obtenerRecetas(),
      error: (err) => console.log('Ocurrió un error al eliminar la receta', err),
    });
  }
}