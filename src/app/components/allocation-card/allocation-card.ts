import { Component, ElementRef, Input, ViewChild, computed, inject, signal } from '@angular/core';
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

const CLASSES: AllocClasse[] = ['Acoes', 'FIIs', 'ETFs'];

@Component({
  selector: 'app-allocation-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-card.html',
  styleUrls: ['./allocation-card.scss'],
})
export class AllocationCardComponent {
  private readonly alloc = inject(AllocationService);

  @ViewChild('compBar') compBar?: ElementRef<HTMLElement>;

  // Posições da carteira (vindas do dashboard).
  private readonly _stocks = signal<Stock[]>([]);
  @Input() set stocks(value: Stock[]) {
    this._stocks.set(value ?? []);
  }

  readonly classLabels: Record<AllocClasse, string> = {
    Acoes: 'Ações',
    FIIs: 'FIIs',
    ETFs: 'ETFs',
  };
  private readonly classVar: Record<AllocClasse, string> = {
    Acoes: 'var(--class-acoes)',
    FIIs: 'var(--class-fii)',
    ETFs: 'var(--class-etf)',
  };
  classColorVar(classe: AllocClasse): string {
    return this.classVar[classe];
  }

  readonly concentrationLimit = this.alloc.concentrationLimit;

  readonly result = computed(() => allocationByClass(this._stocks()));
  readonly hasData = computed(() => this.result().patrimonio > 0);

  // Alvos em vigor: os de edição quando editando, senão os salvos.
  readonly editing = signal(false);
  private readonly editTargets = signal<AllocationTargets>({ Acoes: 0, FIIs: 0, ETFs: 0 });
  readonly effectiveTargets = computed<AllocationTargets>(() =>
    this.editing() ? this.editTargets() : this.alloc.targets(),
  );

  // Segmentos da faixa de composição (alocação ATUAL, colorida por classe).
  readonly segments = computed(() =>
    this.result().byClass.map((c) => ({
      classe: c.classe,
      label: this.classLabels[c.classe],
      pct: c.pct,
      color: this.classVar[c.classe],
    })),
  );

  // Marcadores/handles de ALVO: posições acumuladas das duas fronteiras.
  // b0 = alvo(Ações); b1 = alvo(Ações)+alvo(FIIs). ETF é o resto (100 − b1).
  readonly boundaries = computed(() => {
    const t = this.effectiveTargets();
    const b0 = t.Acoes;
    const b1 = t.Acoes + t.FIIs;
    return [
      { index: 0, pos: b0, between: ['Ações', 'FIIs'] as const },
      { index: 1, pos: b1, between: ['FIIs', 'ETFs'] as const },
    ];
  });

  // Ledger: desvio por classe a partir dos alvos em vigor.
  readonly rows = computed(() =>
    deviations(
      this.result().byClass,
      this.effectiveTargets(),
      this.result().patrimonio,
      this.alloc.tolerancia,
    ),
  );

  readonly concentrados = computed(() =>
    concentrations(this._stocks(), this.result().patrimonio, this.concentrationLimit()),
  );

  readonly targetsSum = computed(() => {
    const t = this.effectiveTargets();
    return Math.round(t.Acoes + t.FIIs + t.ETFs);
  });

  clamp(n: number): number {
    return Math.min(100, Math.max(0, n));
  }

  // ---- Edição: alvos na própria barra + limite de concentração ----
  formLimit = signal(0);

  openEdit(): void {
    this.editTargets.set({ ...this.alloc.targets() });
    this.formLimit.set(this.concentrationLimit());
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
  }

  saveEdit(): void {
    const t = this.editTargets();
    this.alloc.save(
      { Acoes: Math.round(t.Acoes), FIIs: Math.round(t.FIIs), ETFs: Math.round(t.ETFs) },
      this.formLimit(),
    );
    this.editing.set(false);
  }

  // Define a fronteira `index` para a posição `pos` (0–100), mantendo soma 100.
  private setBoundary(index: number, pos: number): void {
    const t = { ...this.editTargets() };
    const b0 = t.Acoes;
    const b1 = t.Acoes + t.FIIs;
    if (index === 0) {
      const nb0 = this.clamp(Math.min(pos, b1));
      t.Acoes = nb0;
      t.FIIs = b1 - nb0;
    } else {
      const nb1 = this.clamp(Math.max(pos, b0));
      t.FIIs = nb1 - b0;
      t.ETFs = 100 - nb1;
    }
    this.editTargets.set(t);
  }

  // Arraste por ponteiro: converte clientX → % sobre a largura da barra.
  private dragIndex: number | null = null;

  onHandleDown(index: number, ev: PointerEvent): void {
    ev.preventDefault();
    this.dragIndex = index;
    (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
  }

  onHandleMove(ev: PointerEvent): void {
    if (this.dragIndex === null || !this.compBar) return;
    const rect = this.compBar.nativeElement.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((ev.clientX - rect.left) / rect.width) * 100;
    this.setBoundary(this.dragIndex, pct);
  }

  onHandleUp(ev: PointerEvent): void {
    if (this.dragIndex === null) return;
    (ev.target as HTMLElement).releasePointerCapture?.(ev.pointerId);
    this.dragIndex = null;
  }

  // Teclado: setas ajustam ±1pp; Shift+seta ±5pp.
  onHandleKey(index: number, ev: KeyboardEvent): void {
    const step = ev.shiftKey ? 5 : 1;
    let delta = 0;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') delta = step;
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') delta = -step;
    else return;
    ev.preventDefault();
    const cur = this.boundaries()[index].pos;
    this.setBoundary(index, cur + delta);
  }

  // valor ARIA do handle = alvo da classe à esquerda da fronteira.
  ariaValue(index: number): number {
    const t = this.effectiveTargets();
    return Math.round(index === 0 ? t.Acoes : t.FIIs);
  }
}
