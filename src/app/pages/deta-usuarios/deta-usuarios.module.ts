import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaUsuariosPageRoutingModule } from './deta-usuarios-routing.module';

import { DetaUsuariosPage } from './deta-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaUsuariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetaUsuariosPage]
})
export class DetaUsuariosPageModule {}
