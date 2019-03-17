import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoresListagemComponent } from './tutores-listagem.component';

describe('TutoresListagemComponent', () => {
  let component: TutoresListagemComponent;
  let fixture: ComponentFixture<TutoresListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoresListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoresListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
