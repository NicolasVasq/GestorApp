import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-detalle-asistente',
  templateUrl: './detalle-asistente.page.html',
  styleUrls: ['./detalle-asistente.page.scss'],
})
export class DetalleAsistentePage implements OnInit {
  usuario: IUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      if (email) {
        this.cargarDatosUsuario(email);
      }
    });
  }

  cargarDatosUsuario(email: string) {
    this.authService.GetUserByEmail(email).subscribe(
      (usuarios) => {
        if (usuarios.length > 0) {
          this.usuario = usuarios[0];
        } else {
          console.error('No se encontraron usuarios con ese correo.');
        }
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    );
  }
}
