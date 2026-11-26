import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Oftalmologoservice } from '../../../services/oftalmologoservice';
import { OftalmologoDTO } from '../../../models/OftalmologoDTO';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule],
  selector: 'app-oftal-actualizarcomponent',
  styleUrl: './oftal-actualizarcomponent.css',
  templateUrl: './oftal-actualizarcomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class OftalActualizarcomponent implements OnInit {
  idOftalmologo: any = null;
  formOftalmologo!: FormGroup;
  oftalmologoAnterior!: OftalmologoDTO;
  mensaje: string = '';

  constructor(
    private oS: Oftalmologoservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Recuperar ID desde la URL
    this.idOftalmologo = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID recibido:', this.idOftalmologo);
    if (!this.idOftalmologo || isNaN(this.idOftalmologo)) {
      this.mensaje = 'ID inválido';
      return;
    }

    this.formOftalmologo = this.fb.group({
      codigo: [this.idOftalmologo],
      nombres: ['', [Validators.required, Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      colegiatura: ['', [Validators.required, Validators.maxLength(80)]],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      disponibilidad: [true],
    });

    this.buscarPorId();
  }

  buscarPorId(): void {
    this.oS.listId(this.idOftalmologo).subscribe({
      next: (data: OftalmologoDTO) => {
        this.oftalmologoAnterior = data;
        this.formOftalmologo.patchValue({
          codigo: data.idOftalmologo,
          nombres: data.nombres,
          apellidos: data.apellidos,
          colegiatura: data.colegiatura,
          especialidad: data.especialidad,
          correo: data.correo,
          telefono: data.telefono,
          disponibilidad: data.disponibilidad,
        });
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al buscar el oftalmólogo', error);
        this.mensaje = 'No se encontró el oftalmólogo';
        this.cdr.detectChanges();
      },
    });
  }

  actualizarOftalmologo(): void {
    if (this.formOftalmologo.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }

    const dto: OftalmologoDTO = {
      idOftalmologo: this.formOftalmologo.value.codigo,
      nombres: this.formOftalmologo.value.nombres,
      apellidos: this.formOftalmologo.value.apellidos,
      colegiatura: this.formOftalmologo.value.colegiatura,
      especialidad: this.formOftalmologo.value.especialidad,
      correo: this.formOftalmologo.value.correo,
      telefono: this.formOftalmologo.value.telefono,
      disponibilidad: this.formOftalmologo.value.disponibilidad,
    };

    this.oS.updateOftalmologo(dto).subscribe({
      next: () => {
        this.mensaje = 'Se actualizó correctamente';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
        this.cdr.detectChanges();
      },
    });
  }
}
