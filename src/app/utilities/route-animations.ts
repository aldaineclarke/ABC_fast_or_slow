import { animate, query, style, transition, trigger } from "@angular/animations";

export const SlideFromLeft = 
    trigger('routeAnimations', [
        transition('* => create', [
            style({position: 'relative'}),

            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    transform: 'translateX(-100%)',
                    opacity: 0

                })
            ],{ optional: true }),
            query(':enter', [
                animate('8000ms ease'),
                style({
                    opacity: 1, transform: 'translateX(0)'
                })
            ], { optional: true })
        ])
    ])