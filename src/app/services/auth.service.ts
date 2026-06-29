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
  private readonly _token = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  readonly clientId =  import.meta.env.NG_APP_OAUTH_KEY;

  setUser(user: GoogleUser): void {
    this._user.set(user);
  }

  setToken(credential: string): void {
    this._token.set(credential);
    localStorage.setItem('google_token', credential);
  }

  signOut(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('google_token');
  }

  loadStoredToken(): void {
    const stored = localStorage.getItem('google_token');
    if (!stored) return;
    try {
      const payload = this.parseJwt(stored);
      if (payload.exp && payload.exp * 1000 > Date.now()) {
        this._token.set(stored);
        this._user.set({
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          sub: payload.sub,
        });
      } else {
        localStorage.removeItem('google_token');
      }
    } catch {
      localStorage.removeItem('google_token');
    }
  }

  parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }
}
