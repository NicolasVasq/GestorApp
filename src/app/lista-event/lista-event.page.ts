import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Evento } from './evento.model';

@Component({
  selector: 'app-lista-event',
  templateUrl: './lista-event.page.html',
  styleUrls: ['./lista-event.page.scss'],
})
export class ListaEventPage implements OnInit {

  eventos: Evento[] = [];
  

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async eliminarEvento(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este evento?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.eventos = this.eventos.filter(evento => evento.id !== id);
          },
        },
      ],
    });
    await alert.present();
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
              // Actualiza el evento con los nuevos datos
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

  async abrirFormulario() {
    const alert = await this.alertController.create({
      header: 'Crear nuevo evento',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre del evento' },
        { name: 'descripcion', type: 'textarea', placeholder: 'Descripción del evento' },
        { name: 'fecha', type: 'date', placeholder: 'Fecha del evento' },
        { name: 'hora', type: 'time', placeholder: 'Hora del evento' },
        { name: 'ubicacion', type: 'text', placeholder: 'Ubicación del evento' },
        { name: 'cupos', type: 'number', placeholder: 'Cupos disponibles', min: 1 },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.nombre && data.descripcion && data.fecha && data.hora && data.ubicacion && data.cupos) {
              const nuevoEvento: Evento = {
                id: this.eventos.length + 1,
                nombre: data.nombre,
                descripcion: data.descripcion,
                fecha: data.fecha,
                hora: data.hora,
                ubicacion: data.ubicacion,
                cupos: data.cupos
              };
              this.eventos.push(nuevoEvento);
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
}
