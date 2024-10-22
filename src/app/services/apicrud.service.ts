import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent, ICrearEvent } from 'src/interfaces/ItEvent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }

  getIEvent(): Observable<IEvent[]> {
    return this.httpclient.get<IEvent[]>(`${environment.apiUrl}/eventos`); 
  }

  postIEvent(newIEvent: ICrearEvent): Observable<IEvent> { 
    return this.httpclient.post<IEvent>(`${environment.apiUrl}/eventos`, newIEvent); 
  }

  getEventosId(id: number): Observable<ICrearEvent> {
    return this.httpclient.get<ICrearEvent>(`${environment.apiUrl}/eventos/?id=${id}`);
  }
  

  putEventos(evento:any): Observable<ICrearEvent> {
    return this.httpclient.put<ICrearEvent>(`${environment.apiUrl}/eventos/${evento.id}`,evento);
  }

  ActualizarEvento(evento:any): Observable<ICrearEvent>{
    return this.httpclient.put<ICrearEvent>(`${environment.apiUrl}/eventos/${evento.id}`,evento);
  }
  EliminarEvento(evento:any): Observable<ICrearEvent>{
    return this.httpclient.delete<ICrearEvent>(`${environment.apiUrl}/eventos/${evento.id}`);
  }


}
