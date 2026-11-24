
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TratamientoDTO } from '../../../models/TratamientoDTO';
import { Tratamientoservice } from '../../../services/tratamientoservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tratamiento-listarcomponent',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './tratamiento-listarcomponent.html',
  styleUrl: './tratamiento-listarcomponent.css',
})
export class TratamientoListarcomponent implements OnInit {

  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'
  ];

  dataSource: TratamientoDTO[] = [];

  constructor(
    private tService: Tratamientoservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerTratamientos();
  }

  obtenerTratamientos() {
    this.tService.getListTratamientos().subscribe({
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

  eliminarTratamiento(id: number) {

    if (!confirm('¿Desea eliminar este tratamiento?')) {
      return;
    }

    this.tService.deleteTratamiento(id).subscribe({
      next: () => {
        this.obtenerTratamientos();
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    })

  }

}
