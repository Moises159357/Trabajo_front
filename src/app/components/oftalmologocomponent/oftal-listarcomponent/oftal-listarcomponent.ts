import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { OftalmologoDTO } from '../../../models/OftalmologoDTO';
import { Oftalmologoservice } from '../../../services/oftalmologoservice';

@Component({
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-oftal-listarcomponent',
  styleUrl: './oftal-listarcomponent.css',
  templateUrl: './oftal-listarcomponent.html',
})
export class OftalListarcomponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  dataSource: OftalmologoDTO[] = [];

  constructor(
    private oS: Oftalmologoservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.obtenerOftalmologos();
  }

  obtenerOftalmologos() {
    this.oS.getListOftalmologo().subscribe({
      next: data => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }

  eliminarOftalmologo(id: number) {
    this.oS.deleteOftalmologo(id).subscribe({
      next: () => {
        this.obtenerOftalmologos();
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      },
    });
  }
}
