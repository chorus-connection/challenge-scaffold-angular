import { Component } from '@angular/core';
import { ChorusGridComponent } from '../../components/chorus-grid/chorus-grid.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [ChorusGridComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export default class HomeComponent {}
