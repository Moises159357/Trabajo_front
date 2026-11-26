import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loginservice } from '../../services/loginservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  imports: [ReactiveFormsModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Loginservice);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage = '';
  submitting = false;

  submit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.submitting = true;

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting = false;

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const destination =
          returnUrl?.startsWith('/') && !returnUrl.startsWith('//') && returnUrl !== '/'
            ? returnUrl
            : '/inicio';

        void this.router.navigateByUrl(destination);
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'No se pudo iniciar sesión. Verifica tus credenciales e inténtalo nuevamente.';
      },
    });
  }
}