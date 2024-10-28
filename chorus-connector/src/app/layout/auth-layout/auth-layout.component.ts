import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-auth-layout',
	standalone: true,
	imports: [MatCardModule, RouterOutlet],
	templateUrl: './auth-layout.component.html',
	styleUrl: './auth-layout.component.scss',
})
export default class AuthLayoutComponent {}
