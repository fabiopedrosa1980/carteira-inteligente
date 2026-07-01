import { Component, Input } from '@angular/core';

/**
 * Registro central de ícones SVG (24×24, traço, `currentColor`). Antes eram
 * duplicados inline em vários templates. Uso: `<app-icon name="close" />`.
 *
 * O host usa `display: contents`, então o `<svg>` se comporta como se fosse
 * filho direto do elemento pai — o dimensionamento via `.pai svg { … }` continua
 * funcionando sem alterações, igual ao SVG inline anterior.
 */
type IconDef = { d: string; sw?: number };

const ICONS: Record<string, IconDef> = {
  close: { d: 'M18 6 6 18M6 6l12 12' },
  plus: { d: 'M12 5v14M5 12h14' },
  check: { d: 'M20 6 9 17l-5-5' },
  trash: {
    d: 'M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6',
  },
  edit: { d: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' },
};

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      [attr.d]="d"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() strokeWidth = 2;

  get d(): string {
    return ICONS[this.name]?.d ?? '';
  }
}
