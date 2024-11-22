import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Administrador } from 'src/interfaces/administradores';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
})
export class LoginAdminPage implements OnInit {

  userdata: Administrador[] = [];
  admin: Administrador = {
    id: "",
    nombre: "",
    email: "",
    rut: "",
    password: "",
    isactive: false
  };

  loginForm: FormGroup; 
  loginError: string | null = null;

  constructor(private alertcontroller: AlertController,
              private router: Router,
              private toast: ToastController,
              private authservice: AuthService,
              private fbuilder: FormBuilder) {
              this.loginForm = fbuilder.group({ 
            'email': new FormControl("", [Validators.required, Validators.email]),
            'password': new FormControl("", [Validators.required, Validators.minLength(8)])
});
}

  ngOnInit() {
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginError = null;

    this.authservice.GetAdminByEmail(email).subscribe(
      resp => { 
        this.userdata = resp;

        if (this.userdata.length === 0) {
          this.loginForm.reset();
          this.UsuarioNoExiste();
          return;
        }
  
        const adminFromApi = this.userdata[0];

        if (adminFromApi) {
          this.admin = {
            id: adminFromApi.id,
            nombre: adminFromApi.nombre,
            password: adminFromApi.password,
            email: adminFromApi.email,
            rut: adminFromApi.rut,
            isactive: adminFromApi.isactive
          };
  
          if (this.admin.password !== password) {
            this.loginForm.reset();
            this.loginError = 'Credenciales incorrectas'; 
            return;
          }

          if (!this.admin.isactive) {
            this.loginForm.reset();
            this.UsuarioInactivo();
            return;
          }

          this.IniciarSesion(this.admin);
        }
      },
      error => {
        console.error('Error al obtener usuario:', error);
        this.loginError = 'Error en el servidor, por favor intente más tarde'; 
      }
    );
  }
  private IniciarSesion(admin: Administrador) {
    sessionStorage.setItem('id', admin.id.toString());
    sessionStorage.setItem('nombre', admin.nombre);
    sessionStorage.setItem('password', admin.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + this.admin.nombre);
    this.router.navigate(['/tabs/tab1']);
  }

  async showToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UsuarioInactivo() {
    const alerta = await this.alertcontroller.create({ 
      header: 'Usuario inactivo',
      message: 'Contactar a admin@admin.cl',
      buttons: ['OK']
    });
    alerta.present();
  }

  async UsuarioNoExiste() {
    const alerta = await this.alertcontroller.create({ 
      header: 'No existe...',
      message: 'Debe registrarse..',
      buttons: ['OK']
    });
    alerta.present();
  }

  navigateToRegister() {
    this.router.navigate(['/registrar-admin']); 
  }
}


