import joi from 'joi';
const { object } = joi.types();
import { validate } from '../../utils/validator';

export const validateReservationId = (payload: unknown): { reservation_id: number, actual_checkout_time: Date } => {
  const schema = object.keys({
    reservation_id: joi.number().required(),
    actual_checkout_time: joi.date().iso().required()
  });
  
  return validate(payload, schema);
};
