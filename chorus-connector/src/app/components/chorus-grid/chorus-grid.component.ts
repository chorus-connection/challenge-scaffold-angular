import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { WINDOW } from '@infinum/ngx-nuts-and-bolts';
import { AuthService } from 'src/app/services/auth.service';
import { ChorusesService } from 'src/app/services/choruses.service';
import { enterLeaveAnimation, skipInitialRenderAnimation } from './enter-leave.animation';

@Component({
	selector: 'app-chorus-grid',
	standalone: true,
	imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './chorus-grid.component.html',
	styleUrl: './chorus-grid.component.scss',
	animations: [enterLeaveAnimation(), skipInitialRenderAnimation],
})
export class ChorusGridComponent {
	private readonly chorusesService = inject(ChorusesService);
	protected readonly window = inject(WINDOW);
	protected readonly choruses = this.chorusesService.choruses;
	protected readonly isLoggedIn = inject(AuthService).isLoggedIn;

	protected onDelete(id: string) {
		const result = this.window.confirm('Are you sure you want to delete this chorus?');
		if (!result) {
			return;
		}

		this.chorusesService.delete(id);
	}
}
