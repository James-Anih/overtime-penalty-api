import app from '../src/app';
import request from 'supertest';
import { logger } from '../src/utils/logger';
import { sequelize } from '../src/database/sequelize';
import { describe, test, afterAll } from '@jest/globals';

describe('Calculate overstay fees', () => {
       
  afterAll(async () => {
    await sequelize.close();
    logger.info('Closed test database connection');
  });

  test('should successfully calculate overstay fees', async () => {  
    const reservation_id = 12002;
    const payload = { 
      actual_checkout_time: '2021-01-01 16:01' 
    };
  
    const response = await request(app)
      .post(`/v1/overstay/${reservation_id}`)
      .send(payload)
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('message');
    expect(typeof response.body.data.overstayFee).toBe('number');
  });  

  test('should handle invalid reservation ID', async () => {  
    const reservation_id = '12002fq';
    const payload = { 
      actual_checkout_time: '2021-01-01 16:01' 
    };
  
    const response = await request(app)
      .post(`/v1/overstay/${reservation_id}`)
      .send(payload)
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid request data');
    expect(response.body.data[0].details).toBe('This field must be a number');
  });

  test('should handle non-existent reservation ID', async () => {  
    const reservation_id = '12345';
    const payload = { 
      actual_checkout_time: '2021-01-01 16:01' 
    };
  
    const response = await request(app)
      .post(`/v1/overstay/${reservation_id}`)
      .send(payload)
    
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Error: This reservation doesn\'t exist!');
    expect(response.body.data).toStrictEqual([]);
  });

  test('should handle invalid checkout time', async () => {  
    const reservation_id = '12002';
    const payload = { 
      actual_checkout_time: '2021-01-01 16:01minutes' 
    };
  
    const response = await request(app)
      .post(`/v1/overstay/${reservation_id}`)
      .send(payload)
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid request data');
    expect(response.body.data[0].details).toBe('This field must be in ISO 8601 date format');
  });
});
