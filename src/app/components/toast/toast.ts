import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
})
export class ToastComponent {
  private readonly notifications = inject(NotificationService);

  readonly message = this.notifications.message;

  dismiss(): void {
    this.notifications.dismiss();
  }
}
