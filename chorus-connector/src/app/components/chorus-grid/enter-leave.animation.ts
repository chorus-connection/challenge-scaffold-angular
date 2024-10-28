import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const ENTER_LEAVE_DEFAULT_DURATION = 250;
export const ENTER_LEAVE_DEFAULT_TRIGGER_NAME = 'enterLeave';

const hiddenStyle = style({
	scale: 0,
	opacity: 0,
});

const visibleStyle = style({
	opacity: 1,
	scale: 1,
});

interface IEnterLeaveAnimationOptions {
	duration: number;
	triggerName: string;
}

export function enterLeaveAnimation(
	options: IEnterLeaveAnimationOptions = {
		duration: ENTER_LEAVE_DEFAULT_DURATION,
		triggerName: ENTER_LEAVE_DEFAULT_TRIGGER_NAME,
	}
): AnimationTriggerMetadata {
	return trigger(options.triggerName, [
		transition(':enter', [hiddenStyle, animate(`${options.duration}ms ease-in-out`, visibleStyle)]),
		transition(':leave', [visibleStyle, animate(`${options.duration}ms ease-in-out`, hiddenStyle)]),
	]);
}

export const skipInitialRenderAnimation = trigger('skipInitialRender', [transition(':enter', [])]);
