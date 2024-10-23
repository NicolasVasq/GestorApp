import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../services/eventos.service'; 
import { IEvent } from 'src/interfaces/ItEvent';
import { ComentarioService } from '../services/comentario.service';  
import { Comentario } from 'src/interfaces/comentario'; 
import { AuthService } from '../services/auth.service'; // Importar el servicio

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss']
})
export class EventDetailPage implements OnInit {
  evento: IEvent | undefined;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private comentarioService: ComentarioService,
    private authService: AuthService // Inyectar el servicio
  ) {}

  ngOnInit() {
    this.cargarComentarios();
    const eventoId = this.route.snapshot.paramMap.get('id');
    
    if (eventoId) {
      this.eventosService.getEventos().subscribe(data => {
        this.evento = data.eventos.find(e => e.id === eventoId);
      });
    } else {
      console.error('No se encontró el ID del evento.');
    }
  }

  cargarComentarios() {
    this.comentarioService.obtenerComentarios().subscribe((data) => {
      this.comentarios = data;
    });
  }

  agregarComentario() {
    if (this.nuevoComentario.trim() !== '') {
      const usuarioId = this.authService.getUserId();
      
      if (!usuarioId) {
        console.error('No se encontró el ID del usuario logueado.');
        return; 
      }
  
      const nuevoComentario: Comentario = {
        id: this.comentarios.length + 1, 
        texto: this.nuevoComentario,
        fecha: new Date(),
        usuarioId: usuarioId
      };
  
      
      this.comentarioService.agregarComentario(nuevoComentario).subscribe(
        (comentarioGuardado) => {
          this.comentarios.push(comentarioGuardado); 
          this.nuevoComentario = ''; 
        },
        (error) => {
          console.error('Error al agregar el comentario:', error);
        }
      );
    }
  }
}
