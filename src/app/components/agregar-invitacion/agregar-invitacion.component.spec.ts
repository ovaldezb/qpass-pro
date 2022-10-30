import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInvitacionComponent } from './agregar-invitacion.component';

describe('AgregarInvitacionComponent', () => {
  let component: AgregarInvitacionComponent;
  let fixture: ComponentFixture<AgregarInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
