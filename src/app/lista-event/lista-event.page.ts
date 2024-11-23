import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Evento } from './evento.model';
import { IEvent } from 'src/interfaces/ItEvent';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lista-event',
  templateUrl: './lista-event.page.html',
  styleUrls: ['./lista-event.page.scss'],
})
export class ListaEventPage implements OnInit {

  eventos: IEvent[] = [];
  

  constructor(private alertController: AlertController,
    private router: Router,
    private eventosService: EventosService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.obtenerEventos();
  }


  async editarEvento(evento: Evento) {
    const alert = await this.alertController.create({
      header: 'Editar evento',
      inputs: [
        { name: 'nombre', type: 'text', value: evento.nombre, placeholder: 'Nombre del evento' },
        { name: 'descripcion', type: 'textarea', value: evento.descripcion, placeholder: 'Descripción del evento' },
        { name: 'fecha', type: 'date', value: evento.fecha, placeholder: 'Fecha del evento' },
        { name: 'hora', type: 'time', value: evento.hora, placeholder: 'Hora del evento' },
        { name: 'ubicacion', type: 'text', value: evento.ubicacion, placeholder: 'Ubicación del evento' },
        { name: 'cupos', type: 'number', value: evento.cupos, min: 1, placeholder: 'Cupos disponibles' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre && data.descripcion && data.fecha && data.hora && data.ubicacion && data.cupos) {
              evento.nombre = data.nombre;
              evento.descripcion = data.descripcion;
              evento.fecha = data.fecha;
              evento.hora = data.hora;
              evento.ubicacion = data.ubicacion;
              evento.cupos = data.cupos;
              return true;
            } else {
              return false;
            }
          },
        },
      ],
    });

    await alert.present();
  }


  goToAgregar(){
    this.router.navigate(['/pages/agregar']);
  }

  verDetalle(evento: IEvent) {
    this.router.navigate(['/event-detail', { id: evento.id }]);
  }

  obtenerEventos() {
    this.eventosService.getEventos().subscribe(
      eventos => {
        console.log(eventos);
        this.eventos = eventos;

        const usuarioId = this.authService.getUserId();
        if (usuarioId) {
          this.eventos.forEach(evento => {
            this.eventosService.verificarInscripcion(usuarioId, evento.id).subscribe(asistio => {
              evento.puedeComentar = asistio;
            });
          });
        }
      },
      error => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }

  isBase64(str: string) {
    const regex = /^data:image\/[a-zA-Z]+;base64,/;
    return regex.test(str); 
  }

  
}
