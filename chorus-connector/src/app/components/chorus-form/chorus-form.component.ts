import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChorusForm } from './chorus-form';

@Component({
	selector: 'app-chorus-form',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
	templateUrl: './chorus-form.component.html',
	styleUrl: './chorus-form.component.scss',
})
export class ChorusFormComponent {
	public readonly form = input.required<ChorusForm>();
}
