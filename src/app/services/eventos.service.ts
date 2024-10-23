import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from 'src/interfaces/ItEvent';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private jsonURL = 'assets/data/almacen.json'; private eventosRegistrados: IEvent[] = [];

  constructor(private http: HttpClient) {}

  getEventos(): Observable<{ eventos: IEvent[] }> {
    return this.http.get<{ eventos: IEvent[] }>(this.jsonURL);
  }

  getEventosRegistrados(): IEvent[] {
    return this.eventosRegistrados;
  }

  registrarEvento(evento: IEvent): void {
    this.eventosRegistrados.push(evento);
  }

  eliminarEvento(eventoId: number): void {
    this.eventosRegistrados = this.eventosRegistrados.filter(evento => +evento.id !== eventoId);

  }
}
