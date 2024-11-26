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
  selectedFile: File | null = null;  // Para almacenar el archivo seleccionado

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
    this.router.navigate(['/tabs/tab1']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement; // Accede al archivo seleccionado
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        // Convierte la imagen a Base64 y la almacena en el administrador
        if (this.administrador) {
          this.administrador.img = reader.result as string;
          this.selectedFile = file; // Almacena el archivo seleccionado (físico)
          console.log("Imagen convertida a Base64:", this.administrador.img); // Esto es para que puedas ver el base64 en consola
        }
      };
  
      reader.readAsDataURL(file); // Lee el archivo como Data URL (Base64)
    }
  }

  navigateToLogin() {
    this.router.navigate(['/contrasena']);
  }
}
