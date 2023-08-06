import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFieldsComponent } from './game-fields.component';

describe('GameFieldsComponent', () => {
  let component: GameFieldsComponent;
  let fixture: ComponentFixture<GameFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
