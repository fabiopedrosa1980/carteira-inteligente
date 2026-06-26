import { Injectable, signal } from '@angular/core';

const HIDE_VALUES_KEY = 'ci-hide-values';

// Estado global de privacidade dos valores em R$. Fonte única consumida pelo
// menu superior (toggle) e por todas as telas (mascaramento dos totais).
// Persistido em localStorage para sobreviver entre sessões.
@Injectable({ providedIn: 'root' })
export class ValueVisibilityService {
  /** True quando os valores em R$ devem aparecer ocultos (blur). */
  readonly hidden = signal<boolean>(localStorage.getItem(HIDE_VALUES_KEY) === '1');

  toggle(): void {
    this.hidden.update((v) => !v);
    localStorage.setItem(HIDE_VALUES_KEY, this.hidden() ? '1' : '0');
  }
}
