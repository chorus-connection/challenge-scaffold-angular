import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValue, RawFormValue } from '@infinum/ngx-nuts-and-bolts/form-utils';
import { Chorus } from 'src/app/services/choruses.service';

function _createChorusForm() {
	return new FormGroup({
		name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		description: new FormControl('', {
			validators: [Validators.maxLength(500)],
			nonNullable: true,
		}),
		contactEmail: new FormControl('', {
			validators: [Validators.required, Validators.email],
			nonNullable: true,
		}),
		city: new FormControl('', { validators: [Validators.required], nonNullable: true }),
		state: new FormControl('', { validators: [Validators.required], nonNullable: true }),
	});
}

export function createChorusForm(initialValue: Partial<Chorus> = {}): ChorusForm {
	const form = _createChorusForm();
	form.reset(mapChorusDataToFormValue(initialValue));
	return form;
}

export type ChorusForm = ReturnType<typeof _createChorusForm>;
export type ChorusFormValue = FormValue<ChorusForm>;
export type ChorusFormRawValue = RawFormValue<ChorusForm>;

export function mapChorusDataToFormValue(chorus: Partial<Chorus>): ChorusFormRawValue {
	return {
		name: chorus.name ?? '',
		description: chorus.description ?? '',
		contactEmail: chorus.contactEmail ?? '',
		city: chorus.location?.city ?? '',
		state: chorus.location?.state ?? '',
	};
}

export function mapChorusFormValueToData(value: ChorusFormRawValue): Omit<Chorus, 'id'> {
	return {
		name: value.name,
		description: value.description,
		contactEmail: value.contactEmail,
		location: {
			city: value.city,
			state: value.state,
		},
	};
}
