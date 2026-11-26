import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ContenidoGeminiDTO, MensajeChatDTO } from '../models/ChatDTO';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private modelo = 'gemini-2.5-flash';
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelo}:generateContent`;
  private apiKey = 'TU_API_KEY_DE_GEMINI';

  constructor(private http: HttpClient) {}

  enviarMensaje(historial: MensajeChatDTO[]): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-goog-api-key': this.apiKey,
    });

    // Filtramos mensajes vacíos y 'system'; Gemini espera que 'contents' inicie con 'user'
    let filtrados = historial.filter(
      (m) => m.role !== 'system' && m.content && m.content.trim() !== '',
    );

    const primerUserIdx = filtrados.findIndex((m) => m.role === 'user');
    if (primerUserIdx > 0) {
      filtrados = filtrados.slice(primerUserIdx);
    }

    const contents: ContenidoGeminiDTO[] = filtrados.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.trim() }],
    }));

    const body = {
      systemInstruction: {
        parts: [
          {
            text: 'Eres el asistente virtual de OpticVision, una clínica oftalmológica. Responde de forma amable, breve y clara en español sobre salud visual, cuidados oculares y orientación general de citas médicas. No des diagnósticos médicos definitivos.',
          },
        ],
      },
      contents,
    };

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(
        (res) =>
          res?.candidates?.[0]?.content?.parts?.[0]?.text ??
          'No se recibió respuesta del asistente.',
      ),
    );
  }
}