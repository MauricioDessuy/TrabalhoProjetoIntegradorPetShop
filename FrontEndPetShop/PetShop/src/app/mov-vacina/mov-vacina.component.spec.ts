import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovVacinaComponent } from './mov-vacina.component';

describe('MovVacinaComponent', () => {
  let component: MovVacinaComponent;
  let fixture: ComponentFixture<MovVacinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovVacinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
