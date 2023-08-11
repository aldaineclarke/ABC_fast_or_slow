import { animate, animateChild, group, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";

export const slideLeftAnimation = trigger('routeAnimations', [
    transition('* => *',[
        style({position: 'relative'}),

        query(':enter', [
            query('h1', [style({opacity: 0})]),
            query('li.nav_item', [
                style({left: '100%', opacity: 0})
            ],{ optional: true }),
            query('h1', [
                animate('1000ms',
                    style({opacity: 1})
                )
                
            ],{ optional: true }),
            query('li.nav_item', [

                stagger(200, [
                    animate('700ms ease',style({left: '0', opacity: 1}))
                ]), 
               
            ],{ optional: true }),

        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
    ]),
    // transition('* => create, create => home',[
    //     style({position: 'relative'}),
    //     query(':enter, :leave', [
    //         style({position:'absolute', top: 0, left: '-100%', width: '100%'})
    //     ], { optional: true }),
    //     query(':enter', [
    //         animate('400ms ease', style({left: '0%'}))
    //     ], { optional: true }),
    //     query(':leave', animateChild(), { optional: true }),

    // ]),

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