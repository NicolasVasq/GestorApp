import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventosService } from '../services/eventos.service';
import { IEvent } from 'src/interfaces/ItEvent';
import { MenuController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  eventos: IEvent[] = [];

  constructor(
    private eventosService: EventosService,
    private menuController: MenuController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventosService.getEventos().subscribe(
      eventos => {
        this.eventos = eventos;
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

  
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }


  isBase64(str: string) {
    const regex = /^data:image\/[a-zA-Z]+;base64,/;
    return regex.test(str);
  }
}
