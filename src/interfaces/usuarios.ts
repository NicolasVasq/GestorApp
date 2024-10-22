//get, put,delete

export interface IUser {
    id: number;  
    nombre: string;
    email: string;
    password: string;
    rut: string;
    isactive: boolean; 
  }
  
  
  //post
export interface ICrearUser {
    nombre: string;
    email: string;
    password: string;
    rut: string;
    isactive: boolean; // Asegúrate de que esto esté definido
  }
  