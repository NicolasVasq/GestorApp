import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ICrearAdmin } from 'src/interfaces/administradores';

@Component({
  selector: 'app-registrar-admin',
  templateUrl: './registrar-admin.page.html',
  styleUrls: ['./registrar-admin.page.scss'],
})
export class RegistrarAdminPage implements OnInit {

  registroForm: FormGroup;

  nuevoAdmin: ICrearAdmin = {
    nombre: "",
    email: "",
    rut: "",
    password: "",
    isactive: false
  };

  userdata: any;

  constructor(  private authservice: AuthService,
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

  ngOnInit() {
  }

  crearAdmin() {
    if (this.registroForm.valid) {
      this.authservice.getAdministrador(this.registroForm.value.nombre).subscribe(
        resp => {
          this.userdata = resp;
  
          if (Array.isArray(this.userdata) && this.userdata.length > 0) {
            this.registroForm.reset();
            this.errorDuplicidad();
          } else {
            this.nuevoAdmin.nombre = this.registroForm.value.nombre;
            this.nuevoAdmin.password = this.registroForm.value.password;
            this.nuevoAdmin.email = this.registroForm.value.email;
            this.nuevoAdmin.rut = this.registroForm.value.rut;
            this.nuevoAdmin.isactive = true;
  
            // Llamada al método PostAdmin para crear un administrador
            this.authservice.PostAdmin(this.nuevoAdmin).subscribe(() => {
              this.mostrarMensaje();
              this.router.navigateByUrl('/login');
            }, error => {
              console.error('Error al crear el administrador:', error);
              this.mostrarError('No se pudo crear el administrador. Intente de nuevo.');
            });
          }
        },
        error => {
          console.error('Error al verificar el nombre de administrador:', error);
          this.mostrarError('Ocurrió un error al verificar el nombre de administrador.');
        }
      );
    }
  }

  async mostrarMensaje() {
    const alerta = await this.alertcontroller.create({
      header: 'Usuario Creado',
      message: 'Bienvenid@ ' + this.nuevoAdmin.nombre,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad() {
    const alerta = await this.alertcontroller.create({
      header: 'Error',
      message: 'Usted ' + this.nuevoAdmin.nombre + ' ya está registrado',
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
    this.router.navigate(['/login-admin']);
  }

}
