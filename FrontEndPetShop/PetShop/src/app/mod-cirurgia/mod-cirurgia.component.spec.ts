import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCirurgiaComponent } from './mod-cirurgia.component';

describe('ModCirurgiaComponent', () => {
  let component: ModCirurgiaComponent;
  let fixture: ComponentFixture<ModCirurgiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModCirurgiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCirurgiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
