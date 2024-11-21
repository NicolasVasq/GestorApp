
//get, put, delete
export interface IEvent {
    id: number;
    nombre: string;
    fecha: string;
    lugar: string;
    descripcion: string;
    imagen: string; 
  }

//post

export interface ICrearEvent {
    nombre: string;
    fecha: string;
    lugar: string;
    descripcion: string;
    imagen: string;  
  }
  