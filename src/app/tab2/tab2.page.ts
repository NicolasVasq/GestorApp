import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { IEvent } from 'src/interfaces/ItEvent';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/interfaces/usuarios';
import { QrModalPage } from '../qr-modal/qr-modal.page';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  eventos: IEvent[] = [];
  puedeComentar: boolean = false;

  constructor(
    private eventosService: EventosService,
    private authService: AuthService,
    private menuController: MenuController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventosService.getEventos().subscribe(
      eventos => {
        console.log(eventos); // Verifica qué datos recibes
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

  mostrarMenu() {
    this.menuController.open('first');
  }

  verDetalle(evento: IEvent) {
    this.router.navigate(['/event-detail', { id: evento.id }]);
  }

  async inscribirme(evento: IEvent) {
    this.authService.obtenerUsuarioActual().subscribe((usuario: IUser) => {
      const rut = usuario.rut.substring(0, 8);
      const datosInscripcion = {
        nombreEvento: evento.nombre,
        fechaEvento: evento.fecha,
        rutUsuario: rut,
        emailUsuario: usuario.email
      };

      console.log('Datos de inscripción:', datosInscripcion);

      this.eventosService.inscribirUsuario(datosInscripcion).subscribe(() => {
        const qrData = `Evento: ${datosInscripcion.nombreEvento}, Fecha: ${datosInscripcion.fechaEvento}, RUT: ${datosInscripcion.rutUsuario}, Email: ${datosInscripcion.emailUsuario}`;
        this.mostrarModal(evento, usuario, qrData);
        this.verificarAsistencia(evento.id);
      }, error => {
        console.error('Error al inscribirse:', error);
      });
    }, error => {
      console.error('Error al obtener el usuario actual:', error);
    });
  }

  async mostrarModal(evento: IEvent, usuario: IUser, codigoQr: string) {
    const modal = await this.modalController.create({
      component: QrModalPage,
      componentProps: {
        evento: evento,
        usuario: usuario,
        codigoQr: codigoQr
      }
    });
    return await modal.present();
  }

  verificarAsistencia(eventoId: string) {
    const usuarioId = this.authService.getUserId();
    if (usuarioId) {
      this.eventosService.verificarInscripcion(usuarioId, eventoId).subscribe(inscrito => {
        this.puedeComentar = inscrito; // Cambia según la respuesta de tu API
        console.log('Puede comentar:', this.puedeComentar);
      }, error => {
        console.error('Error al verificar asistencia:', error);
      });
    } else {
      console.error('No se encontró el ID del usuario logueado.');
    }
  }
}
