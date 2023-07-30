import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideLeftAnimation = trigger('routeAnimations', [
    transition('* => create',[
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({position:'absolute', top: 0, left: '100%', width: '100%'})
        ], { optional: true }),
        query(':enter', [
            animate('400ms ease', style({left: '0%'}))
        ], { optional: true }),
        query('h1', [
            style({
                color:'red'
            })
        ]),
        query(':leave', animateChild(), { optional: true }),
    ]),
    transition('* => create, create => home',[
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({position:'absolute', top: 0, left: '-100%', width: '100%'})
        ], { optional: true }),
        query(':enter', [
            animate('400ms ease', style({left: '0%'}))
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),

    ]),

    // transition('* <=> *', [
    //     style({ position: 'relative' }),
    //     query(':enter, :leave', [
    //       style({
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         width: '100%'
    //       })
    //     ]),
    //     query(':enter', [
    //       style({ left: '-100%' })
    //     ]),
    //     query(':leave', animateChild()),
    //     group([
    //       query(':leave', [
    //         animate('200ms ease-out', style({ left: '100%', opacity: 0 }))
    //       ]),
    //       query(':enter', [
    //         animate('300ms ease-out', style({ left: '0%' }))
    //       ]),
    //       query('@*', animateChild())
    //     ]),
    //   ])
])