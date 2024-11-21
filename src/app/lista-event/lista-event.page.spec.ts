import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaEventPage } from './lista-event.page';

describe('ListaEventPage', () => {
  let component: ListaEventPage;
  let fixture: ComponentFixture<ListaEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
