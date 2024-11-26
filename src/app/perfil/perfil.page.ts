import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Administrador } from 'src/interfaces/administradores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
 
  adminForm: FormGroup;
  administrador: Administrador | undefined;

  admin: Administrador = {
    id: "",
    nombre: "",
    email: "",
    rut: "",
    password: "",
    img: "",
    isactive: false
  };

  // No necesitamos un "selectedFile" si sólo vamos a manejar la imagen en base64
  selectedFile: File | null = null;  // Para almacenar el archivo seleccionado

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.adminForm = this.formBuilder.group({
      id: [0],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      isactive: [{ value: false, disabled: true }],
      img: [''] // Campo para almacenar la imagen en base64
    });
  }

  ngOnInit() {
    this.obtenerAdmin();
  }

  // Este método se ejecuta cuando el usuario selecciona una imagen
  
  

  obtenerAdmin() {
    this.authService.obtenerAdminActual().subscribe(
      (data: Administrador) => {
        this.adminForm.patchValue(data); // Esto actualizará los datos en el formulario
        this.administrador = data;
        // Si el administrador ya tiene una foto de perfil en base64, mostrarla
        if (this.administrador?.img) {
          this.admin.img = this.administrador.img; // Asigna la imagen Base64 al modelo
        }
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  // Método para redirigir a la página de modificación de perfil
  redirigirUpdate() {
    this.router.navigate(['/modificar-perfil']);
  }
}
