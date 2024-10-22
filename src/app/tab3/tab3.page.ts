import { Component, OnInit } from '@angular/core';

interface CodigoQR {
  titulo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // Definimos el array de actividades
  codigo: CodigoQR[] = [];

  constructor() {
    // Inicializamos el array de actividades dentro del constructor
    this.codigo = [
      {
        titulo: 'Conferencia Angular',
        descripcion: 'Seminario avanzado sobre Angular',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'Ionic Workshop',
        descripcion: 'Taller práctico de desarrollo móvil con Ionic',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'UX/UI Design',
        descripcion: 'Introducción al diseño UX/UI para aplicaciones',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'Taller de Machine Learning',
        descripcion: 'Un taller intensivo sobre técnicas y algoritmos de aprendizaje automático.',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'Ciberseguridad Avanzada',
        descripcion: 'Seminario sobre desarrollo web utilizando React.js, uno de los frameworks de JavaScript más populares.',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'Blockchain y Criptomonedas',
        descripcion: ' Introducción a la tecnología blockchain y su impacto en las criptomonedas.',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'DevOps y Automatización',
        descripcion: ' Curso sobre prácticas DevOps y automatización de procesos de desarrollo.',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'Realidad Aumentada y Virtual',
        descripcion: 'Taller práctico sobre el desarrollo de aplicaciones de realidad aumentada (AR) y realidad virtual (VR).',
        imagen: 'assets/img/qr.png'
      },
      {
        titulo: 'Programación en Rust',
        descripcion: 'Curso sobre Rust, un lenguaje de programación de sistemas que ofrece seguridad en la memoria y alta concurrencia.',
        imagen: 'assets/img/qr.png'
      }
    ];
  }

  // Método del ciclo de vida de Angular
  ngOnInit() {}

}
