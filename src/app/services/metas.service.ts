import { Injectable, inject, signal } from '@angular/core';
import { Meta } from '../models/meta.model';
import { BackendApiService } from './backend-api.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class MetasService {
  private readonly api = inject(BackendApiService);
  private readonly notifications = inject(NotificationService);

  private readonly _metas = signal<Meta[]>([]);
  private readonly _loading = signal(true);

  readonly getMetas = this._metas.asReadonly();
  readonly loading = this._loading.asReadonly();

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
      this.notifications.show(created.message ?? `Meta "${created.name}" criada com sucesso.`);
      this.load();
    });
  }

  updateMeta(id: string, changes: Partial<Meta>): void {
    const current = this._metas().find((m) => m.id === id);
    if (!current) return;
    const payload = { ...current, ...changes };
    this.api.updateGoal(id, payload).subscribe((updated) => {
      this.notifications.show(updated.message ?? `Meta "${updated.name}" atualizada com sucesso.`);
      this.load();
    });
  }

  deleteMeta(id: string): void {
    this.api.deleteGoal(id).subscribe(() => {
      this._metas.update((list) => list.filter((m) => m.id !== id));
      this.notifications.show('Meta excluída.');
    });
  }
}
