import { RequestHandler } from 'express';
import { logger } from '../../utils/logger';
import { responseHandler } from '../../helpers/response';
import * as calculatorService from './penaltyCalculator.service';
import { validateReservationId } from './penaltyCalculator.validation';

export const getOverstayFee: RequestHandler = async (req, res, next) => {
  try {
    const { actual_checkout_time } = req.body;
    const reservation_id = req.params.reservation_id;

    const validatedData = validateReservationId({ reservation_id, actual_checkout_time });
    const result = await calculatorService.processGetOverstayFee(validatedData);
    res.json(responseHandler(result.message, result.data));
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
