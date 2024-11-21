import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvent } from 'src/interfaces/ItEvent';

@Injectable({
  providedIn: 'root'
})
export class ApidatosService {

  // URL base del servidor JSON
  private apiPost = 'http://localhost:3000/eventos';

  constructor(private httpclient: HttpClient) { }

  // Método GET para obtener datos del servidor
  getPosts(): Observable<any> {
    return this.httpclient.get<any>(this.apiPost);
  }
}
