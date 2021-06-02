import { Hardware } from './hardware.model';
import { Financing } from './financing.model';

export interface Vehicle {
  _id?: string;
  brand: string; //marca
  model: string; //modelo
  cost: number; //coste bruto (sin iva)
  frame: string; //Bastidor
  mileage: number; //Kilometraje
  registration?: string; //matricula
  images?: Array<string>; //fotografias
  year?: number; //Año de lanzamiento
  itv?: Date; //fecha revision de itv
  type?: string; //tipo de vehiculo
  doors?: number; //numero de puertas
  color?: string; //color
  displacement?: string; //cilindrada
  gearbox?: string; //caja de cambios
  fuel?: string; //combustible
  gasEmision?: string; //emision de gases
  financing?: Array<Financing>; //financiacion
  hardware?: Array<Hardware>; //Elementos
}
