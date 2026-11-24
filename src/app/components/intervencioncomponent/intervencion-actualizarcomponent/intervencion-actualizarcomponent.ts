
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Intervencionservice } from '../../../services/intervencionservice';
import { ActivatedRoute, Router } from '@angular/router';
import { IntervencionDTO } from '../../../models/IntervencionDTO';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-intervencion-actualizarcomponent',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './intervencion-actualizarcomponent.html',
  styleUrl: './intervencion-actualizarcomponent.css',
})
export class IntervencionActualizarcomponent implements OnInit {

  idIntervencion: any = null
  formIntervencion!: FormGroup;
  mensaje: string = '';
  cargando: boolean = true;
  guardando: boolean = false;

  constructor(
    private iS: Intervencionservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // Recuperar ID desde la URL
    this.idIntervencion = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID recibido:', this.idIntervencion);

    if (!Number.isInteger(this.idIntervencion) || this.idIntervencion <= 0) {
      this.mensaje = 'ID inválido';
      this.cargando = false;
      return;
    }

    this.formIntervencion = this.fb.group({
      codigo: [this.idIntervencion],
      idVenta: [0, [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      fecha: [new Date(), Validators.required],
      descripcion: ['', Validators.required],
      indicaciones: ['']
    });

    this.buscarPorId();
  }

  buscarPorId(): void {

    this.iS.listId(this.idIntervencion).subscribe({

      next: (data: IntervencionDTO) => {

        console.log('Intervención encontrada:', data);

        const fechaTexto = String(data.fecha).substring(0, 10);
        const fecha = new Date(fechaTexto + 'T00:00:00');

        this.formIntervencion.patchValue({
          codigo: data.idIntervencion,
          idVenta: data.idVenta,
          tipo: data.tipo,
          fecha: fecha,
          descripcion: data.descripcion,
          indicaciones: data.indicaciones
        });

        this.cargando = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error al buscar intervención', error);
        this.mensaje = 'No se encontró la intervención';
        this.cargando = false;
        this.cdr.detectChanges();
      }

    });

  }

  actualizarIntervencion(): void {

    if (this.formIntervencion.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }

    if (this.cargando || this.guardando) {
      return;
    }

    const dto: IntervencionDTO = {
      idIntervencion: this.formIntervencion.value.codigo,
      idVenta: this.formIntervencion.value.idVenta,
      tipo: this.formIntervencion.value.tipo,
      fecha: this.formIntervencion.value.fecha,
      descripcion: this.formIntervencion.value.descripcion,
      indicaciones: this.formIntervencion.value.indicaciones
    };

    this.guardando = true;

    this.iS.updateIntervencion(dto).subscribe({

      next: () => {
        this.mensaje = 'Se actualizó correctamente';
        this.guardando = false;
        this.cdr.detectChanges();

        // Regresar al listado si lo deseas
        // this.router.navigate(['/intervencion/listar']);
      },

      error: (error) => {
        console.error(error);
        this.mensaje = 'Error al actualizar!!';
        this.guardando = false;
        this.cdr.detectChanges();
      }

    });

  }

}
