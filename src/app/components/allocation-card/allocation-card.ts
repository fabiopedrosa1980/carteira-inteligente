import { Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Stock } from '../../models/stock.model';
import { AllocationService } from '../../services/allocation.service';
import {
  AllocClasse,
  AllocationTargets,
  allocationByClass,
  concentrations,
  deviations,
} from '../../models/allocation.util';

@Component({
  selector: 'app-allocation-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-card.html',
  styleUrls: ['./allocation-card.scss'],
})
export class AllocationCardComponent {
  private readonly alloc = inject(AllocationService);

  // Posições da carteira (vindas do dashboard). Signal para reatividade.
  private readonly _stocks = signal<Stock[]>([]);
  @Input() set stocks(value: Stock[]) {
    this._stocks.set(value ?? []);
  }

  readonly classLabels: Record<AllocClasse, string> = {
    Acoes: 'Ações',
    FIIs: 'FIIs',
    ETFs: 'ETFs',
  };

  readonly targetsSum = this.alloc.targetsSum;
  readonly concentrationLimit = this.alloc.concentrationLimit;

  readonly result = computed(() => allocationByClass(this._stocks()));
  readonly hasData = computed(() => this.result().patrimonio > 0);

  readonly rows = computed(() =>
    deviations(
      this.result().byClass,
      this.alloc.targets(),
      this.result().patrimonio,
      this.alloc.tolerancia,
    ),
  );

  readonly concentrados = computed(() =>
    concentrations(this._stocks(), this.result().patrimonio, this.alloc.concentrationLimit()),
  );

  // Largura da barra (limita a 100% para não estourar visualmente).
  barWidth(pct: number): number {
    return Math.min(100, Math.max(0, pct));
  }

  // ---- Edição dos alvos + limite ----
  editing = signal(false);
  formAcoes = signal(0);
  formFIIs = signal(0);
  formETFs = signal(0);
  formLimit = signal(0);

  readonly formSum = computed(() => this.formAcoes() + this.formFIIs() + this.formETFs());

  openEdit(): void {
    const t = this.alloc.targets();
    this.formAcoes.set(t.Acoes);
    this.formFIIs.set(t.FIIs);
    this.formETFs.set(t.ETFs);
    this.formLimit.set(this.alloc.concentrationLimit());
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  saveEdit(): void {
    const targets: AllocationTargets = {
      Acoes: this.formAcoes(),
      FIIs: this.formFIIs(),
      ETFs: this.formETFs(),
    };
    this.alloc.save(targets, this.formLimit());
    this.editing.set(false);
  }
}
