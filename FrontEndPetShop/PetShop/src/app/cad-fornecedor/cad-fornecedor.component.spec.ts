import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadFornecedorComponent } from './cad-fornecedor.component';

describe('CadFornecedorComponent', () => {
  let component: CadFornecedorComponent;
  let fixture: ComponentFixture<CadFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});