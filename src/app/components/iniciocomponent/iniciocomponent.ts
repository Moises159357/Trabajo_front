import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestDTO } from '../../models/LoginRequestDTO';
import { LoginRequestservice } from '../../services/LoginRequestservice';

@Component({
  selector: 'app-iniciocomponent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciocomponent.html',
  styleUrl: './iniciocomponent.css'
})
export class Iniciocomponent {
  modalAbierto = false;
  cargando = false;
  mensajeError = '';
  mensajeExito = '';

  loginData: LoginRequestDTO = {
    username: '',
    password: ''
  };

  constructor(
    private LoginRequestservice: LoginRequestservice,
    private router: Router
  ) {}

  abrirModal(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  onLogin(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.loginData.username.trim() || !this.loginData.password.trim()) {
      this.mensajeError = 'Por favor completa tu usuario y contraseña.';
      return;
    }

    this.cargando = true;
    this.LoginRequestservice.login(this.loginData).subscribe({
      next: () => {
        this.cargando = false;
        this.mensajeExito = '¡Inicio de sesión exitoso!';
        setTimeout(() => {
          this.cerrarModal();
          this.router.navigate(['/pacientes']);
        }, 500);
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError =
          err?.error?.message ||
          err?.error?.mensaje ||
          'Credenciales inválidas o error de conexión con el servidor.';
      }
    });
  }
}