import { Component, OnInit } from '@angular/core';

interface Asistente {
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {

  asistentes: Asistente[] = [
    { nombre: 'Carlos Fernández', email: 'carlos.fernandez@email.com' },
    { nombre: 'Ana Torres', email: 'ana.torres@email.com' },
    { nombre: 'Pedro Martínez', email: 'pedro.martinez@email.com' },
    { nombre: 'Laura Méndez', email: 'laura.mendez@email.com' },
    { nombre: 'Ricardo García', email: 'ricardo.garcia@email.com' },
    { nombre: 'Elena Rojas', email: 'elena.rojas@email.com' },
    { nombre: 'Diego Morales', email: 'diego.morales@email.com' },
    { nombre: 'Sofía Castillo', email: 'sofia.castillo@email.com' },
    { nombre: 'Javier Ortiz', email: 'javier.ortiz@email.com' },
    { nombre: 'María Gómez', email: 'maria.gomez@email.com' },
    { nombre: 'Luis Rodríguez', email: 'luis.rodriguez@email.com'},
    { nombre: 'Juan Pérez', email: 'juan.perez@email.com'},
  ];

  constructor() { }

  ngOnInit() { }

  verDetalles(asistente: Asistente) {  
    console.log('Detalles del asistente', asistente);
  }

} 
