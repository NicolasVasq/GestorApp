import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAsistentePage } from './detalle-asistente.page';

describe('DetalleAsistentePage', () => {
  let component: DetalleAsistentePage;
  let fixture: ComponentFixture<DetalleAsistentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsistentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
