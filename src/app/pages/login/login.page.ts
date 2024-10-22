import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: IUser[] = [];
  usuario: IUser = {
    id: 0,
    nombre: "",
    email: "",
    rut: "",
    password: "",
    isactive: false
  };

  loginForm: FormGroup; 

  constructor(private alertcontroller: AlertController,
              private router: Router,
              private toast: ToastController,
              private authservice: AuthService,
              private fbuilder: FormBuilder) {
                this.loginForm = fbuilder.group({ 
                  'email': new FormControl("", [Validators.required, Validators.email]), // Cambiado a 'email'
                  'password': new FormControl("", [Validators.required, Validators.minLength(8)])
                });
  }

  ngOnInit() {}

  login() {
    if (!this.loginForm.valid) {
      return;
    }
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    console.log('Intentando iniciar sesión con:', email, password); // Log para depuración
  
    this.authservice.GetUserByEmail(email).subscribe(
      resp => { 
        this.userdata = resp;
        console.log('Respuesta de API:', this.userdata);
  
        if (this.userdata.length === 0) {
          this.loginForm.reset();
          this.UsuarioNoExiste();
          return;
        }
  
        const userFromApi = this.userdata[0];
        console.log('Usuario desde la API:', userFromApi); // Verificar este log
  
        if (userFromApi) {
          this.usuario = {
            id: userFromApi.id,
            nombre: userFromApi.nombre,
            password: userFromApi.password,
            email: userFromApi.email,
            rut: userFromApi.rut,
            isactive: userFromApi.isactive
          };
  
          // Verificar contraseña y estado activo
          console.log('Contraseña del usuario:', this.usuario.password); // Log para verificar
          console.log('Estado activo:', this.usuario.isactive); // Log para verificar
  
          if (this.usuario.password !== password) {
            this.loginForm.reset();
            this.ErrorUsuario(); 
            return;
          }
          if (!this.usuario.isactive) {
            this.loginForm.reset();
            this.UsuarioInactivo();
            return;
          }
          this.IniciarSesion(this.usuario);
        }
      },
      error => {
        console.error('Error al obtener usuario:', error);
        this.ErrorUsuario();
      }
    );
  }
  

  private IniciarSesion(usuario: IUser) {
    sessionStorage.setItem('nombre', usuario.nombre);
    sessionStorage.setItem('password', usuario.password);
    sessionStorage.setItem('ingresado', 'true');
    this.showToast('Sesión Iniciada ' + this.usuario.nombre);
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

  async ErrorUsuario() {
    const alerta = await this.alertcontroller.create({ 
      header: 'Error..',
      message: 'Revise sus credenciales',
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
    this.router.navigate(['/register']); // 
  }
}
