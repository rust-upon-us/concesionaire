import { Billing } from './billing.model';

export interface Worker {
  _id?: string;
  name: string; //nombre
  surname: string; //apellidos
  nif: string; //dni
  phone: number; //Telefono
  phonePrefix: number; //prefijo telefonico
  country?: string; //Pais
  province?: string; //Provincia
  location?: string; //Localidad
  cp?: number; //codigo postal
  address?: string; //Direccion
}
