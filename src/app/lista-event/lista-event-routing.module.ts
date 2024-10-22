import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEventPage } from './lista-event.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEventPageRoutingModule {}
