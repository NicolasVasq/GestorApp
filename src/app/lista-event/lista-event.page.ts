import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Evento } from './evento.model';

@Component({
  selector: 'app-lista-event',
  templateUrl: './lista-event.page.html',
  styleUrls: ['./lista-event.page.scss'],
})
export class ListaEventPage implements OnInit {

  eventos: Evento[] = [
    { id: 1, nombre: 'Conferencia Tech', descripcion: 'Una conferencia sobre tecnología.', fecha: '2024-09-30', hora: '10:00', ubicacion: 'Centro de Convenciones', cupos: 50 },
    { id: 2, nombre: 'Taller de Fotografía', descripcion: 'Un taller para aprender fotografía.', fecha: '2024-10-10', hora: '14:00', ubicacion: 'Sala 5', cupos: 25 },
    { id: 3, nombre: 'Feria de Empleo', descripcion: 'Evento para conectar empresas y candidatos.', fecha: '2024-11-01', hora: '09:00', ubicacion: 'Auditorio Principal', cupos: 100 },
    { id: 4, nombre: 'Maratón de Programación', descripcion: 'Competencia de programación para todos los niveles.', fecha: '2024-12-15', hora: '08:00', ubicacion: 'Sala de Innovación', cupos: 75 },
    { id: 5, nombre: 'Concierto de Jazz', descripcion: 'Un concierto de jazz con artistas internacionales.', fecha: '2024-11-25', hora: '19:00', ubicacion: 'Teatro Municipal', cupos: 150 },
    { id: 6, nombre: 'Exposición de Arte Moderno', descripcion: 'Exposición de obras de arte moderno.', fecha: '2024-10-20', hora: '11:00', ubicacion: 'Galería de Arte', cupos: 40 },
    { id: 7, nombre: 'Curso de Cocina Internacional', descripcion: 'Curso práctico de cocina con chefs internacionales.', fecha: '2024-12-05', hora: '16:00', ubicacion: 'Cocina Gourmet', cupos: 20 },
    { id: 8, nombre: 'Seminario de Finanzas Personales', descripcion: 'Seminario sobre gestión de finanzas personales y ahorro.', fecha: '2024-11-12', hora: '13:00', ubicacion: 'Sala de Conferencias', cupos: 60 },
    { id: 9, nombre: 'Noche de Cine Familiar', descripcion: 'Proyección de películas familiares al aire libre.', fecha: '2024-10-31', hora: '18:00', ubicacion: 'Parque Central', cupos: 200 },
    { id: 10, nombre: 'Torneo de E-Sports', descripcion: 'Competencia de videojuegos con premios para los ganadores.', fecha: '2024-12-22', hora: '12:00', ubicacion: 'Centro de Esports', cupos: 50 },
  ];
  

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
