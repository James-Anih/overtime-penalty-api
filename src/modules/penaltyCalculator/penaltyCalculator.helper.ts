import { CalculateFeeParams } from './penaltyCalculator.interface';
import { WEEKEND_DAYS, ROOM_RATES } from './penaltyCalculator.constant';

export const calculateOverstayFee = (params: CalculateFeeParams): number => {
  let isWeekend: boolean;

  // Parse expected and actual checkout times
  const expectedCheckoutTime = params.Expected_checkout_time;
  const actualCheckoutTime = params.actual_checkout_time;

  // Calculate total hours difference
  const timeDifferenceInMilliseconds = actualCheckoutTime.getTime() - expectedCheckoutTime.getTime();
  const totalHoursDifference = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60)) + 1;

  // Determine if the day is a weekend or weekday
  const dayOfWeek = actualCheckoutTime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  if (dayOfWeek === WEEKEND_DAYS.SATURDAY || dayOfWeek === WEEKEND_DAYS.SUNDAY) {
    isWeekend = true;
  } else {
    isWeekend = false;
  }

  const roomType = params.Room_type.toLowerCase() as keyof typeof ROOM_RATES;
  const roomRates = ROOM_RATES[roomType];

  // Determine the applicable rate based on the day
  const rateIncrease = isWeekend ? roomRates.Weekend_rates_increase : roomRates.Weekday_rates_increase;

  // Calculate the overstay fee
  const overstayFee = (params.Hourly_rate * (rateIncrease / 100)) * totalHoursDifference;
  return overstayFee;
};
