import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { IEvent } from 'src/interfaces/ItEvent';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { IUser } from 'src/interfaces/usuarios';
import { QrModalPage } from '../qr-modal/qr-modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  eventos: IEvent[] = [];
  codigoQr: string | null = null;

  constructor(
    private eventosService: EventosService,
    private authService: AuthService,
    private menucontroller: MenuController,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventosService.getEventos().subscribe((data) => {
      this.eventos = data.eventos;
    });
  }

  mostrarMenu() {
    this.menucontroller.open('first');
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
  
      const qrData = `Evento: ${datosInscripcion.nombreEvento}, Fecha: ${datosInscripcion.fechaEvento}, RUT: ${datosInscripcion.rutUsuario}, Email: ${datosInscripcion.emailUsuario}`;
  
      this.mostrarModal(evento, usuario, qrData);
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
  }
