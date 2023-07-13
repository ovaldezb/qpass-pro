import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCondominiosComponent } from './lista-condominios.component';

describe('ListaCondominiosComponent', () => {
  let component: ListaCondominiosComponent;
  let fixture: ComponentFixture<ListaCondominiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCondominiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCondominiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
