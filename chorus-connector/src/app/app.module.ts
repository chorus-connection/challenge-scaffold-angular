import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LOCAL_STORAGE } from './helpers/tokens';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [
		provideAnimationsAsync(),
		{
			provide: LOCAL_STORAGE,
			useValue: localStorage,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
