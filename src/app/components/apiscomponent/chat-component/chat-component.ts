import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MensajeChatDTO } from '../../../models/ChatDTO';
import { ChatService } from '../../../services/chatservice';

@Component({
  imports: [FormsModule, MatInputModule, MatButtonModule, MatIconModule],
  selector: 'app-chat-component',
  styleUrl: './chat-component.css',
  templateUrl: './chat-component.html',
})
export class ChatComponent {
  mensajes: MensajeChatDTO[] = [
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente virtual de OpticVision. ¿En qué puedo ayudarte hoy?',
    },
  ];
  textoUsuario: string = '';
  cargando: boolean = false;

  constructor(
    private iaService: ChatService,
    private cdr: ChangeDetectorRef,
  ) {}

  enviar(): void {
    const texto = this.textoUsuario.trim();
    if (!texto || this.cargando) return;

    this.mensajes.push({ role: 'user', content: texto });
    this.textoUsuario = '';
    this.cargando = true;

    this.iaService.enviarMensaje(this.mensajes).subscribe({
      next: (respuesta: string) => {
        this.mensajes.push({ role: 'assistant', content: respuesta });
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en Gemini API:', err.error ?? err);
        this.mensajes.push({
          role: 'assistant',
          content: 'Hubo un problema al conectar con Gemini. Revisa tu API Key o intenta de nuevo.',
        });
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
