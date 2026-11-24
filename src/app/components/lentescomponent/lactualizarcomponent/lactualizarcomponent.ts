import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LenteDTO } from '../../../models/LenteDTO';
import { Lentesservice } from '../../../services/lentesservice';

@Component({
  selector: 'app-lactualizarcomponent',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './lactualizarcomponent.html',
  styleUrl: './lactualizarcomponent.css',
})
export class Lactualizarcomponent implements OnInit {
  idLente = 0;
  mensaje = '';
  formLente: any;

  constructor(
    private lS: Lentesservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.formLente = this.fb.group({
      idLente: [0],
      modelo: ['', [Validators.required, Validators.maxLength(50)]],
      marca: ['', [Validators.required, Validators.maxLength(50)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.idLente = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.idLente || Number.isNaN(this.idLente)) {
      this.mensaje = 'ID inválido';
      return;
    }
    this.buscarPorId();
  }

  buscarPorId(): void {
    this.lS.listId(this.idLente).subscribe({
      next: (data: LenteDTO) => this.formLente.patchValue(data),
      error: (error) => this.mensaje = 'No se encontró el lente: ' + error.message,
    });
  }

  actualizarLente(): void {
    if (this.formLente.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const lente: LenteDTO = {
      idLente: this.idLente,
      modelo: this.formLente.value.modelo ?? '',
      marca: this.formLente.value.marca ?? '',
      precio: Number(this.formLente.value.precio),
    };
    this.lS.updateLente(lente).subscribe({
      next: () => {
        this.mensaje = 'Se actualizó correctamente';
        this.cdr.detectChanges();
        this.router.navigate(['/lentes/listar']);
      },
      error: (error) => this.mensaje = 'Error al actualizar: ' + error.message,
    });
  }
}