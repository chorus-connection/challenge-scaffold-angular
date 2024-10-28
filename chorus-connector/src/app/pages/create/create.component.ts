import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {
	createChorusForm,
	mapChorusFormValueToData,
} from 'src/app/components/chorus-form/chorus-form';
import { ChorusFormComponent } from 'src/app/components/chorus-form/chorus-form.component';
import { ChorusesService } from 'src/app/services/choruses.service';

@Component({
	selector: 'app-create',
	standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule, ChorusFormComponent],
	templateUrl: './create.component.html',
	styleUrl: './create.component.scss',
})
export default class CreateComponent {
	private readonly router = inject(Router);
	private readonly chorusesService = inject(ChorusesService);
	protected readonly form = createChorusForm();

	protected onSubmit() {
		if (this.form.invalid) {
			return;
		}

		this.chorusesService.add(mapChorusFormValueToData(this.form.getRawValue()));

		this.router.navigate(['/', 'home']);
	}
}
