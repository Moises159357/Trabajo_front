import { ChangeDetectorRef, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CitasDTO } from '../../../models/CitasDTO';
import { Citaservice } from '../../../services/citaservice';

@Component({
  imports: [MatInputModule, MatButtonModule, MatTableModule],
  selector: 'app-citas-buscarcomponent',
  styleUrl: './citas-buscarcomponent.css',
  templateUrl: './citas-buscarcomponent.html',
})
export class CitasBuscarcomponent {
  dataSource: CitasDTO[] = [];
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  mensaje: string = '';

  constructor(
    private cS: Citaservice,
    private cdr: ChangeDetectorRef,
  ) {}

  buscarPorId(valor: string): void {
    const id = Number(valor);

    if (!id || isNaN(id)) {
      this.dataSource = [];
      this.mensaje = 'Ingrese un ID válido';
      return;
    }

    this.cS.listId(id).subscribe({
      next: (data) => {
        this.dataSource = [data];
        this.mensaje = '';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al buscar!!', error);
        this.dataSource = [];
        this.mensaje = 'No existe la cita con el id: ' + id;
        this.cdr.detectChanges();
      },
    });
  }
}
