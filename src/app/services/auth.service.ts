import { Injectable, signal, computed } from '@angular/core';

declare const google: any;

export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<GoogleUser | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  // Substitua pelo Client ID do Google Cloud Console
  readonly clientId = '217072116416-ippggfugojfj5fiqk6oe0oiujjueak3m.apps.googleusercontent.com';

  setUser(user: GoogleUser): void {
    this._user.set(user);
  }

  signOut(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }
    this._user.set(null);
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
