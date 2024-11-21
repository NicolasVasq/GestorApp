import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/interfaces/usuarios';

interface Evento {
  titulo: string;
  fecha: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioForm: FormGroup;
  eventosRegistrados: Evento[] = [];
  usuario: IUser | undefined; // Se declara como undefined

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.usuarioForm = this.formBuilder.group({
      id: [0],
      nombre: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      rut: [{ value: '', disabled: true }, Validators.required],
      isactive: [{ value: false, disabled: true }]
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.cargarEventos();
  }

  obtenerUsuario() {
    this.authService.obtenerUsuarioActual().subscribe(
      (data: IUser) => {
        this.usuarioForm.patchValue(data); // Cargar datos en el formulario
        this.usuario = data; // Asigna los datos del usuario
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  cargarEventos() {
    this.eventosRegistrados = [
      { titulo: 'Conferencia de Desarrollo Web', fecha: '15 de Octubre, 2024' },
      { titulo: 'Seminario de Ciberseguridad', fecha: '22 de Octubre, 2024' },
      { titulo: 'Taller de Inteligencia Artificial', fecha: '5 de Noviembre, 2024' }
    ];
  }
}
