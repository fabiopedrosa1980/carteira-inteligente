import { Component, AfterViewInit, ViewChild, ElementRef, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtnContainer') googleBtnContainer!: ElementRef;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngAfterViewInit(): void {
    if (typeof google === 'undefined') {
      this.error.set('Google Sign-In não disponível. Verifique sua conexão.');
      return;
    }

    google.accounts.id.initialize({
      client_id: this.auth.clientId,
      callback: (response: any) => this.handleCredential(response),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(this.googleBtnContainer.nativeElement, {
      type: 'standard',
      theme: 'filled_black',
      size: 'large',
      text: 'signin_with',
      locale: 'pt-BR',
      width: 300,
      shape: 'rectangular',
    });
  }

  private handleCredential(response: any): void {
    try {
      this.loading.set(true);
      this.error.set(null);
      const payload = this.auth.parseJwt(response.credential);
      this.auth.setToken(response.credential);
      this.auth.setUser({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        sub: payload.sub,
      });
      this.router.navigate(['/']);
    } catch {
      this.loading.set(false);
      this.error.set('Falha na autenticação. Tente novamente.');
    }
  }
}
