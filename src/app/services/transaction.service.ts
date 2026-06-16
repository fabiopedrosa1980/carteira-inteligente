import { Injectable, signal, inject } from '@angular/core';
import { Transaction, AssetType } from '../models/transaction.model';
import { BackendApiService } from './backend-api.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly api = inject(BackendApiService);

  private _transactions = signal<Transaction[]>([]);
  readonly transactions = this._transactions.asReadonly();
  readonly loading = signal(false);

  /** Mensagem de resultado da última ação, para feedback na tela de Meus Ativos. */
  readonly feedback = signal<string | null>(null);
  private feedbackTimer?: ReturnType<typeof setTimeout>;

  private setFeedback(message: string): void {
    this.feedback.set(message);
    clearTimeout(this.feedbackTimer);
    this.feedbackTimer = setTimeout(() => this.feedback.set(null), 6000);
  }

  clearFeedback(): void {
    clearTimeout(this.feedbackTimer);
    this.feedback.set(null);
  }

  constructor() {
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

  add(t: Omit<Transaction, 'id'>, onDone?: () => void): void {
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
          this.setFeedback(created.message ?? `Lançamento de ${created.ticker} registrado.`);
          onDone?.();
        },
      });
  }

  update(id: number, t: Omit<Transaction, 'id'>, onDone?: () => void): void {
    this.api
      .updateTransaction(id, {
        asset_type: t.assetType,
        quantity: t.quantity,
        price: t.price,
        date: t.date,
      })
      .subscribe({
        next: (updated) => {
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
          this.setFeedback(updated.message ?? 'Lançamento atualizado com sucesso.');
          onDone?.();
        },
      });
  }

  remove(id: number): void {
    this.api.deleteTransaction(id).subscribe({
      next: () => {
        this._transactions.update((list) => list.filter((t) => t.id !== id));
        this.setFeedback('Lançamento excluído.');
      },
    });
  }

  byType(type: AssetType): Transaction[] {
    return this._transactions().filter((t) => t.assetType === type);
  }
}
