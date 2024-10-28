import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';
import { resolveChorus } from './guards/reslve-chorus.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{
		path: 'home',
		loadComponent: () => import('./layout/main-layout/main-layout.component'),
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/home/home.component'),
			},
			{
				path: 'create',
				canMatch: [authGuard],
				loadComponent: () => import('./pages/create/create.component'),
			},
			{
				path: ':id',
				canMatch: [authGuard],
				resolve: {
					chorus: resolveChorus,
				},
				loadComponent: () => import('./pages/edit/edit.component'),
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
	imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
