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
    id: "",
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: "",
    imagen: "" 
  };

  selectedFile: File | null = null; 

  constructor(private apicrud: ApicrudService, private router: Router) {}

  ngOnInit() {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement; 
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.newIEvent.imagen = reader.result as string;
        this.selectedFile = file; 
        console.log("Imagen convertida a Base64:", this.newIEvent.imagen);
      };

      reader.readAsDataURL(file); 
    }
  }

  crearEvento() {
    if (this.newIEvent.imagen) {
      this.apicrud.postIEvent(this.newIEvent).subscribe(() => {
        this.router.navigateByUrl('/tabs/tab2');
      }, (error) => {
        console.error('Error al crear el evento', error);
      });
    } else {
      console.log("Debes seleccionar una imagen para el evento.");
    }
  }
}
