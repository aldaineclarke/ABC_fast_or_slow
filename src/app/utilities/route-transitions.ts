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
   
])