import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApidatosService } from '../services/apidatos.service';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { IEvent } from 'src/interfaces/ItEvent';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  posteos: any[] = [];
  eventos: IEvent[] = [];

  constructor(
    private apidatos: ApidatosService,
    private router: Router,
    private apicrud: ApicrudService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadEventos();
    this.CargarApi();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['reload']) {
        this.loadEventos(); // Recargar eventos si se indicó
      }
    });
  }

  loadEventos() {
    this.apicrud.getIEvent().subscribe(eventos => {
      this.eventos = eventos; // Actualiza la lista de eventos
    });
  }

  CargarApi() {
    this.apidatos.getPosts().subscribe(
      resp => {
        console.log(resp);
        this.posteos = resp; // Almacena los datos en el array posteos
      },
      error => {
        console.error('Error al cargar los datos:', error); // Manejo de errores
      }
    );
  }

  buscarPost(post: any) {
    this.router.navigate(['/detalle'], {
      queryParams: { post: JSON.stringify(post) }
    });
  }

  goToAgregar() {
    this.router.navigateByUrl('/pages/agregar');
  }
}
