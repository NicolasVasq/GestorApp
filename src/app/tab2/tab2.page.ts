import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { IEvent } from 'src/interfaces/ItEvent';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  eventos: IEvent[] = [];

  constructor(
    private eventosService: EventosService,
    private menucontroller: MenuController,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventosService.getEventos().subscribe((data) => {
      this.eventos = data.eventos;
    });
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  verDetalle(evento: IEvent) {
    this.router.navigate(['/event-detail', { id: evento.id }]);
  }
}
