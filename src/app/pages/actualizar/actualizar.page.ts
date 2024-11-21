import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicrudService } from 'src/app/services/apicrud.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  // Objeto evento con los campos relevantes
  evento = {
    id: "",
    nombre: '',
    fecha: '',
    lugar: '',
    descripcion: '',
    imagen: ''
  };

  selectedFile: File | null = null;  // Para almacenar el archivo seleccionado

  constructor(
    private activated: ActivatedRoute,
    private apicrud: ApicrudService,
    private router: Router
  ) {
    // Obtener el id del evento desde los parámetros de la URL
    this.activated.queryParams.subscribe(param => {
      if (param['id']) {
        const id = param['id'];  // El id se pasa como parámetro en la URL
        this.obtenerEvento(id);  // Llamamos al método para obtener los detalles del evento
      }
    });
  }

  ngOnInit() {}

  // Método para obtener los detalles del evento usando el id
  obtenerEvento(id: number) {
    this.apicrud.getEventosId(id).subscribe(
      (response: any) => {
        this.evento = response;  // Asignamos los datos obtenidos a la variable 'evento'
      },
      error => {
        console.error('Error al obtener el evento:', error);
        alert('No se pudo obtener el evento');
      }
    );
  }

  // Método para actualizar el evento
  actualizar() {
    // Validación de los campos, asegurándonos de que no falten otros campos
    if (!this.evento.nombre || !this.evento.fecha || !this.evento.lugar || !this.evento.descripcion || !this.evento.imagen) {
      console.error('Faltan campos por completar.');
      alert('Por favor complete todos los campos');
      return;
    }

    // Realizar la actualización del evento, usando el objeto 'evento' completo
    this.apicrud.putEventos(this.evento).subscribe(
      response => {
        console.log('Evento actualizado con éxito:', response);
        // Redirigir a la página de eventos después de la actualización
        this.router.navigateByUrl('/tabs/tab2');
      },
      error => {
        console.error('Error al actualizar el evento:', error);
        alert('Error al actualizar el evento');
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;  // Accede al archivo seleccionado
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Convierte la imagen a Base64 y la almacena en el evento
        this.evento.imagen = reader.result as string;
        this.selectedFile = file; // Almacena el archivo seleccionado
        console.log("Imagen convertida a Base64:", this.evento.imagen);
      };

      reader.readAsDataURL(file); // Lee el archivo como Data URL (Base64)
    }
  }
}
