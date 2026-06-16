import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetasService } from '../../services/metas.service';
import { Meta } from '../../models/meta.model';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.html',
  styleUrls: ['./goals.scss'],
})
export class GoalsComponent {
  private readonly metasService = inject(MetasService);

  @Input() isDark = true;

  readonly metas = this.metasService.getMetas;
  readonly loading = this.metasService.loading;
  readonly feedback = this.metasService.feedback;

  clearFeedback(): void {
    this.metasService.clearFeedback();
  }

  showForm = signal(false);
  editingId = signal<string | null>(null);

  formName = signal('');
  formTargetValue = signal(0);
  formTargetValueDisplay = signal('R$ 0,00');

  getCurrentValue(meta: Meta): number {
    return meta.currentValue ?? 0;
  }

  getProgress(meta: Meta): number {
    return meta.progressPercent ?? 0;
  }

  progressClass(meta: Meta): string {
    const p = this.getProgress(meta);
    if (p >= 80) return 'high';
    if (p >= 50) return 'mid';
    return 'low';
  }

  onTargetValueInput(raw: string): void {
    const digits = raw.replace(/\D/g, '');
    const cents = parseInt(digits || '0', 10);
    const value = cents / 100;
    this.formTargetValue.set(value);
    this.formTargetValueDisplay.set(
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    );
  }

  openForm(meta?: Meta): void {
    if (meta) {
      this.editingId.set(meta.id);
      this.formName.set(meta.name);
      this.formTargetValue.set(meta.targetValue);
      this.formTargetValueDisplay.set(
        meta.targetValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      );
    } else {
      this.editingId.set(null);
      this.formName.set('');
      this.formTargetValue.set(0);
      this.formTargetValueDisplay.set('R$ 0,00');
    }
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  saveMeta(): void {
    const name = this.formName().trim();
    if (!name) return;

    const payload = {
      name,
      targetValue: Number(this.formTargetValue()) || 0,
    };

    const id = this.editingId();
    if (id) {
      this.metasService.updateMeta(id, payload);
    } else {
      this.metasService.addMeta(payload);
    }
    this.closeForm();
  }

  deleteMeta(id: string): void {
    if (confirm('Deseja realmente excluir esta meta?')) {
      this.metasService.deleteMeta(id);
    }
  }
}
