import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

// Breakpoints alinhados aos já usados no SCSS do app.
const MOBILE_QUERY = '(max-width: 600px)';
const TABLET_QUERY = '(min-width: 601px) and (max-width: 1024px)';

/**
 * Estado de viewport reativo via CDK BreakpointObserver.
 * Substitui media queries espalhadas por signals consumíveis em qualquer componente.
 */
@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  private readonly observer = inject(BreakpointObserver);

  readonly isMobile = toSignal(this.observer.observe(MOBILE_QUERY).pipe(map((r) => r.matches)), {
    initialValue: this.observer.isMatched(MOBILE_QUERY),
  });

  readonly isTablet = toSignal(this.observer.observe(TABLET_QUERY).pipe(map((r) => r.matches)), {
    initialValue: this.observer.isMatched(TABLET_QUERY),
  });
}
