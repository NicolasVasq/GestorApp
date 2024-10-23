import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/interfaces/usuarios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  usuario: IUser = {
    id: "",
    nombre: "",
    email: "",
    password: "",
    rut: "",
    isactive: false 
  };
  usuarioForm: FormGroup;

  constructor(
    private activated: ActivatedRoute, 
    private router: Router, 
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      id: [0],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      passwordActual: ['', Validators.required], // Campo para la contraseña actual
      nuevaPassword: ['', [Validators.required, Validators.minLength(8)]] // Campo para la nueva contraseña
    });

    this.activated.queryParams.subscribe(param => {
      if (param['usuarios']) {
        this.usuario = JSON.parse(param['usuarios']);
        this.usuarioForm.patchValue(this.usuario);
      }
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  actualizarUsuario() {
    const passwordActual = this.usuarioForm.value.passwordActual;
    const nuevaPassword = this.usuarioForm.value.nuevaPassword;

    // Verificar la contraseña actual
    if (this.usuario.password !== passwordActual) {
      console.error('La contraseña actual es incorrecta.');
      return;
    }

    // Actualizar la contraseña
    this.usuario.password = nuevaPassword;

    // Actualiza el usuario usando el servicio
    this.auth.putUsuarios(this.usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.regresar(); 
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }

  obtenerUsuario() {
    this.auth.obtenerUsuarioActual().subscribe(
      (data: IUser) => {
        this.usuarioForm.patchValue(data);
        this.usuario = data;
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  regresar() {
    this.router.navigate(['/tabs/tab1']);
  }
}
