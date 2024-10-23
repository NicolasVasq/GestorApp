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
  post: any = {};
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
    this.ruta.queryParams.subscribe(params => {
      if (params['post']) {
        this.post = JSON.parse(params['post']);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const nombre = this.ruta.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.auth.GetUserByUsername(nombre).subscribe((usuario: IUser) => {
        this.usuario = usuario;
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    }
  }

  actualizarUsuario() {
    this.auth.putUsuarios(this.usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.regresar(); 
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }

  regresar() {
    this.router.navigate(['/get-users']);
  }
}
