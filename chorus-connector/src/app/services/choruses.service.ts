import { Injectable, signal } from '@angular/core';
import { choruses } from '../../../data.json';

export type Chorus = {
	id: string;
	name: string;
	description: string;
	contactEmail: string;
	location: ChorusLocation;
};

type ChorusLocation = {
	city: string;
	state: string;
};

@Injectable({ providedIn: 'root' })
export class ChorusesService {
	private readonly _choruses = signal<Array<Chorus>>(choruses);
	public readonly choruses = this._choruses.asReadonly();

	add(chorus: Omit<Chorus, 'id'>) {
		this._choruses.set([
			...this._choruses(),
			{
				id: randomId(),
				...chorus,
			},
		]);
	}

	get(id: string) {
		return this._choruses().find((chorus) => chorus.id === id) ?? null;
	}

	update(chorus: Chorus) {
		const choruses = this._choruses();
		const matchingChorusId = choruses.findIndex((c) => c.id === chorus.id);
		choruses[matchingChorusId] = chorus;
	}

	delete(id: string) {
		this._choruses.set(this._choruses().filter((chorus) => chorus.id !== id));
	}
}

function randomId() {
	return Math.random().toString(36).substring(7);
}
