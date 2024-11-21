import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-deta-usuarios',
  templateUrl: './deta-usuarios.page.html',
  styleUrls: ['./deta-usuarios.page.scss'],
})
export class DetaUsuariosPage implements OnInit {
  post: any = {};  // Inicializar como objeto vacío
  usuario: IUser = {
    id: "",  
    nombre: "",
    email: "",
    password: "",
    rut: "",
    isactive: false 
  };

  constructor(
    private router: Router, 
    private ruta: ActivatedRoute,
    private auth: AuthService
  ) {
    // Leer parámetros al iniciar la página
    this.ruta.queryParams.subscribe(params => {
      if (params['post']) {
        this.post = JSON.parse(params['post']);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const nombre = this.ruta.snapshot.paramMap.get('nombre'); // Asegúrate de que 'nombre' sea el parámetro correcto
    if (nombre) {
      this.auth.GetUserByUsername(nombre).subscribe((usuario: IUser) => {
        this.usuario = usuario; // Ahora esto debe funcionar
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    }
  }

  actualizarUsuario() {
    // Actualiza el usuario usando el servicio
    this.auth.putUsuarios(this.usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.regresar(); // Opcionalmente regresa a la lista
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }

  regresar() {
    // Redirige a la página de listado
    this.router.navigate(['/get-users']);
  }
}
