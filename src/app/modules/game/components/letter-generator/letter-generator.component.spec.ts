import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterGeneratorComponent } from './letter-generator.component';

describe('LetterGeneratorComponent', () => {
  let component: LetterGeneratorComponent;
  let fixture: ComponentFixture<LetterGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
