import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetaUsuariosPage } from './deta-usuarios.page';

describe('DetaUsuariosPage', () => {
  let component: DetaUsuariosPage;
  let fixture: ComponentFixture<DetaUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
