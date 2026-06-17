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

  // O script do Google Sign-In é carregado de forma assíncrona (index.html),
  // então `google` pode ainda não existir quando este hook roda. Em vez de errar
  // de imediato, tentamos novamente por um período limitado antes de desistir.
  private static readonly MAX_INIT_ATTEMPTS = 25;
  private static readonly INIT_RETRY_MS = 200;

  ngAfterViewInit(): void {
    this.initGoogleSignIn(0);
  }

  private initGoogleSignIn(attempt: number): void {
    if (typeof google === 'undefined') {
      if (attempt >= LoginComponent.MAX_INIT_ATTEMPTS) {
        this.error.set('Google Sign-In não disponível. Verifique sua conexão.');
        return;
      }
      setTimeout(() => this.initGoogleSignIn(attempt + 1), LoginComponent.INIT_RETRY_MS);
      return;
    }

    this.error.set(null);

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
