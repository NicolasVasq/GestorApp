import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAdminPage } from './registrar-admin.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarAdminPageRoutingModule {}
