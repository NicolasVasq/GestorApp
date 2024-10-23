import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent, ICrearEvent } from 'src/interfaces/ItEvent';
import { environment } from 'src/environments/environment';
import { ICrearUser,IUser } from 'src/interfaces/usuarios';

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

  getUsuarios(email: string): Observable<ICrearUser> {
    return this.httpclient.get<ICrearUser>(`${environment.apiUrl}/usuarios/?email=${email}`);
  }
  PostUsuario(newUsuario: ICrearUser): Observable<IUser> {
    return this.httpclient.post<IUser>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  

  putEventos(evento:any): Observable<ICrearEvent> {
    return this.httpclient.put<ICrearEvent>(`${environment.apiUrl}/eventos/${evento.id}`,evento);
  }

  putUsuarios(usuario:any): Observable<ICrearUser> {
    return this.httpclient.put<ICrearUser>(`${environment.apiUrl}/usuarios/${usuario.id}`,usuario);
  }

  ActualizarEvento(evento:any): Observable<ICrearEvent>{
    return this.httpclient.put<ICrearEvent>(`${environment.apiUrl}/eventos/${evento.id}`,evento);
  }
  EliminarEvento(evento:any): Observable<ICrearEvent>{
    return this.httpclient.delete<ICrearEvent>(`${environment.apiUrl}/eventos/${evento.id}`);
  }


}
