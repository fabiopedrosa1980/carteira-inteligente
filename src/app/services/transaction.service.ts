import { Injectable, signal, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Transaction, AssetType } from '../models/transaction.model';
import { BackendApiService } from './backend-api.service';
import { NotificationService } from './notification.service';

// Extrai a mensagem de erro da API, tentando o corpo `{"error": "..."}` do
// backend, depois `message`, e por fim um texto genérico de falha.
function extractApiError(err: unknown): string {
  const fallback = 'Não foi possível salvar o lançamento.';
  if (err instanceof HttpErrorResponse) {
    const body = err.error;
    if (body && typeof body === 'object') {
      if (typeof body.error === 'string' && body.error.trim()) return body.error;
      if (typeof body.message === 'string' && body.message.trim()) return body.message;
    }
    if (typeof err.message === 'string' && err.message.trim() && err.status === 0) {
      return 'Sem conexão com o servidor. Tente novamente.';
    }
  }
  return fallback;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly api = inject(BackendApiService);
  private readonly notifications = inject(NotificationService);

  private _transactions = signal<Transaction[]>([]);
  readonly transactions = this._transactions.asReadonly();
  readonly loading = signal(false);

  constructor() {
    this.loadAll();
  }

  /** Recarrega os lançamentos a partir da API. Chamado ao entrar na tela. */
  reload(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.loading.set(true);
    this.api.getTransactions().subscribe({
      next: (list) => {
        this._transactions.set(
          list.map((t) => ({
            id: t.id,
            assetType: t.asset_type as AssetType,
            ticker: t.ticker,
            date: t.date.split('T')[0],
            quantity: t.quantity,
            price: t.price,
          })),
        );
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  add(t: Omit<Transaction, 'id'>, onDone?: () => void, onError?: (msg: string) => void): void {
    this.api
      .createTransaction({
        ticker: t.ticker,
        asset_type: t.assetType,
        quantity: t.quantity,
        price: t.price,
        date: t.date,
      })
      .subscribe({
        next: (created) => {
          this._transactions.update((list) => [
            ...list,
            {
              id: created.id,
              assetType: created.asset_type as AssetType,
              ticker: created.ticker,
              date: created.date.split('T')[0],
              quantity: created.quantity,
              price: created.price,
            },
          ]);
          this.notifications.show(`${created.ticker} adicionado com sucesso`);
          onDone?.();
        },
        error: (err) => onError?.(extractApiError(err)),
      });
  }

  update(
    id: number,
    t: Omit<Transaction, 'id'>,
    onDone?: () => void,
    onError?: (msg: string) => void,
  ): void {
    this.api
      .updateTransaction(id, {
        asset_type: t.assetType,
        quantity: t.quantity,
        price: t.price,
        date: t.date,
      })
      .subscribe({
        next: () => {
          this._transactions.update((list) =>
            list.map((item) =>
              item.id === id
                ? {
                    ...item,
                    assetType: t.assetType,
                    quantity: t.quantity,
                    price: t.price,
                    date: t.date,
                  }
                : item,
            ),
          );
          this.notifications.show(`${t.ticker} atualizado com sucesso`);
          onDone?.();
        },
        error: (err) => onError?.(extractApiError(err)),
      });
  }

  remove(id: number): void {
    const ticker = this._transactions().find((t) => t.id === id)?.ticker ?? 'Lançamento';
    this.api.deleteTransaction(id).subscribe({
      next: () => {
        this._transactions.update((list) => list.filter((t) => t.id !== id));
        this.notifications.show(`${ticker} removido com sucesso`);
      },
    });
  }

  // Remove todos os lançamentos de uma vez via API e esvazia o estado local.
  clearAll(onDone?: () => void): void {
    this.api.deleteAllTransactions().subscribe({
      next: () => {
        this._transactions.set([]);
        this.notifications.show('Lançamentos removidos com sucesso');
        onDone?.();
      },
    });
  }

  byType(type: AssetType): Transaction[] {
    return this._transactions().filter((t) => t.assetType === type);
  }
}
