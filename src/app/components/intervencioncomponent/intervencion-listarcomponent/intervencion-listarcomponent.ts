
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IntervencionDTO } from '../../../models/IntervencionDTO';
import { Intervencionservice } from '../../../services/intervencionservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-intervencion-listarcomponent',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './intervencion-listarcomponent.html',
  styleUrl: './intervencion-listarcomponent.css',
})
export class IntervencionListarcomponent implements OnInit {

  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'
  ];

  dataSource: IntervencionDTO[] = [];

  constructor(
    private iService: Intervencionservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerIntervenciones();
  }

  obtenerIntervenciones() {
    this.iService.getListIntervenciones().subscribe({
      next: data => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    })
  }

  eliminarIntervencion(id: number) {
    if (!confirm('¿Desea eliminar esta intervención?')) {
      return;
    }

    this.iService.deleteIntervencion(id).subscribe({
      next: () => {
        this.obtenerIntervenciones();
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    })
  }

}
