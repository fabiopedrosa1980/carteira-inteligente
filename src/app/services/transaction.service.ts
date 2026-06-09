import { Injectable, signal } from '@angular/core';
import { Transaction, AssetType } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private _transactions = signal<Transaction[]>([]);
  readonly transactions = this._transactions.asReadonly();

  add(t: Omit<Transaction, 'id'>) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this._transactions.update(list => [...list, { ...t, id }]);
  }

  remove(id: string) {
    this._transactions.update(list => list.filter(t => t.id !== id));
  }

  byType(type: AssetType): Transaction[] {
    return this._transactions().filter(t => t.assetType === type);
  }
}
