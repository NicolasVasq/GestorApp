import { Injectable } from '@angular/core';
import { Comentario } from 'src/interfaces/comentario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private comentariosUrl = 'http://localhost:3000/comentarios';
  

  constructor(private http: HttpClient) { } // Solo los parámetros del constructor

  obtenerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.comentariosUrl);
  }

  agregarComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.comentariosUrl, comentario);
  }
}
