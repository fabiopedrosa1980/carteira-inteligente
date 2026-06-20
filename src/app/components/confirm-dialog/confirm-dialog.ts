import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
})
export class ConfirmDialogComponent {
  private readonly confirmService = inject(ConfirmService);

  readonly state = this.confirmService.state;

  // Esc cancela o diálogo, apenas quando há um aberto.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.state()) this.cancel();
  }

  accept(): void {
    this.confirmService.accept();
  }

  cancel(): void {
    this.confirmService.cancel();
  }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.cancel();
  }
}
