export interface CalculatorParams {
  reservation_id: number; 
  actual_checkout_time: Date; 
};

export interface ResponseProps {
  message: string;
  data?: { [key: string]: any };
};
 
export interface CalculateFeeParams {
  Room_type: string;
  Hourly_rate: number;
  Expected_checkout_time: Date;
  actual_checkout_time: Date;
};
