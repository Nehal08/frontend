import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEquationComponent } from './input-equation.component';

describe('InputEquationComponent', () => {
  let component: InputEquationComponent;
  let fixture: ComponentFixture<InputEquationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputEquationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEquationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
