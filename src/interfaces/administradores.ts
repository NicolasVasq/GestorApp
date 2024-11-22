export interface Administrador {
    id: string;
    nombre: string;
    email: string;
    rut: string;
    password: string;
    isactive: boolean;
  }

  export interface ICrearAdmin {
    nombre: string;
    email: string;
    password: string;
    rut: string;
    isactive: boolean;
  }