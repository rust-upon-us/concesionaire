import { Worker } from './worker.model';
import { Client } from './client.model';
import { Financing } from './financing.model';
import { Vehicle } from './vehicle.model';

export interface Billing {
  _id?: string;
  year: Date;
  cost: number;
  worker: Worker;
  client: Client;
  vehicle: Vehicle;
  financing?: Financing;
}
