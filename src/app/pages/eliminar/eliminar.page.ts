import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicrudService } from 'src/app/services/apicrud.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  //animalito
  evento = {
    id: 0,
    nombre: "",
    fecha: "",
    lugar: "",
    imagen: "",
    descripcion: ""
  };

  constructor(private router: Router, private apicrud: ApicrudService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getEventoById(this.getIdFromUrl());
  }

  getIdFromUrl() {
    let url = this.router.url;
    let arr = url.split("/", 3);
    let id = parseInt(arr[2]);
    return id;
  }

  getEventoById(eventoId: number) {
    this.apicrud.getEventosId(eventoId).subscribe(
      (resp: any) => {
        if (resp && resp.length > 0) {
          this.evento = {
            id: resp[0].id,
            nombre: resp[0].nombre,
            fecha: resp[0].fecha,
            lugar: resp[0].lugar,
            imagen: resp[0].imagen, // Asegúrate de incluir la imagen
            descripcion: resp[0].descripcion // Incluir la descripción
          };
        }
      },
      (error) => {
        console.error('Error al buscar el evento:', error);
      }
    );
  }

  eliminarEvento() {
    this.apicrud.EliminarEvento(this.evento).subscribe(() => {
      console.log('Evento eliminado');
      // Navegar a tab 2 y pasar un parámetro para indicar que se debe recargar
      this.router.navigate(['/tabs/tab2'], { queryParams: { reload: true } });
    });
  }
}
