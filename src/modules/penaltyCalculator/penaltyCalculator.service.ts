import { logger } from '../../utils/logger';
import { ReservationRepo } from '../../database/repositories';
import { calculateOverstayFee }  from './penaltyCalculator.helper';
import { BadRequestError, ResourceNotFoundError } from '../../errors';
import { CalculatorParams, ResponseProps } from './penaltyCalculator.interface';

const reservationRepo = new ReservationRepo();

export const processGetOverstayFee = async (data: CalculatorParams): Promise<ResponseProps> => {
  try {
    const guestReservation = await reservationRepo.findOne({
      where: { reservation_id: data.reservation_id }
    });
    
    if (!guestReservation) throw new ResourceNotFoundError('This reservation doesn\'t exist!');
    const { Room_type, Hourly_rate, Expected_checkout_time, Customer_id } = guestReservation;

    const overstayFee = calculateOverstayFee({
      Room_type,
      Hourly_rate,
      Expected_checkout_time,
      actual_checkout_time: data.actual_checkout_time,
    });

    logger.info(`Customer with id ${Customer_id} has an overdue fee of ${overstayFee} naira`);

    const response = {
      message: 'Overstay fees calculated successfully!',
      data: { overstayFee }
    };

    logger.info(JSON.stringify(response));
    return response;
  } catch (error: any) {

    logger.error('Error calculating overstay fees:', error);
    throw new BadRequestError(`${error}`, error);
  }
};
