import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

/**
 * Angular height transition.
 */
export const heightTransition = trigger('heightTransition', [
    state(
        'open',
        style({
            height: '*',
            overflow: 'hidden',
        })
    ),
    state(
        'closed',
        style({
            height: '0',
            overflow: 'hidden',
            visibility: 'hidden',
        })
    ),
    transition('open <=> closed', [animate('0.3s ease-in-out')]),
]);
