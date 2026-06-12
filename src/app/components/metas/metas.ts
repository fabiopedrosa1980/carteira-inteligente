import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetasService } from '../../services/metas.service';
import { BackendApiService, ApiAcaoItem } from '../../services/backend-api.service';
import { Meta, MetaType } from '../../models/meta.model';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './metas.html',
  styleUrls: ['./metas.scss'],
})
export class MetasComponent implements OnInit {
  private readonly metasService = inject(MetasService);
  private readonly api = inject(BackendApiService);

  @Input() isDark = true;

  readonly metas = this.metasService.getMetas;
  readonly acoes = signal<ApiAcaoItem[]>([]);
  readonly loading = this.metasService.loading;

  showForm = signal(false);
  editingId = signal<string | null>(null);

  formName = signal('');
  formDescription = signal('');
  formType = signal<MetaType>('patrimonio');
  formTargetValue = signal(0);
  formTargetValueDisplay = signal('R$ 0,00');
  formTicker = signal('');

  readonly typeOptions: { value: MetaType; label: string; icon: string }[] = [
    { value: 'patrimonio', label: 'Patrimônio', icon: '🏦' },
    { value: 'renda_mensal', label: 'Renda Mensal', icon: '💰' },
    { value: 'preco_medio', label: 'Preço Médio', icon: '📊' },
  ];

  ngOnInit(): void {
    this.api.getAcoes().subscribe({
      next: items => this.acoes.set(items),
      error: () => {},
    });
  }

  iconFor(type: MetaType): string {
    return this.typeOptions.find(o => o.value === type)?.icon ?? '🎯';
  }

  labelFor(type: MetaType): string {
    return this.typeOptions.find(o => o.value === type)?.label ?? '';
  }

  getCurrentValue(meta: Meta): number {
    return this.metasService.getCurrentValue(meta, this.acoes());
  }

  getProgress(meta: Meta): number {
    if (meta.targetValue <= 0) return 0;
    const pct = (this.getCurrentValue(meta) / meta.targetValue) * 100;
    return Math.min(100, Math.max(0, pct));
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
      value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    );
  }

  openForm(meta?: Meta): void {
    if (meta) {
      this.editingId.set(meta.id);
      this.formName.set(meta.name);
      this.formDescription.set(meta.description);
      this.formType.set(meta.type);
      this.formTargetValue.set(meta.targetValue);
      this.formTargetValueDisplay.set(
        meta.targetValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      );
      this.formTicker.set(meta.ticker ?? '');
    } else {
      this.editingId.set(null);
      this.formName.set('');
      this.formDescription.set('');
      this.formType.set('patrimonio');
      this.formTargetValue.set(0);
      this.formTargetValueDisplay.set('R$ 0,00');
      this.formTicker.set('');
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

    const type = this.formType();
    const payload = {
      name,
      description: this.formDescription().trim(),
      targetValue: Number(this.formTargetValue()) || 0,
      type,
      ticker: type === 'preco_medio' ? this.formTicker().trim().toUpperCase() : undefined,
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
