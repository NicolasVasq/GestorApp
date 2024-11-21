import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Importación correcta
import { EventosService } from '../services/eventos.service'; 
import { IEvent } from 'src/interfaces/ItEvent';
import { ComentarioService } from '../services/comentario.service';  
import { Comentario } from 'src/interfaces/comentario'; 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Asegúrate de importar Router si lo vas a usar
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss']
})
export class EventDetailPage implements OnInit {
  evento: IEvent | undefined;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  puedeComentar: boolean = false;

  constructor(
    private route: ActivatedRoute, // Cambiado de router a route
    private eventosService: EventosService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private router: Router,  // Asegúrate de tener Router inyectado si lo vas a usar
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const eventoId = this.route.snapshot.paramMap.get('id');  // Cambiado router a route
    if (eventoId) {
      this.eventosService.getEventos().subscribe((data: IEvent[]) => {
        this.evento = data.find(e => e.id.toString() === eventoId);
        if (!this.evento) {
          console.error('Evento no encontrado');
        } else {
          this.verificarAsistencia(eventoId);
          this.cargarComentarios();
        }
      }, error => {
        console.error('Error al obtener eventos:', error);
      });
    } else {
      console.error('No se encontró el ID del evento en la ruta.');
    }
  }

  cargarComentarios() {
    this.comentarioService.obtenerComentarios().subscribe((data) => {
      this.comentarios = data.filter(comentario => comentario.eventoId === this.evento?.id);
    });
  }

  verificarAsistencia(eventoId: string) {
    const usuarioId = this.authService.getUserId();
    if (usuarioId) {
      this.eventosService.verificarInscripcion(usuarioId, eventoId).subscribe(inscrito => {
        this.puedeComentar = inscrito;
        console.log('Puede comentar:', this.puedeComentar);
      }, error => {
        console.error('Error al verificar inscripción:', error);
        this.puedeComentar = false;
      });
    } else {
      console.error('No se encontró el ID del usuario logueado.');
      this.puedeComentar = false;
    }
  }

  agregarComentario() {
    if (!this.puedeComentar) {
      alert('Debes estar inscrito en el evento para poder comentar.');
      return;
    }

    if (this.nuevoComentario.trim() === '') {
      return;
    }

    const usuarioId = this.authService.getUserId();
    if (!usuarioId) {
      console.error('No se encontró el ID del usuario logueado.');
      return; 
    }

    const nuevoComentario: Comentario = {
      id: 0,
      texto: this.nuevoComentario,
      fecha: new Date().toISOString(), 
      usuarioId: usuarioId,
      eventoId: this.evento?.id || ''
    };

    this.comentarioService.agregarComentario(this.evento?.id || '', nuevoComentario).subscribe(
      (comentarioGuardado) => {
        this.comentarios.push(comentarioGuardado);
        this.nuevoComentario = '';
      },
      (error) => {
        console.error('Error al agregar el comentario:', error);
        alert('Error al agregar el comentario: ' + error);
      }
    );
  }

  async borrarEvento() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: 'Este evento se eliminará permanentemente.',
      cssClass: 'ios-alert', // Estilo específico para iOS
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',  // Estilo secundario (botón cancelación)
          handler: () => {
            console.log('El evento no se eliminó');
          }
        },
        {
          text: 'Sí, borrar',
          cssClass: 'danger',  // Estilo de botón de peligro (rojo)
          handler: () => {
            if (this.evento) {
              this.eventosService.borrarEvento(this.evento.id).subscribe(() => {
                console.log('Evento eliminado');
                // Redirige al listado de eventos
                this.router.navigateByUrl('/tabs/tab2');
              }, (error) => {
                console.error('Error al eliminar el evento:', error);
              });
            }
          }
        }
      ]
    });
  
    await alert.present(); // Muestra la alerta
  }
  

    

  goToEditar(){
    if (this.evento) {
      this.router.navigate([`/pages/actualizar/${this.evento.id}`]);
    }
  }

  isBase64(str: string): boolean {
    const regex = /^data:image\/(png|jpg|jpeg|gif|bmp|svg\+xml);base64,/;
    return regex.test(str);
  }
  
}
