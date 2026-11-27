import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasDTO } from '../../../models/CitasDTO';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Citaservice } from '../../../services/citaservice';
import { formatLocalDate } from '../../../utils/local-date';

@Component({
  imports: [MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
  selector: 'app-citas-actualizarcomponent',
  styleUrl: './citas-actualizarcomponent.css',
  templateUrl: './citas-actualizarcomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class CitasActualizarcomponent implements OnInit {
  idCitas: any = null;
  formCitas!: FormGroup;
  mensaje: string = '';

  constructor(
    private cS: Citaservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Recuperar ID desde la URL
    this.idCitas = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID recibido:', this.idCitas);

    if (!this.idCitas || isNaN(this.idCitas)) {
      this.mensaje = 'ID inválido';
      return;
    }

    this.formCitas = this.fb.group({
      codigo: [this.idCitas],
      fecha: [new Date(), Validators.required],
      estado: ['', Validators.required],
      motivo: ['', Validators.required],
      paciente: [0, [Validators.required, Validators.min(1)]],
      oftalmologo: [0, [Validators.required, Validators.min(1)]]
    });
    this.buscarPorId();
  }

  buscarPorId(): void{
    this.cS.listId(this.idCitas).subscribe({

      next: (data: CitasDTO) => {

        console.log('Cita encontrada:', data);

        this.formCitas.patchValue({
          codigo: data.idCitas,
          fecha: new Date(data.fechaCita + 'T00:00:00'),
          estado: data.estado,
          motivo: data.motivoCita,
          paciente: data.idPaciente,
          oftalmologo: data.idOftalmologo
        });

      },

      error: (error) => {
        console.error('Error al buscar la cita', error);
        this.mensaje = 'No se encontró la cita';
      }

    });

  }

  actualizarCitas(): void {

    if (this.formCitas.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }

    const fechaCita = formatLocalDate(this.formCitas.value.fecha);
    if (!fechaCita) {
      this.mensaje = 'Seleccione una fecha válida para la cita.';
      return;
    }

    const dto = {
      idCitas: this.formCitas.value.codigo,
      fechaCita,
      estado: this.formCitas.value.estado,
      motivoCita: this.formCitas.value.motivo,
      idPaciente: this.formCitas.value.paciente,
      idOftalmologo: this.formCitas.value.oftalmologo
    };

    this.cS.updateCitas(dto).subscribe({

      next: () => {
        this.mensaje = 'Se actualizó correctamente';
        this.cdr.detectChanges()
        // this.router.navigate(['/citas/listar']);
      },

      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
      }

    });

  }
}
