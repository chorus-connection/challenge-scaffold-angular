import { Component, computed, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { WINDOW } from '@infinum/ngx-nuts-and-bolts';
import { map, startWith } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Chorus, ChorusesService } from 'src/app/services/choruses.service';
import { enterLeaveAnimation, skipInitialRenderAnimation } from './enter-leave.animation';

@Component({
	selector: 'app-chorus-grid',
	standalone: true,
	imports: [
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		RouterLink,
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
	],
	templateUrl: './chorus-grid.component.html',
	styleUrl: './chorus-grid.component.scss',
	animations: [enterLeaveAnimation(), skipInitialRenderAnimation],
})
export class ChorusGridComponent {
	private readonly chorusesService = inject(ChorusesService);
	protected readonly locationSearchControl = new FormControl('');
	protected readonly locationSearchControlValue = toSignal(
		this.locationSearchControl.valueChanges.pipe(
			startWith(''),
			map(() => this.locationSearchControl.getRawValue())
		)
	);
	protected readonly window = inject(WINDOW);
	protected readonly choruses = computed(() => {
		const choruses = this.chorusesService.choruses();
		const searchValue = this.locationSearchControlValue() ?? '';

		return untracked(() => {
			return choruses.filter((chorus) => {
				return (
					chorus.location.city.toLowerCase().includes(searchValue.toLowerCase()) ||
					chorus.location.state.toLowerCase().includes(searchValue.toLowerCase())
				);
			});
		});
	});
	protected readonly isLoggedIn = inject(AuthService).isLoggedIn;

	protected onDelete({ id, name }: Chorus) {
		const result = this.window.confirm(`Are you sure you want to delete "${name}" chorus?`);
		if (!result) {
			return;
		}

		this.chorusesService.delete(id);
	}
}
