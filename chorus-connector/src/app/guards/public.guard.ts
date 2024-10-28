import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const publicGuard: CanMatchFn = () => {
	const router = inject(Router);
	const auth = inject(AuthService);

	console.log(auth.isLoggedIn());
	return auth.isLoggedIn() ? router.createUrlTree(['/']) : true;
};
