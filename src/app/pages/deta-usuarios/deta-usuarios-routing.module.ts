import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetaUsuariosPage } from './deta-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: DetaUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetaUsuariosPageRoutingModule {}
