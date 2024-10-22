import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEventPageRoutingModule } from './lista-event-routing.module';

import { ListaEventPage } from './lista-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEventPageRoutingModule
  ],
  declarations: [ListaEventPage]
})
export class ListaEventPageModule {}
