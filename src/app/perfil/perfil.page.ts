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

  selectedFile: File | null = null;  

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
      img: [''] 
    });
  }

  ngOnInit() {
    this.obtenerAdmin();
  }
  

  obtenerAdmin() {
    this.authService.obtenerAdminActual().subscribe(
      (data: Administrador) => {
        this.adminForm.patchValue(data);
        this.administrador = data;
        this.administrador.img = this.administrador.img || 'assets/img/default-avatar.jpg';
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
  

  redirigirUpdate() {
    this.router.navigate(['/modificar-perfil']);
  }
}
