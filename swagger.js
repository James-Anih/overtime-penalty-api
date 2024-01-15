const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Overstay Penalty API',
      version: '1.0.0',
      description: 'Documentation for Overstay Penalty API',
    },
    servers: [
      {
        url: process.env.APP_URL,
        description: '',
      },
    ],
  },
  apis: ['./src/modules/penaltyCalculator/penaltyCalculator.route.ts'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
