import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAsistentePage } from './detalle-asistente.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAsistentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAsistentePageRoutingModule {}
