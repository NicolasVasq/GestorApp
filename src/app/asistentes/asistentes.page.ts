import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistentesService, Asistente } from '../services/asistentes.service';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage implements OnInit {
  asistentesPorEvento: { [evento: string]: Asistente[] } = {};

  constructor(
    private asistentesService: AsistentesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarAsistentes();
  }

  cargarAsistentes() {
    this.asistentesService.obtenerAsistentes().subscribe(
      (data) => {
        this.asistentesPorEvento = data.reduce((acc: { [evento: string]: Asistente[] }, asistente) => {
          if (!acc[asistente.evento]) {
            acc[asistente.evento] = [];
          }
          acc[asistente.evento].push(asistente);
          return acc;
        }, {});
      },
      (error) => {
        console.error('Error al cargar los asistentes:', error);
      }
    );
  }

  verDetalles(asistente: Asistente) {
    this.router.navigate(['/detalle-asistente'], {
      queryParams: { email: asistente.email },
    });
  }

  objectKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }
}
