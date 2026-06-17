import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  /** Mensagem de resultado da última operação; null quando não há toast visível. */
  readonly message = signal<string | null>(null);

  private timer?: ReturnType<typeof setTimeout>;

  // Exibe a mensagem e agenda o fechamento automático.
  show(message: string, durationMs = 3500): void {
    this.message.set(message);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.message.set(null), durationMs);
  }

  dismiss(): void {
    clearTimeout(this.timer);
    this.message.set(null);
  }
}
