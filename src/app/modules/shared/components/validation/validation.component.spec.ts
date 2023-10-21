import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ValidationComponent } from './validation.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

describe('ValidationComponent', () => {
  let component: ValidationComponent;
  let fixture: ComponentFixture<ValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationComponent]
    });
    fixture = TestBed.createComponent(ValidationComponent);
    component = fixture.componentInstance;
    

    let form = new FormGroup({
      name: new FormControl('')
    });
    component.control = form.controls.name;
    component.controlName = "Name";    // fixture.detectChanges();
    component.subscription = of('val').subscribe();    
    component.control.markAllAsTouched();

  });

//   it('should show no error messages when fields are not touched', ()=>{
//     const errMsgEl = fixture.debugElement.query(By.css('p.form-error'))
//     expect(errMsgEl).toBeNull();
//   });

//   it('should show the required error message when no value is entered and the field is touched', ()=>{
//     component.control.setValidators(Validators.required);
//     component.control.markAllAsTouched();
//     component.control.updateValueAndValidity();

//     fixture.detectChanges();

//     const p = fixture.debugElement.query(By.css('p.form-error')).nativeElement as HTMLElement;
//     expect(p.innerHTML).toBe(`${component.controlName} should not be empty`);



//   });
//   it('Should show the pattern error message when the input entered breaks the pattern and the field is touched', ()=>{
//     component.control.setValidators(Validators.pattern(/a-zA-Z/));
//     component.control.setValue('648');
//     component.control.markAllAsTouched();
//     component.control.updateValueAndValidity();
//     fixture.detectChanges();
//     const p = fixture.debugElement.query(By.css('p.form-error')).nativeElement as HTMLElement;
//     expect(p.innerHTML).toBe(`Please enter a valid ${component.controlName}`);
//     component.control.removeValidators(Validators.pattern(/a-zA-Z/));


//   });

//   it('should show minLength error message when the length of the characters fall below the minLength', ()=>{
//     component.control.setValidators(Validators.minLength(3));
//     component.ngOnInit();
//     component.control.setValue(' t');
//     component.control.markAllAsTouched();
//     component.control.updateValueAndValidity();

//     fixture.detectChanges();
//     const p = fixture.debugElement.query(By.css('p.form-error')).nativeElement as HTMLElement;
//     expect(p.innerHTML).toBe(`Name should have more than 3 characters`);
//   });
  
//   it('should show the required error message and make the form invalid when only space is entered', ()=>{
//     component.ngOnInit();

//     component.control.setValue('    ');
//     component.control.setValidators(Validators.required);
//     component.control.markAllAsTouched();
//     component.control.updateValueAndValidity();

//     fixture.detectChanges();
//     const p = fixture.debugElement.query(By.css('p.form-error')).nativeElement as HTMLElement;
//     expect(p.innerHTML).toBe(`${component.controlName} should not be empty`);

//     component.control.removeValidators(Validators.required);

// });
  it('should show the error for min length if the value trimmed is less than the minlength set',()=>{
    component.ngOnInit();
    component.control.setValidators([Validators.minLength(3)]);
    component.control.updateValueAndValidity();

    component.control.setValue('');
    component.control.markAllAsTouched();
    fixture.detectChanges();

    console.log(fixture.debugElement.childNodes[0].nativeNode);
    console.log(component.control);
    const p = fixture.debugElement.query(By.css('p.form-error')).nativeElement as HTMLElement;
    
    expect(p.innerHTML).toBe(`Name should have more than ${component.control.errors?.['minlength'].requiredLength} characters`);

});
  
});
