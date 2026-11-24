import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CitasDTO } from '../../../models/CitasDTO';
import { Citaservice } from '../../../services/citaservice';


@Component({
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-citas-listarcomponent',
  styleUrl: './citas-listarcomponent.css',
  templateUrl: './citas-listarcomponent.html',
})
export class CitasListarcomponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  dataSource: CitasDTO[] = [];
  constructor(
    private cS: Citaservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(){
    this.cS.getListCitas().subscribe({
      next: data => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    });
  }

  eliminarCitas(id: number) {
    this.cS.deleteCitas(id).subscribe({
      next: () => {
        this.obtenerCitas();
      },
      error: err => {
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    });
  }

}
