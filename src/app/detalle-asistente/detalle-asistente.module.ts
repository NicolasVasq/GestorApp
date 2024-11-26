import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAsistentePageRoutingModule } from './detalle-asistente-routing.module';

import { DetalleAsistentePage } from './detalle-asistente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAsistentePageRoutingModule
  ],
  declarations: [DetalleAsistentePage]
})
export class DetalleAsistentePageModule {}
