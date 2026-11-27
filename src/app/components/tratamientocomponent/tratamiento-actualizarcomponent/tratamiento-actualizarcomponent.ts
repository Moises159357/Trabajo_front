
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tratamientoservice } from '../../../services/tratamientoservice';
import { ActivatedRoute } from '@angular/router';
import { TratamientoDTO } from '../../../models/TratamientoDTO';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { formatLocalDate } from '../../../utils/local-date';

@Component({
  selector: 'app-tratamiento-actualizarcomponent',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tratamiento-actualizarcomponent.html',
  styleUrl: './tratamiento-actualizarcomponent.css',
})
export class TratamientoActualizarcomponent implements OnInit {

  idTratamiento: number = 0;
  formTratamiento!: FormGroup;
  mensaje: string = '';
  cargando: boolean = true;
  guardando: boolean = false;

  constructor(
    private tS: Tratamientoservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // Recuperar ID desde la URL
    this.idTratamiento = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID recibido:', this.idTratamiento);

    if (!Number.isInteger(this.idTratamiento) || this.idTratamiento <= 0) {
      this.mensaje = 'ID inválido';
      this.cargando = false;
      return;
    }

    this.formTratamiento = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      duracionDias: [0, [Validators.required, Validators.min(1)]],
      estado: ['', Validators.required],
      fechaRegistro: [new Date(), Validators.required],
      indicaciones: ['', Validators.required]
    });

    this.buscarPorId();
  }

  buscarPorId(): void {

    this.tS.listId(this.idTratamiento).subscribe({

      next: (data: TratamientoDTO) => {

        console.log('Tratamiento encontrado:', data);

        // Convertir la fecha para el calendario
        const fechaTexto = String(data.fechaRegistro).substring(0, 10);
        const fecha = new Date(fechaTexto + 'T00:00:00');

        this.formTratamiento.patchValue({
          nombre: data.nombre,
          tipo: data.tipo,
          duracionDias: data.duracionDias,
          estado: data.estado,
          fechaRegistro: fecha,
          indicaciones: data.indicaciones
        });

        this.cargando = false;
        this.cdr.detectChanges();

      },

      error: (error) => {
        console.error('Error al buscar tratamiento', error);
        this.mensaje = 'No se encontró el tratamiento';
        this.cargando = false;
        this.cdr.detectChanges();
      }

    });

  }

  actualizarTratamiento(): void {

    if (this.formTratamiento.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      this.formTratamiento.markAllAsTouched();
      return;
    }

    if (this.cargando || this.guardando) {
      return;
    }

    const fechaRegistro = formatLocalDate(this.formTratamiento.value.fechaRegistro);
    if (!fechaRegistro) {
      this.mensaje = 'Seleccione una fecha de registro válida.';
      return;
    }

    const dto: TratamientoDTO = {
      idTratamiento: this.idTratamiento,
      nombre: this.formTratamiento.value.nombre,
      tipo: this.formTratamiento.value.tipo,
      duracionDias: this.formTratamiento.value.duracionDias,
      estado: this.formTratamiento.value.estado,
      fechaRegistro,
      indicaciones: this.formTratamiento.value.indicaciones
    };

    this.guardando = true;

    this.tS.updateTratamiento(dto).subscribe({

      next: () => {
        this.mensaje = 'Se actualizó correctamente';
        this.guardando = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error al actualizar tratamiento:', error);
        this.mensaje = 'Error al actualizar!!';
        this.guardando = false;
        this.cdr.detectChanges();
      }

    });

  }

}
