import { Injectable, signal } from '@angular/core';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmState extends Required<ConfirmOptions> {}

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  readonly state = signal<ConfirmState | null>(null);

  private resolver?: (ok: boolean) => void;

  // Abre o modal de confirmação e resolve com true (confirmar) ou false (cancelar).
  confirm(options: ConfirmOptions): Promise<boolean> {
    this.state.set({
      title: options.title ?? 'Confirmar',
      message: options.message,
      confirmLabel: options.confirmLabel ?? 'Excluir',
      cancelLabel: options.cancelLabel ?? 'Cancelar',
    });
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  accept(): void {
    this.close(true);
  }

  cancel(): void {
    this.close(false);
  }

  private close(result: boolean): void {
    this.state.set(null);
    this.resolver?.(result);
    this.resolver = undefined;
  }
}
