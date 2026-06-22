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

  // Segmentos da faixa de composição (alocacao ATUAL, colorida por classe).
  readonly segments = computed(() =>
    this.result().byClass.map((c) => ({
      classe: c.classe,
      label: this.classLabels[c.classe],
      pct: c.pct,
      color: this.classVar[c.classe],
    })),
  );

  // Marcadores de ALVO (display): posições acumuladas das fronteiras na faixa.
  readonly boundaries = computed(() => {
    const t = this.effectiveTargets();
    return [t.Acoes, t.Acoes + t.FIIs];
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

  // ---- Edição: um slider por classe (Ações, FIIs, ETFs) + limite ----
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

  // Alvo de uma classe (inteiro), para ARIA/exibição.
  targetOf(classe: AllocClasse): number {
    return Math.round(this.effectiveTargets()[classe]);
  }

  // Define o alvo de UMA classe (slider independente). A soma pode ficar ≠ 100;
  // o aviso de soma cobre isso (sem redistribuir entre classes).
  private setClassTarget(classe: AllocClasse, pct: number): void {
    this.editTargets.update((t) => ({ ...t, [classe]: this.clamp(Math.round(pct)) }));
  }

  // Arraste por ponteiro no slider da classe: clientX → % sobre a trilha.
  private dragClasse: AllocClasse | null = null;
  private dragTrack: HTMLElement | null = null;

  onHandleDown(classe: AllocClasse, ev: PointerEvent): void {
    ev.preventDefault();
    this.dragClasse = classe;
    this.dragTrack = (ev.target as HTMLElement).closest('.cls-track') as HTMLElement | null;
    (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
  }

  onHandleMove(ev: PointerEvent): void {
    if (!this.dragClasse || !this.dragTrack) return;
    const rect = this.dragTrack.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((ev.clientX - rect.left) / rect.width) * 100;
    this.setClassTarget(this.dragClasse, pct);
  }

  onHandleUp(ev: PointerEvent): void {
    if (!this.dragClasse) return;
    (ev.target as HTMLElement).releasePointerCapture?.(ev.pointerId);
    this.dragClasse = null;
    this.dragTrack = null;
  }

  // Teclado: setas ajustam ±1pp; Shift+seta ±5pp (por classe).
  onHandleKey(classe: AllocClasse, ev: KeyboardEvent): void {
    const step = ev.shiftKey ? 5 : 1;
    let delta = 0;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') delta = step;
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') delta = -step;
    else return;
    ev.preventDefault();
    this.setClassTarget(classe, this.editTargets()[classe] + delta);
  }
}
