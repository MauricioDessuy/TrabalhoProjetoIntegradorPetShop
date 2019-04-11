import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadAnimalComponent } from './cad-animal.component';

describe('CadAnimalComponent', () => {
  let component: CadAnimalComponent;
  let fixture: ComponentFixture<CadAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
