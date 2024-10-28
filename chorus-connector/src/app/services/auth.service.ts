import { computed, inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE } from '../helpers/tokens';

type User = {
	email: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly storage = inject(LOCAL_STORAGE);
	private readonly _user = signal<User | null>(null);
	public readonly user = this._user.asReadonly();
	public readonly isLoggedIn = computed(() => this._user() !== null);

	constructor() {
		try {
			// In reality, we would use APP_INITIALIZER to fetch user data from the server
			// and set initial state
			this._user.set(JSON.parse(this.storage.getItem('user') ?? 'null'));
		} catch {
			// noop
		}
	}

	public login(email: string, password: string): void {
		// In reality, this would be an API call and we would handle errors using catchError

		if (email !== 'a@a' || password !== 'a') {
			throw new Error('Invalid email or password');
		}

		this.storage.setItem('user', JSON.stringify({ email }));
		this._user.set({ email });
	}

	public logout(): void {
		this.storage.removeItem('user');
		this._user.set(null);
	}
}
