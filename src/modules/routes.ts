import { Router } from 'express';
import { routes as penaltyCalculatorRoutes } from './penaltyCalculator';

export const initiateModuleRoutes = (router: Router): void => {
  router.use('/v1/overstay', penaltyCalculatorRoutes);
};
