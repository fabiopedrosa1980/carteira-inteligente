import { Injectable, computed, inject, signal } from '@angular/core';
import { BackendApiService } from './backend-api.service';
import { AllocationTargets } from '../models/allocation.util';

// Estado dos alvos de alocação por classe + limite de concentração. Persistido
// no backend (/allocation). Enquanto o endpoint não existir, opera com defaults
// (load/save degradam silenciosamente). Tolerância "no alvo" é fixa em 2pp.

const DEFAULT_TARGETS: AllocationTargets = { Acoes: 50, FIIs: 40, ETFs: 10 };
const DEFAULT_LIMIT = 20;

@Injectable({ providedIn: 'root' })
export class AllocationService {
  private readonly api = inject(BackendApiService);

  private readonly _targets = signal<AllocationTargets>({ ...DEFAULT_TARGETS });
  private readonly _limit = signal<number>(DEFAULT_LIMIT);

  readonly targets = this._targets.asReadonly();
  readonly concentrationLimit = this._limit.asReadonly();
  readonly tolerancia = 2;

  // Soma dos alvos (para aviso leve quando ≠ 100).
  readonly targetsSum = computed(() => {
    const t = this._targets();
    return t.Acoes + t.FIIs + t.ETFs;
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.api.getAllocation().subscribe((cfg) => {
      if (!cfg) return; // backend indisponível/sem config → mantém defaults
      if (cfg.targets) this._targets.set({ ...DEFAULT_TARGETS, ...cfg.targets });
      if (typeof cfg.concentrationLimit === 'number') this._limit.set(cfg.concentrationLimit);
    });
  }

  save(targets: AllocationTargets, limit: number): void {
    this._targets.set({ ...targets });
    this._limit.set(limit);
    this.api.updateAllocation({ targets, concentrationLimit: limit }).subscribe();
  }
}
