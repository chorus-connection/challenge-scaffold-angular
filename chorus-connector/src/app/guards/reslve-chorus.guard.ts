import { ResolveFn } from '@angular/router';
import { Chorus, ChorusesService } from '../services/choruses.service';
import { inject } from '@angular/core';

export const resolveChorus: ResolveFn<Chorus | null> = (route) => {
	const id = route.paramMap.get('id');

	if (!id) {
		return null;
	}

	return inject(ChorusesService).get(id);
};
