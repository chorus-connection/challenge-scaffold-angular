import { Component, computed, inject, input, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
	createChorusForm,
	mapChorusFormValueToData,
} from 'src/app/components/chorus-form/chorus-form';
import { ChorusFormComponent } from 'src/app/components/chorus-form/chorus-form.component';
import { Chorus, ChorusesService } from 'src/app/services/choruses.service';

@Component({
	selector: 'app-edit',
	standalone: true,
	imports: [ReactiveFormsModule, ChorusFormComponent, MatButtonModule, RouterLink],
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.scss',
})
export default class EditComponent {
	private readonly router = inject(Router);
	private readonly chorusesService = inject(ChorusesService);
	protected readonly id = input.required<string>();
	protected readonly chorus = input.required<Chorus>();
	protected readonly form = computed(() => {
		const chorus = this.chorus();

		return untracked(() => {
			return createChorusForm(chorus);
		});
	});

	protected onSubmit() {
		if (this.form().invalid) {
			return;
		}

		const chorus = {
			id: this.id(),
			...mapChorusFormValueToData(this.form().getRawValue()),
		} satisfies Chorus;

		this.chorusesService.update(chorus);

		this.router.navigate(['/', 'home']);
	}
}
