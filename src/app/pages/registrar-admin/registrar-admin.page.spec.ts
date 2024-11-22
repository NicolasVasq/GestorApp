import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarAdminPage } from './registrar-admin.page';

describe('RegistrarAdminPage', () => {
  let component: RegistrarAdminPage;
  let fixture: ComponentFixture<RegistrarAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
