import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleVacinaComponent } from './controle-vacina.component';

describe('ControleVacinaComponent', () => {
  let component: ControleVacinaComponent;
  let fixture: ComponentFixture<ControleVacinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleVacinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
