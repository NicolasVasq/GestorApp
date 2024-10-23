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
        this.usuario = JSON.parse(param['usuarios']); 
      }
    });
  }
  ngOnInit() {}

  actualizar() {
    if (this.usuario.nombre && this.usuario.email && this.usuario.password) {
      this.apicrud.putUsuarios(this.usuario).subscribe(
        response => {
          console.log('Usuario actualizado con éxito', response);
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
