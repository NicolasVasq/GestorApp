// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICrearUser, IUser } from 'src/interfaces/usuarios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private httpclient: HttpClient) { }

  // Obtener todos los usuarios
  getAllUsers(): Observable<IUser[]> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios`);
  }

  // Obtener un usuario por nombre
  GetUserByUsername(nombre: string): Observable<IUser[]> { // Cambié a IUser[]
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios?nombre=${nombre}`);
  }
  GetUserByEmail(email: string): Observable<IUser[]> {
    return this.httpclient.get<IUser[]>(`${environment.apiUrl}/usuarios?email=${email}`);
  }

  PostUsuario(newUsuario: ICrearUser): Observable<IUser> {
    return this.httpclient.post<IUser>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  // Verificar si el usuario está logueado
  LoggedIn(): boolean {
    return sessionStorage.getItem('nombre') != null;
  }

  // Método para registrar un nuevo usuario
  Registrar(usuario: any): Observable<IUser> { // Asegúrate de que retorne el tipo correcto
    return this.httpclient.post<IUser>('http://localhost:3000/usuarios', usuario);
  }
}
