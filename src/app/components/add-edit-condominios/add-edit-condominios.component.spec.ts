import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCondominiosComponent } from './add-edit-condominios.component';

describe('AddEditCondominiosComponent', () => {
  let component: AddEditCondominiosComponent;
  let fixture: ComponentFixture<AddEditCondominiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCondominiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCondominiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
