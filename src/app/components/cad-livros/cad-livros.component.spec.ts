import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadLivrosComponent } from './cad-livros.component';

describe('CadLivrosComponent', () => {
  let component: CadLivrosComponent;
  let fixture: ComponentFixture<CadLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadLivrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
