import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrador } from 'src/interfaces/administradores';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  administrador: Administrador = {
    id: "",
    nombre: "",
    email: "",
    password: "",
    rut: "",
    img: "",
    isactive: false 
  };
  adminForm: FormGroup;

  constructor(
    private activated: ActivatedRoute, 
    private router: Router, 
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.adminForm = this.formBuilder.group({
      id: [0],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      passwordActual: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.activated.queryParams.subscribe(param => {
      if (param['usuarios']) {
        this.administrador = JSON.parse(param['usuarios']);
        this.adminForm.patchValue(this.administrador);
      }
    });
  }

  ngOnInit() {
    this.obtenerAdmin();
  }

  actualizarUsuario() {
    const passwordActual = this.adminForm.value.passwordActual;
    const nuevaPassword = this.adminForm.value.nuevaPassword;

    if (this.administrador.password !== passwordActual) {
      console.error('La contraseña actual es incorrecta.');
      return;
    }

    this.administrador.password = nuevaPassword;

    this.auth.putAdmins(this.administrador).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.regresar(); 
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }

  obtenerAdmin() {
    this.auth.obtenerAdminActual().subscribe(
      (data: Administrador) => {
        this.adminForm.patchValue(data);
        this.administrador = data;
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  regresar() {
    this.router.navigate(['/perfil']);
  }
}
