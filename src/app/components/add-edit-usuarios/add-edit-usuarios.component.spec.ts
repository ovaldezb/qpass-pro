import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUsuariosComponent } from './add-edit-usuarios.component';

describe('AddEditUsuariosComponent', () => {
  let component: AddEditUsuariosComponent;
  let fixture: ComponentFixture<AddEditUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
