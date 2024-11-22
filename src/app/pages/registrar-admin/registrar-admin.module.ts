import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAdminPageRoutingModule } from './registrar-admin-routing.module';

import { RegistrarAdminPage } from './registrar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAdminPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarAdminPage]
})
export class RegistrarAdminPageModule {}
