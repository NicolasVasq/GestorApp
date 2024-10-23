import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../services/eventos.service'; 
import { IEvent } from 'src/interfaces/ItEvent';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss']
})
export class EventDetailPage implements OnInit {
  evento: IEvent | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService 
  ) {}

  ngOnInit() {
    const eventoId = this.route.snapshot.paramMap.get('id');

    if (eventoId) {
      this.eventosService.getEventos().subscribe(data => {
        this.evento = data.eventos.find(e => e.id === eventoId);
      });
    } else {
      console.error('No se encontró el ID del evento.');
    }
  }
}
