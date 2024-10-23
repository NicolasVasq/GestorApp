import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';
import { IUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-Perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  // Objeto evento
  usuario: IUser = {
    id: "",
    nombre: "",
    email: "",
    rut: "",
    password: "",
    isactive: false
  };

  constructor(
    private activated: ActivatedRoute, 
    private apicrud: ApicrudService, 
    private router: Router
  ) {
    this.activated.queryParams.subscribe(param => {
      if (param['usuarios']) {
        this.usuario = JSON.parse(param['usuarios']);  // Asignar todos los valores del evento
      }
    });
  }
  ngOnInit() {}

  actualizar() {
    // Asegúrate de que todos los campos estén correctamente rellenados antes de enviar la actualización
    if (this.usuario.nombre && this.usuario.email && this.usuario.password) {
      this.apicrud.putUsuarios(this.usuario).subscribe(
        response => {
          console.log('Usuario actualizado con éxito', response);
          // Solo redirige si la actualización fue exitosa
          this.router.navigateByUrl('/tabs/tab2');
        },
        error => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    } else {
      console.log('Faltan campos por completar');
    }
  }
  
}
