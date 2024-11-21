import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/interfaces/ItEvent'; // Asegúrate de que la interfaz esté correctamente definida
import { ApicrudService } from 'src/app/services/apicrud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  // Objeto para almacenar la información del nuevo evento
  newIEvent: IEvent = {
    id: "",  // Deberás asignar un valor numérico o automático para el ID
    nombre: "",
    fecha: "",
    lugar: "",
    descripcion: "",
    imagen: ""  // Este campo almacenará la imagen en Base64
  };

  selectedFile: File | null = null;  // Para almacenar el archivo seleccionado

  constructor(private apicrud: ApicrudService, private router: Router) {}

  ngOnInit() {}

  // Este método se llama cuando el usuario selecciona un archivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;  // Accede al archivo seleccionado
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Convierte la imagen a Base64 y la almacena en el evento
        this.newIEvent.imagen = reader.result as string;
        this.selectedFile = file; // Almacena el archivo seleccionado
        console.log("Imagen convertida a Base64:", this.newIEvent.imagen);
      };

      reader.readAsDataURL(file); // Lee el archivo como Data URL (Base64)
    }
  }

  // Método para crear el evento
  crearEvento() {
    // Verificar si se seleccionó una imagen
    if (this.newIEvent.imagen) {
      // Crear el evento con la imagen codificada en Base64
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
