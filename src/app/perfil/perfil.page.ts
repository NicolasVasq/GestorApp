import { Component, OnInit } from '@angular/core';

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

  usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    nombreUsuario: 'juanperez',
    fotoPerfil: 'assets/images/default-profile.png'  // Puedes cambiar la ruta según tu imagen
  };

  eventosRegistrados: Evento[] = [
    { titulo: 'Conferencia de Desarrollo Web', fecha: '15 de Octubre, 2024' },
    { titulo: 'Seminario de Ciberseguridad', fecha: '22 de Octubre, 2024' },
    { titulo: 'Taller de Inteligencia Artificial', fecha: '5 de Noviembre, 2024' }
  ];

  constructor() { }

  ngOnInit() {}

}
