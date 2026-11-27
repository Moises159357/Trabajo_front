import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-menucomponent',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, RouterLink],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  constructor(
    private readonly loginService: Loginservice,
    private readonly router: Router,
  ) {}
  get username(): string {
    return this.loginService.getUsername();
  }

  get roles(): string {
    return this.loginService.getRoles().join(', ');
  }
  cerrarSesion(): void {
    this.loginService.logout();
    void this.router.navigateByUrl('/login/OpticVision', { replaceUrl: true });
  }
  get esOftalmologo(): boolean {
    return this.loginService.hasAnyRole(['OFTALMOLOGO']);
  }
  get esAdmin(): boolean {
    return this.loginService.hasAnyRole(['ADMIN']);
  }
  get esPaciente(): boolean {
    return this.loginService.hasAnyRole(['PACIENTE']);
  }
}
