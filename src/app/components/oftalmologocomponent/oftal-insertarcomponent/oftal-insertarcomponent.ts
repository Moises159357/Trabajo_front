import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Oftalmologoservice } from '../../../services/oftalmologoservice';
import { OftalmologoDTO } from '../../../models/OftalmologoDTO';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule],
  selector: 'app-oftal-insertarcomponent',
  styleUrl: './oftal-insertarcomponent.css',
  templateUrl: './oftal-insertarcomponent.html',
  providers: [provideNativeDateAdapter()],
})
export class OftalInsertarcomponent {
  formOftalmologo: any;
  mensaje: string = '';

  constructor(
    private oS: Oftalmologoservice,
    private fb: FormBuilder,
  ) {
    this.formOftalmologo = fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(50)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50)]],
      colegiatura: ['', [Validators.required, Validators.maxLength(80)]],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(20)]],
      disponibilidad: [true],
    });
  }

  insertarOftalmologo() {
    if (this.formOftalmologo.invalid) {
      this.mensaje = 'Por favor complete todos los campos correctamente.';
      return;
    }
    const oft: OftalmologoDTO = {
      idOftalmologo: 0,
      nombres: this.formOftalmologo.value.nombres,
      apellidos: this.formOftalmologo.value.apellidos,
      colegiatura: this.formOftalmologo.value.colegiatura,
      especialidad: this.formOftalmologo.value.especialidad,
      correo: this.formOftalmologo.value.correo,
      telefono: this.formOftalmologo.value.telefono,
      disponibilidad: this.formOftalmologo.value.disponibilidad,
    };
    this.oS.insertOftalmologo(oft).subscribe({
      next: (respuesta) => {
        this.mensaje = 'Oftalmólogo insertado correctamente!!!!';
        this.formOftalmologo.reset({
          disponibilidad: true,
        });
      },
      error: (error) => {
        this.mensaje = 'Error al insertar el oftalmólogo: ' + error.message;
      },
    });
  }
}
