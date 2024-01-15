import { BaseRepository } from './BaseRepository';
import { Reservation } from '../models/Reservation';

export class ReservationRepo extends BaseRepository<Reservation> {
  reservation: Reservation;

  constructor() {
    super(Reservation);
  }
}
