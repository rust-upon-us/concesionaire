import { Worker } from './worker.model';
export interface User {
  _id?: string;
  username: string;
  worker: Worker;
  role: string;
  bonus: number;
}
