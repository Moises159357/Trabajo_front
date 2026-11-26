export class ParteGeminiDTO {
  text: string = '';
}

export class ContenidoGeminiDTO {
  role: 'user' | 'model' = 'user';
  parts: ParteGeminiDTO[] = [];
}

export class MensajeChatDTO {
  role: 'system' | 'user' | 'assistant' = 'user';
  content: string = '';
}