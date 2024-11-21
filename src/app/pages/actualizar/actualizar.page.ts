import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  // Objeto evento
  evento = {
    id: 0,
    nombre: "",
    fecha: "",
    lugar: "",
    imagen: "",
    descripcion: ""
  };

  constructor(
    private activated: ActivatedRoute, 
    private apicrud: ApicrudService, 
    private router: Router
  ) {
    this.activated.queryParams.subscribe(param => {
      if (param['eventos']) {
        this.evento = JSON.parse(param['eventos']);  // Asignar todos los valores del evento
      }
    });
  }

  ngOnInit() {}

  actualizar() {
    // Asegúrate de que todos los campos estén correctamente rellenados antes de enviar la actualización
    if (this.evento.id && this.evento.nombre && this.evento.descripcion) {
      this.apicrud.putEventos(this.evento).subscribe(
        response => {
          console.log('Evento actualizado con éxito', response);
          // Solo redirige si la actualización fue exitosa
          this.router.navigateByUrl('/tabs/tab2');
        },
        error => {
          console.error('Error al actualizar el evento', error);
        }
      );
    } else {
      console.log('Faltan campos por completar');
    }
  }
}
