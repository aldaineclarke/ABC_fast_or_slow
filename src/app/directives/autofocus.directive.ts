import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective{
    constructor(private element: ElementRef<HTMLInputElement>){}
    @Input('appAutofocus') focused !: boolean;
    ngAfterViewInit():void{
        if(this.focused){
            console.log(this.element.nativeElement)
            this.element.nativeElement.focus();
        }
    }
}