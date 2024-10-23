import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICrearUser, IUser } from 'src/interfaces/usuarios';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private httpclient: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios`);
  }

  
  GetUserByUsername(nombre: string): Observable<IUser> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios?nombre=${nombre}`).pipe(
      map(users => users[0])
    );
  }

  GetUserByEmail(email: string): Observable<IUser[]> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios?email=${email}`);
  }

  obtenerUsuarioActual(): Observable<IUser> {
    const usuarioId = sessionStorage.getItem('id');
    
    if (!usuarioId) {
        console.error('ID del usuario no encontrado en sessionStorage');
        throw new Error('ID del usuario no encontrado');
    }
    
    return this.httpclient.get<IUser>(`${environment.apiUrl}/usuarios/${usuarioId}`);
}


  PostUsuario(newUsuario: ICrearUser): Observable<IUser> {
    return this.httpclient.post<IUser>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  putUsuarios(usuario:any): Observable<ICrearUser> {
    return this.httpclient.put<ICrearUser>(`${environment.apiUrl}/usuarios/${usuario.id}`,usuario);
  }
  
  LoggedIn(): boolean {
    return sessionStorage.getItem('nombre') != null;
  }

  Registrar(usuario: any): Observable<IUser> {
    return this.httpclient.post<IUser>('http://localhost:3000/usuarios', usuario);
  }
}
