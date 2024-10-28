import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export default class LoginComponent {
	protected readonly form = createLoginForm();
	protected readonly router = inject(Router);
	protected readonly hidePassword = signal(true);
	protected readonly auth = inject(AuthService);

	protected onSubmit() {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		const { email, password } = this.form.getRawValue();

		try {
			this.auth.login(email, password);
			this.router.navigate(['/']);
		} catch {
			this.form.setErrors({ invalidCredentials: true });
		}
	}
}

function createLoginForm() {
	return new FormGroup({
		email: new FormControl('', {
			validators: [Validators.required, Validators.email],
			nonNullable: true,
		}),
		password: new FormControl('', {
			validators: Validators.required,
			nonNullable: true,
		}),
	});
}
