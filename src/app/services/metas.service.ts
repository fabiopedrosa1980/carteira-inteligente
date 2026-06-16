import { Injectable, inject, signal } from '@angular/core';
import { Meta } from '../models/meta.model';
import { BackendApiService } from './backend-api.service';

@Injectable({ providedIn: 'root' })
export class MetasService {
  private readonly api = inject(BackendApiService);

  private readonly _metas = signal<Meta[]>([]);
  private readonly _loading = signal(true);

  readonly getMetas = this._metas.asReadonly();
  readonly loading = this._loading.asReadonly();

  /** Mensagem de resultado da última ação, para feedback na tela de Metas. */
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
    this.load();
  }

  load(): void {
    this._loading.set(true);
    this.api.getGoals().subscribe({
      next: (goals) => {
        this._metas.set(
          goals.map((g) => ({
            id: g.id,
            name: g.name,
            targetValue: g.targetValue,
            createdAt: g.createdAt,
            currentValue: g.currentValue,
            progressPercent: g.progressPercent,
          })),
        );
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  addMeta(meta: Omit<Meta, 'id' | 'createdAt'>): void {
    this.api.createGoal(meta).subscribe((created) => {
      this.setFeedback(created.message ?? `Meta "${created.name}" criada com sucesso.`);
      this.load();
    });
  }

  updateMeta(id: string, changes: Partial<Meta>): void {
    const current = this._metas().find((m) => m.id === id);
    if (!current) return;
    const payload = { ...current, ...changes };
    this.api.updateGoal(id, payload).subscribe((updated) => {
      this.setFeedback(updated.message ?? `Meta "${updated.name}" atualizada com sucesso.`);
      this.load();
    });
  }

  deleteMeta(id: string): void {
    this.api.deleteGoal(id).subscribe(() => {
      this._metas.update((list) => list.filter((m) => m.id !== id));
      this.setFeedback('Meta excluída.');
    });
  }
}
