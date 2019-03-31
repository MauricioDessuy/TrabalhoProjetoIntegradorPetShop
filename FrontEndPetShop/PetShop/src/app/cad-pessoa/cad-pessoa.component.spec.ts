import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPessoaComponent } from './cad-pessoa.component';

describe('CadPessoaComponent', () => {
  let component: CadPessoaComponent;
  let fixture: ComponentFixture<CadPessoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadPessoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
