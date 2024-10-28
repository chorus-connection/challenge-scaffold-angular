import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = () => {
	const router = inject(Router);
	const auth = inject(AuthService);

	return auth.isLoggedIn() ? true : router.createUrlTree(['/', 'auth', 'login']);
};
