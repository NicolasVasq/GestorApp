import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../../interfaces/usuarios'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: IUser | undefined;
  qrData: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.obtenerUsuarioActual().subscribe(
      (user) => {
        this.usuario = user;
        this.qrData = JSON.stringify({
          nombre: this.usuario?.nombre,
          email: this.usuario?.email,
          rut: this.usuario?.rut,
          isactive: this.usuario?.isactive
        });
      },
      (error) => {
        console.error('Error al obtener el usuario logueado', error);
      }
    );
  }
}
