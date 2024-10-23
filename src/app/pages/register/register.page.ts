import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ICrearUser } from 'src/interfaces/usuarios';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registroForm: FormGroup;

  nuevoUsuario: ICrearUser = {
    nombre: "",
    email: "",
    rut: "",
    password: "",
    isactive: false
  };

  userdata: any;

  constructor(private authservice: AuthService,
              private alertcontroller: AlertController,
              private router: Router,
              private fBuilder: FormBuilder) {
    this.registroForm = this.fBuilder.group({
      'nombre': new FormControl("", [Validators.required, Validators.minLength(6)]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'rut': new FormControl("", [Validators.required]),
      'password': new FormControl("", [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/) 
      ])
    });
  }

  ngOnInit() {}

  crearUsuario() {
    if (this.registroForm.valid) {
      this.authservice.GetUserByUsername(this.registroForm.value.nombre).subscribe(
        resp => {
          this.userdata = resp;

          if (Array.isArray(this.userdata) && this.userdata.length > 0) {
            this.registroForm.reset();
            this.errorDuplicidad();
          } else {
            this.nuevoUsuario.nombre = this.registroForm.value.nombre;
            this.nuevoUsuario.password = this.registroForm.value.password;
            this.nuevoUsuario.email = this.registroForm.value.email;
            this.nuevoUsuario.rut = this.registroForm.value.rut; 
            this.nuevoUsuario.isactive = true;

            this.authservice.PostUsuario(this.nuevoUsuario).subscribe(() => {
              this.mostrarMensaje();
              this.router.navigateByUrl('/login'); 
            }, error => {
              console.error('Error al crear el usuario:', error);
              this.mostrarError('No se pudo crear el usuario. Intente de nuevo.');
            });
          }
        },
        error => {
          console.error('Error al verificar el usuario:', error);
          this.mostrarError('Ocurrió un error al verificar el nombre de usuario.');
        }
      );
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario Creado',
      message: 'Bienvenid@ ' + this.nuevoUsuario.nombre,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: 'Usted ' + this.nuevoUsuario.nombre + ' ya está registrado',
      buttons: ['OK']
    });
    alerta.present();
  }

  async mostrarError(mensaje: string) {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    alerta.present();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
