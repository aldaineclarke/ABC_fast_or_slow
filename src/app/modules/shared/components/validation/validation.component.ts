import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {
  @Input('control') control: FormControl = new FormControl('');
  @Input('controlName') controlName: string = 'Field';
  @Input('customValidation') customValidationObject?:{[x:string]:string} = {};
  subscription!: Subscription;
  errors!:ValidationErrors | null;
  minLength = 0;
  validationDictionary = new Map([
    ['required',`{0} should not be empty`],
    ['minlength',`{0} should have more than {1} characters`],
    ['maxlength',`{0} should NOT have more than {1} characters`],
    ['email',`Please enter a valid email addresss`],
    ['pattern',`Please enter a valid {0}`],
    ['matching',`{0} is not matching`],
    ['cannotContainSpace',`{0} should not contain any spaces`],
  ]);


  remapValidationDictionary(){
    for(let key in this.customValidationObject){

      if(!(key.includes('{{') || this.customValidationObject[key].includes('}}'))){
      this.validationDictionary.set(key, this.customValidationObject[key]);
      }
    }
  }
  ngOnInit(){
    
    this.subscription = this.control.valueChanges.subscribe({
      next:(val:string)=>{
        if(val.trim().length == 0 && this.control.hasValidator(Validators.required)){
          this.control.setErrors({required:true})
          console.log("required");
        }
        else if(val.trim().length < this.minLength){
          this.control.setErrors({minlength: {requiredLength: this.minLength, actualLength: val.trim()}})
          console.log("hey");
        }
        else if(this.minLength == 0 && this.control.errors?.["minlength"]){
          this.control.setValue(val.trim(),{emitEvent:false});
          this.minLength = this.control.errors?.["minlength"]?.requiredLength;
          console.log(this.control.errors?.["minlength"]?.requiredLength)
        }
      }
    });
    this.remapValidationDictionary();
    

  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

}
