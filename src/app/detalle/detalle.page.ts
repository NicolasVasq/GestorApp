import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  post: any = {};  // Inicializar como objeto vacío
  id: any;
  evento: any = {  // Definir el evento como un objeto con estructura vacía
    id: 0,
    nombre: "",
    fecha: "",
    lugar: "",
    imagen: ""
  };

  constructor(private router: Router, private ruta : ActivatedRoute) {
    // Leer parámetros al iniciar la página
    this.ruta.queryParams.subscribe(params => {
      if (params['post']) {
        this.post = JSON.parse(params['post']);
      }
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // Asegúrate de que los datos de `post` o `eventos` estén disponibles
    if (this.post) {
      this.evento = this.post;  // Asigna los datos a `evento` si están en `post`
      this.id = this.evento.id;
      console.log('ID del evento:', this.id);
    }
  }

  actualizarEvento() {
    // Navega a la página de actualización pasando el evento como parámetro
    this.router.navigate(
      ['pages/actualizar', this.evento.id],
      { queryParams: { eventos: JSON.stringify(this.evento) } }
    );
  }

  regresar() {
    // Redirige a la página de listado
    this.router.navigate(['/tabs/tab2']);
  }
}
