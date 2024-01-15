import { Router } from 'express';
import * as penaltyCalculatorController from './penaltyCalculator.controller';

const router = Router();
router.get('/', (_req, res) => res.send('Welcome to Penalty Calculator Service'));

/**
 * @swagger
 *  /overstay/{reservation_id}:
 *   post:
 *     summary: Calculate overstay penalty
 *     description: Calculate and return the overstay fee for a specific reservation 
 *     parameters:
 *       - name: reservation_id
 *         in: path
 *         description: ID of guest reservation
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               actual_checkout_time:
 *                 type: string
 *                 format: date-time
 *                 description: The actual checkout time provided by the guest in the format 'YYYY-MM-DD HH:mm'.
 *     responses:
 *       '201':
 *         description: Calculated overstay fee
 */
router.post('/:reservation_id', penaltyCalculatorController.getOverstayFee);

export default router;
