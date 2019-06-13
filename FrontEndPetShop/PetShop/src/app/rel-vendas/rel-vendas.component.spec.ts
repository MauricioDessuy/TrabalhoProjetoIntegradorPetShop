import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelVendasComponent } from './rel-vendas.component';

describe('RelVendasComponent', () => {
  let component: RelVendasComponent;
  let fixture: ComponentFixture<RelVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
