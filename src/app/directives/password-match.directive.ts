import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch')
  matchControl!: string; // Input property to receive the control name to compare.

  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.root.get(this.matchControl);

    if (controlToCompare && controlToCompare.value !== control.value) {
      return { matching: true };
    }

    return null; // Passwords match
  }
}
