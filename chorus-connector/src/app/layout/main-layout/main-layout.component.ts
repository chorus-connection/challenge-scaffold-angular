import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-main-layout',
	standalone: true,
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		RouterLink,
		RouterOutlet,
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.scss',
})
export default class MainLayoutComponent implements OnDestroy {
	private readonly auth = inject(AuthService);
	private readonly router = inject(Router);
	protected readonly mobileQuery: MediaQueryList;
	private readonly _mobileQueryListener: () => void;

	constructor() {
		const changeDetectorRef = inject(ChangeDetectorRef);
		const media = inject(MediaMatcher);

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	protected onLogOutClick() {
		this.auth.logout();
		this.router.navigate(['/', 'auth', 'login']);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
