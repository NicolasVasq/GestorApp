import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicrudService } from 'src/app/services/apicrud.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  // Objeto evento con los tres campos relevantes
  evento = {
    id: 0,
    descripcion: "",
    imagen: ""
  };

  constructor(
    private activated: ActivatedRoute, 
    private apicrud: ApicrudService, 
    private router: Router
  ) {
    // Si el evento fue pasado como parámetro en la URL
    this.activated.queryParams.subscribe(param => {
      if (param['eventos']) {
        this.evento = JSON.parse(param['eventos']);  // Asignar todos los valores del evento
      }
    });
  }

  ngOnInit() {}

  // Método para actualizar el evento
  actualizar() {
    // Verificar que todos los campos necesarios estén completos
    if (this.evento.id && this.evento.descripcion && this.evento.imagen) {
      this.apicrud.putEventos(this.evento).subscribe(
        response => {
          console.log('Evento actualizado con éxito', response);
          // Redirigir al listado de eventos tras la actualización
          this.router.navigateByUrl('/tabs/tab2');
        },
        error => {
          console.error('Error al actualizar el evento', error);
        }
      );
    } else {
      // Si falta algún campo necesario
      console.log('Faltan campos por completar');
      alert('Por favor complete todos los campos');
    }
  }
}
