import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/interfaces/ItEvent';
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  newIEvent: IEvent = {
    id: 0,  // Asignar un valor numérico predeterminado
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: "",
    imagen: ""
  };

  constructor(private apicrud: ApicrudService, private router: Router) {}

  ngOnInit() {}

  crearEvento() {
    this.apicrud.postIEvent(this.newIEvent).subscribe(() => {
      // Redirige a Tab2 después de crear el evento
      this.router.navigateByUrl('/tabs/tab2');
    }, (error: any) => {
      console.error('Error al crear el evento', error);
    });
  }
}
