import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadAutoresComponent } from './cad-autores.component';

describe('CadAutoresComponent', () => {
  let component: CadAutoresComponent;
  let fixture: ComponentFixture<CadAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadAutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
