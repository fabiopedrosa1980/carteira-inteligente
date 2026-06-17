import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, ConfirmDialogComponent],
  template: `<router-outlet></router-outlet><app-toast></app-toast
    ><app-confirm-dialog></app-confirm-dialog>`,
})
export class App {}
