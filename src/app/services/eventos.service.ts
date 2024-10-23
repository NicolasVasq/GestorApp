import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IEvent } from 'src/interfaces/ItEvent';
import { AuthService } from './auth.service';

export interface InscripcionDatos {
  nombreEvento: string;
  fechaEvento: string;
  rutUsuario: string;
  emailUsuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private jsonURL = `${environment.apiUrl}/eventos`; // URL para obtener eventos
  private inscripcionURL = `${environment.apiUrl}/asistencias`; // URL para manejar inscripciones

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Inscribir a un usuario en un evento
  inscribirUsuario(datosInscripcion: InscripcionDatos): Observable<{ eventoId: string }> {
    return this.http.post<{ eventoId: string }>(this.inscripcionURL, datosInscripcion).pipe(
      map(response => {
        const usuarioId = this.authService.getUserId() || '';
        const eventoId = response.eventoId || '';
        console.log('Inscripción exitosa:', { usuarioId, eventoId });
        return response;
      }),
      catchError(error => {
        console.error('Error al inscribir usuario:', error);
        return throwError('Error al inscribir, por favor intenta más tarde');
      })
    );
  }

  // Obtener eventos
  getEventos(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.jsonURL).pipe(
      catchError(error => {
        console.error('Error al obtener eventos:', error);
        return throwError('Error al obtener eventos, por favor intenta nuevamente más tarde');
      })
    );
  }

  // Obtener asistencias
  obtenerAsistencias(): Observable<any[]> {
    return this.http.get<any[]>(this.inscripcionURL).pipe(
      catchError(error => {
        console.error('Error al obtener asistencias:', error);
        return throwError('Error al obtener asistencias, por favor intenta nuevamente más tarde');
      })
    );
  }

  // Verificar si un usuario está inscrito en un evento
  verificarInscripcion(usuarioId: string, eventoId: string): Observable<boolean> {
    const url = `${this.inscripcionURL}?usuarioId=${usuarioId}&eventoId=${eventoId}`;
    return this.http.get<any[]>(url).pipe(
      map(inscripciones => inscripciones.length > 0), // Devuelve true si hay inscripciones
      catchError(error => {
        console.error('Error al verificar inscripción:', error);
        return of(false); // Devuelve false si hay un error
      })
    );
  }
}
