import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective{
    constructor(private element: ElementRef<HTMLInputElement>){}
    @Input('appAutofocus') focused !: boolean;
    ngAfterViewInit():void{
        if(this.focused){
            this.element.nativeElement.focus();
        }
    }
}