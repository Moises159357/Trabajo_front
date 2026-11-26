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
  displayedColumns: string[] = ['c2', 'c3', 'c4', 'c6', 'c7', 'c8', 'c9'];
  dataSource: OftalmologoDTO[] = [];

  idAEliminar: number | null = null;
  mostrarConfirmacion: boolean = false;
  oftalmologoPerfil: OftalmologoDTO | null = null;

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

  confirmarEliminacion(id: number) {
    this.idAEliminar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarEliminacion() {
    this.idAEliminar = null;
    this.mostrarConfirmacion = false;
  }

  ejecutarEliminacion() {
    if (this.idAEliminar === null) return;

    const id = this.idAEliminar;
    this.mostrarConfirmacion = false;
    this.idAEliminar = null;

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

  verPerfil(oftalmologo: OftalmologoDTO) {
    this.oftalmologoPerfil = oftalmologo;
  }

  cerrarPerfil() {
    this.oftalmologoPerfil = null;
  }
}
