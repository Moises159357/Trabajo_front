import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LenteDTO } from '../../../models/LenteDTO';
import { Lentesservice } from '../../../services/lentesservice';

@Component({
  selector: 'app-llistarcomponent',
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './llistarcomponent.html',
  styleUrl: './llistarcomponent.css',
})
export class Llistarcomponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: LenteDTO[] = [];

  constructor(private lService: Lentesservice, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtenerLentes();
  }

  obtenerLentes(): void {
    this.lService.getListLentes().subscribe({
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

  eliminarLente(id: number): void {
    this.lService.deleteLente(id).subscribe({
      next: () => this.obtenerLentes(),
      error: (err) => console.log('Ocurrió un error al eliminar el lente', err),
    });
  }
}