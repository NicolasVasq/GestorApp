// src/app/services/administrador.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICrearAdmin } from 'src/interfaces/administradores'; // La interfaz que definimos
import { Administrador } from 'src/interfaces/administradores'; // La interfaz de Administrador completa
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {

  constructor(private httpclient: HttpClient) {}

  // Obtener administradores (ejemplo)
  PostAdmin(newAdmin: ICrearAdmin): Observable<Administrador> {
    return this.httpclient.post<Administrador>(`${environment.apiUrl}/administradores`, newAdmin);
  }
  
  getAdministrador(Administrador:any): Observable<Administrador> {
    return this.httpclient.get<Administrador>(`${environment.apiUrl}/administradores/?nombre=${Administrador}`);
  }


  // Eliminar administrador (si es necesario)
  eliminarAdministrador(id: string): Observable<void> {
    return this.httpclient.delete<void>(`${environment.apiUrl}/${id}`);
  }
}
