import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModVendasComponent } from './mod-vendas.component';

describe('ModVendasComponent', () => {
  let component: ModVendasComponent;
  let fixture: ComponentFixture<ModVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
