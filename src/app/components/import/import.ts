import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendApiService, ImportResult } from '../../services/backend-api.service';
import { ConfirmService } from '../../services/confirm.service';
import { TransactionService } from '../../services/transaction.service';
import { NotificationService } from '../../services/notification.service';

type ImportState = 'idle' | 'loading' | 'success' | 'error';

// Extrai a mensagem de erro da API (corpo `{"error"|"message"}`), com fallback
// para falta de conexão e mensagem genérica.
function extractApiError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    const body = err.error;
    if (body && typeof body === 'object') {
      if (typeof body.error === 'string' && body.error.trim()) return body.error;
      if (typeof body.message === 'string' && body.message.trim()) return body.message;
    }
    if (err.status === 0) return 'Sem conexão com o servidor. Tente novamente.';
  }
  return 'Não foi possível importar a planilha. Verifique o arquivo e tente novamente.';
}

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import.html',
  styleUrls: ['./import.scss'],
})
export class ImportComponent {
  private readonly api = inject(BackendApiService);
  private readonly confirm = inject(ConfirmService);
  private readonly transactions = inject(TransactionService);
  private readonly notifications = inject(NotificationService);

  readonly state = signal<ImportState>('idle');
  readonly fileName = signal<string | null>(null);
  readonly result = signal<ImportResult | null>(null);
  readonly errorMsg = signal<string | null>(null);

  private selectedFile: File | null = null;

  readonly canImport = computed(() => !!this.fileName() && this.state() !== 'loading');

  // Total de lançamentos criados somando as três classes.
  readonly totalCreated = computed(() => {
    const c = this.result()?.created;
    if (!c) return 0;
    return (c.Acoes ?? 0) + (c.FIIs ?? 0) + (c.ETFs ?? 0);
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      this.selectedFile = null;
      this.fileName.set(null);
      this.state.set('error');
      this.errorMsg.set('Selecione um arquivo .xlsx exportado da B3 (relatório de Posição).');
      input.value = '';
      return;
    }
    this.selectedFile = file;
    this.fileName.set(file.name);
    this.state.set('idle');
    this.errorMsg.set(null);
    this.result.set(null);
  }

  async onImport(): Promise<void> {
    if (!this.selectedFile) return;

    const ok = await this.confirm.confirm({
      title: 'Importar planilha da B3',
      message:
        'A importação vai SOBREPOR todos os seus lançamentos atuais pelas posições da planilha. ' +
        'Os lançamentos manuais existentes serão perdidos. Deseja continuar?',
      confirmLabel: 'Importar e sobrepor',
      cancelLabel: 'Cancelar',
    });
    if (!ok) return;

    this.state.set('loading');
    this.errorMsg.set(null);
    this.result.set(null);

    this.api.importTransactions(this.selectedFile).subscribe({
      next: (res) => {
        this.result.set(res);
        this.state.set('success');
        // Reflete o resultado no app (Lançamentos / Meus Ativos).
        this.transactions.reload();
        this.notifications.show('Planilha importada com sucesso');
      },
      error: (err) => {
        this.errorMsg.set(extractApiError(err));
        this.state.set('error');
      },
    });
  }
}
