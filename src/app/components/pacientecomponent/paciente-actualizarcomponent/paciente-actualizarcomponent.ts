import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Pacienteservice } from '../../../services/pacienteservice';
import { PacienteDTO } from '../../../models/PacienteDTO';

@Component({
  imports: [ MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule],
  selector: 'app-paciente-actualizarcomponent',
  styleUrl: './paciente-actualizarcomponent.css',
  templateUrl: './paciente-actualizarcomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class Pacienteactualizarcomponent implements OnInit {
  idPaciente: number = 0
  formPaciente!: FormGroup
  mensaje: string = ''

  constructor(
    private pS: Pacienteservice,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('id'))

    if (!this.idPaciente || isNaN(this.idPaciente)) {
      this.mensaje = 'ID inválido'
      return
    }

    this.formPaciente = this.fb.group({
      codigo: [this.idPaciente],
      dni: ['', [Validators.required, Validators.maxLength(9)]],
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      apellidos: ['', [Validators.required, Validators.maxLength(30)]],
      genero: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(11)]],
      nacimiento: [new Date(), Validators.required],
      inscripcion: [new Date(), Validators.required]
    })

    this.buscarPorId()
  }

  buscarPorId(): void {
    this.pS.listId(this.idPaciente).subscribe({
      next: (data: PacienteDTO) => {
        this.formPaciente.patchValue({
          codigo: data.idPaciente,
          dni: data.dni,
          nombre: data.nombre,
          apellidos: data.apellidos,
          genero: data.genero,
          correo: data.correo,
          direccion: data.direccion,
          telefono: data.telefono,
          nacimiento: new Date(data.fechaNacimiento + 'T00:00:00'),
          inscripcion: new Date(data.fechaInscripcion + 'T00:00:00')
        })
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error('Error al buscar el paciente', error)
        this.mensaje = 'No se encontró el paciente'
        this.cdr.detectChanges()
      }
    })
  }

  actualizarPaciente(): void {
    if (this.formPaciente.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.'
      return
    }

    const dto: PacienteDTO = {
      idPaciente: this.formPaciente.value.codigo,
      dni: this.formPaciente.value.dni,
      nombre: this.formPaciente.value.nombre,
      apellidos: this.formPaciente.value.apellidos,
      genero: this.formPaciente.value.genero,
      correo: this.formPaciente.value.correo,
      direccion: this.formPaciente.value.direccion,
      telefono: this.formPaciente.value.telefono,
      fechaNacimiento: this.formPaciente.value.nacimiento.toISOString().split('T')[0],
      fechaInscripcion: this.formPaciente.value.inscripcion.toISOString().split('T')[0]
    }

    this.pS.updatePaciente(dto).subscribe({
      next: () => {
        this.mensaje = 'Se actualizó correctamente'
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error(error)
        this.mensaje = 'Error al actualizar!!'
        this.cdr.detectChanges()
      }
    })
  }
}
