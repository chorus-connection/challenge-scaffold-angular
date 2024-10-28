import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{
		path: 'home',
		canMatch: [authGuard],
		loadComponent: () => import('./layout/main-layout/main-layout.component'),
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/home/home.component'),
			},
		],
	},
	{
		path: 'auth',
		canMatch: [publicGuard],
		loadComponent: () => import('./layout/auth-layout/auth-layout.component'),
		children: [
			{
				path: 'login',
				loadComponent: () => import('./pages/login/login.component'),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
