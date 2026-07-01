import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Casca de rolagem horizontal reutilizável para barras de menu.
 *
 * Cuida apenas do COMPORTAMENTO (uma linha, rola sem quebrar, fade de borda,
 * scroll-snap, item ativo visível). O visual dos itens projetados é definido
 * pelo componente que o usa (abas, pills, chips continuam com seu próprio SCSS).
 */
@Component({
  selector: 'app-scroll-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-bar.html',
  styleUrls: ['./scroll-bar.scss'],
})
export class ScrollBarComponent implements AfterViewInit, OnChanges {
  /** Muda quando o item ativo muda; dispara o scroll para trazê-lo à vista. */
  @Input() activeKey: unknown = null;

  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    // Garante o item ativo visível no primeiro render.
    queueMicrotask(() => this.scrollActiveIntoView());
  }

  ngOnChanges(): void {
    // Em mudança de item ativo, traz a seleção para a área visível.
    queueMicrotask(() => this.scrollActiveIntoView());
  }

  private scrollActiveIntoView(): void {
    const el = this.track?.nativeElement;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('.active');
    active?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  }
}
