import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RecetasDTO } from '../../../models/RecetasDTO';
import { Recetasservice } from '../../../services/recetasservice';

@Component({
  selector: 'app-ractualizarcomponent',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './ractualizarcomponent.html',
  styleUrl: './ractualizarcomponent.css',
})
export class Ractualizarcomponent implements OnInit {
  idReceta = 0;
  mensaje = '';
  formReceta: any;

  constructor(
    private rS: Recetasservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.formReceta = this.fb.group({
      idReceta: [0],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      indicaciones: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  ngOnInit(): void {
    this.idReceta = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.idReceta || Number.isNaN(this.idReceta)) {
      this.mensaje = 'ID inválido';
      return;
    }
    this.buscarPorId();
  }

  buscarPorId(): void {
    this.rS.listId(this.idReceta).subscribe({
      next: (data: RecetasDTO) => this.formReceta.patchValue(data),
      error: (error) => this.mensaje = 'No se encontró la receta: ' + error.message,
    });
  }

  actualizarReceta(): void {
    if (this.formReceta.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const receta: RecetasDTO = {
      idReceta: this.idReceta,
      fechaInicio: this.formReceta.value.fechaInicio ?? '',
      fechaFin: this.formReceta.value.fechaFin ?? '',
      indicaciones: this.formReceta.value.indicaciones ?? '',
    };
    this.rS.updateReceta(receta).subscribe({
      next: () => {
        this.mensaje = 'Se actualizó correctamente';
        this.cdr.detectChanges();
        this.router.navigate(['/recetas/listar']);
      },
      error: (error) => this.mensaje = 'Error al actualizar: ' + error.message,
    });
  }
}