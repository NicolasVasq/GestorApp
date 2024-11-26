import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicrudService } from 'src/app/services/apicrud.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  evento = {
    id: "",
    nombre: '',
    fecha: '',
    lugar: '',
    descripcion: '',
    imagen: ''
  };

  selectedFile: File | null = null; 

  constructor(
    private activated: ActivatedRoute,
    private apicrud: ApicrudService,
    private router: Router
  ) {
    
    this.activated.queryParams.subscribe(param => {
      if (param['id']) {
        const id = param['id'];  
        this.obtenerEvento(id);  
      }
    });
  }

  ngOnInit() {}

  obtenerEvento(id: number) {
    this.apicrud.getEventosId(id).subscribe(
      (response: any) => {
        this.evento = response;  
      },
      error => {
        console.error('Error al obtener el evento:', error);
        alert('No se pudo obtener el evento');
      }
    );
  }

  actualizar() {
   
    if (!this.evento.nombre || !this.evento.fecha || !this.evento.lugar || !this.evento.descripcion || !this.evento.imagen) {
      console.error('Faltan campos por completar.');
      alert('Por favor complete todos los campos');
      return;
    }

    this.apicrud.putEventos(this.evento).subscribe(
      response => {
        console.log('Evento actualizado con éxito:', response);
        
        this.router.navigateByUrl('/tabs/tab2');
      },
      error => {
        console.error('Error al actualizar el evento:', error);
        alert('Error al actualizar el evento');
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;  
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.evento.imagen = reader.result as string;
        this.selectedFile = file; 
        console.log("Imagen convertida a Base64:", this.evento.imagen);
      };

      reader.readAsDataURL(file);
    }
  }
}
