import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEbooksComponent } from './list-ebooks.component';

describe('ListEbooksComponent', () => {
  let component: ListEbooksComponent;
  let fixture: ComponentFixture<ListEbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEbooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
